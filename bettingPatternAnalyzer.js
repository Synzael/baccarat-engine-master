// src/bettingPatternAnalyzer.js
'use strict';

class BettingPatternAnalyzer {
  /**
   * Create a new betting pattern analyzer
   * @param {BaccaratGameEngine} gameEngine - The game engine to use for simulations
   */
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
    this.results = {
      totalGames: 0,
      playerWins: 0,
      bankerWins: 0,
      ties: 0,
      startingBankroll: 0,
      endingBankroll: 0,
      maxBankroll: 0,
      minBankroll: 0,
      betsPlaced: 0,
      largestBet: 0,
      maxConsecutiveLosses: 0,
      losingStreaksOver5: {},
    };
  }

  /**
   * Reset the results to their initial state
   */
  resetResults() {
    this.results = {
      totalGames: 0,
      playerWins: 0,
      bankerWins: 0,
      ties: 0,
      startingBankroll: 0,
      endingBankroll: 0,
      maxBankroll: 0,
      minBankroll: 0,
      betsPlaced: 0,
      largestBet: 0,
      maxConsecutiveLosses: 0,
      losingStreaksOver5: {},
    };
  }

  /**
   * Run a simulation of a specific betting pattern
   * @param {Object} options - Simulation options
   * @param {number} options.numGames - Number of games to simulate
   * @param {number} options.startingBankroll - Starting bankroll amount
   * @param {Function} options.betFunction - Function that returns the next bet amount
   * @param {string} options.betOn - Which outcome to bet on ('player', 'banker')
   * @param {number} [options.baseBetForStrategy=1] - The base bet unit for the strategy if needed by strategy logic
   * @returns {Object} Simulation results
   */
  simulateBettingPattern({ numGames, startingBankroll, betFunction, betOn = 'banker', baseBetForStrategy = 1 }) {
    this.resetResults();
    
    let bankroll = startingBankroll;
    this.results.startingBankroll = startingBankroll;
    this.results.maxBankroll = startingBankroll; // Initialize High Water Mark for reporting and logic
    this.results.minBankroll = startingBankroll;
    
    // This is the "starting bankroll" amount used for the stop-loss rule quantum.
    const maxAllowedDrawdownQuantum = startingBankroll; 

    let betState = {
      consecutiveWins: 0,
      consecutiveLosses: 0,
      lastBet: 0,
      previousResults: [],
      betOn: betOn,
      baseBetUnit: baseBetForStrategy, 
      // Strategy-specific state will be added here by the strategy functions.
    };

    for (let i = 0; i < numGames; i++) {
      if (this.gameEngine.isBurnNeeded) {
        this.gameEngine.shoe.shuffle();
        this.gameEngine.burnCards();
      }

      const betAmount = betFunction(betState);
      
      if (betAmount > this.results.largestBet) {
        this.results.largestBet = betAmount;
      }

      // Original check for invalid bet amount (e.g. strategy returns 0 or negative)
      if (betAmount <= 0) {
        // console.log(`Strategy returned invalid bet amount: $${betAmount.toFixed(2)}. Stopping simulation.`);
        break; 
      }

      // START: New Stop-Loss Logic
      const currentHighWaterMark = this.results.maxBankroll;
      const stopLossFloor = currentHighWaterMark - maxAllowedDrawdownQuantum;
      let stopLossTriggered = false;
      // let stopLossReason = ""; // Uncomment if detailed console logging is desired

      // Condition 1: Bet itself is larger than the allowed drawdown quantum.
      if (betAmount > maxAllowedDrawdownQuantum) {
          stopLossTriggered = true;
          // stopLossReason = `Bet amount $${betAmount.toFixed(2)} > MaxDrawdownQuantum $${maxAllowedDrawdownQuantum.toFixed(2)}.`;
      // Condition 2: Bet would cause bankroll to drop below the floor (HWM - drawdown quantum).
      } else if ((bankroll - betAmount) < stopLossFloor) {
          stopLossTriggered = true;
          // stopLossReason = `Potential bankroll $${(bankroll - betAmount).toFixed(2)} < StopLossFloor $${stopLossFloor.toFixed(2)} (HWM $${currentHighWaterMark.toFixed(2)} - MaxDrawdownQuantum $${maxAllowedDrawdownQuantum.toFixed(2)}).`;
      }
      
      if (stopLossTriggered) {
        // console.log(`Stop-loss triggered. Current bankroll: $${bankroll.toFixed(2)}. ${stopLossReason} Aborting pattern.`);
        break; // Abort this simulation / pattern
      }
      // END: New Stop-Loss Logic

      // Original bankruptcy check: if the bet itself is larger than current bankroll
      if (betAmount > bankroll) {
        // console.log(`Bankrupt or cannot afford bet: Bankroll $${bankroll.toFixed(2)}, Bet $${betAmount.toFixed(2)}. Stopping simulation.`);
        break; 
      }

      // --- Proceed with the bet ---
      bankroll -= betAmount;
      this.results.betsPlaced++;
      betState.lastBet = betAmount; // Update betState after checks and before processing result

      const hand = this.gameEngine.dealGame();
      const result = this.gameEngine.resultsEngine.calculateGameResult(hand);
      betState.previousResults.push(result.outcome); 
      
      this.results.totalGames++;
      
      if (result.outcome === 'banker') this.results.bankerWins++;
      else if (result.outcome === 'player') this.results.playerWins++;
      else if (result.outcome === 'tie') this.results.ties++;

      let wonBet = false;
      if (result.outcome === betOn) {
        wonBet = true;
        bankroll += (betOn === 'banker') ? (betAmount * 1.95) : (betAmount * 2);
      } else if (result.outcome === 'tie') {
        // Bet is returned on a tie
        bankroll += betAmount;
      }
      // If lost, bankroll remains as (bankroll - betAmount)

      // Update betState based on win/loss/tie (for next bet calculation)
      if (wonBet) {
        if (betState.consecutiveLosses > 5) {
          const streakLength = betState.consecutiveLosses;
          this.results.losingStreaksOver5[streakLength] = (this.results.losingStreaksOver5[streakLength] || 0) + 1;
        }
        betState.consecutiveWins++;
        betState.consecutiveLosses = 0;
      } else if (result.outcome !== 'tie') { // Loss (not a win, not a tie)
        betState.consecutiveLosses++;
        betState.consecutiveWins = 0;
        if (betState.consecutiveLosses > this.results.maxConsecutiveLosses) {
          this.results.maxConsecutiveLosses = betState.consecutiveLosses;
        }
      }
      // On a tie, consecutive counts don't typically reset for common systems; bet is pushed.
      // Individual strategy functions might handle ties specifically if needed.
      
      // Update High Water Mark (maxBankroll) and minBankroll
      // This must be done *after* the bankroll is updated from the game's result.
      if (bankroll > this.results.maxBankroll) {
        this.results.maxBankroll = bankroll;
      }
      if (bankroll < this.results.minBankroll) {
        this.results.minBankroll = bankroll;
      }
      
      // Check for actual bankruptcy after bet outcome
      if (bankroll <= 0) {
        // console.log(`Bankrupted after game. Ending bankroll: $${bankroll.toFixed(2)}.`);
        break;
      }
    }

    // After the loop, check if the simulation ended on a losing streak
    if (betState.consecutiveLosses > 5) {
      const streakLength = betState.consecutiveLosses;
      this.results.losingStreaksOver5[streakLength] = (this.results.losingStreaksOver5[streakLength] || 0) + 1;
    }

    // Standardize final currency values to two decimal places
    this.results.endingBankroll = parseFloat(bankroll.toFixed(2));
    if (typeof this.results.maxBankroll === 'number') {
        this.results.maxBankroll = parseFloat(this.results.maxBankroll.toFixed(2));
    }
    if (typeof this.results.minBankroll === 'number') {
        this.results.minBankroll = parseFloat(this.results.minBankroll.toFixed(2));
    }
    if (typeof this.results.largestBet === 'number' && this.results.largestBet > 0) { // ensure largestBet is also formatted if it was set
        this.results.largestBet = parseFloat(this.results.largestBet.toFixed(2));
    }


    return this.results;
  }

  /**
   * Creates a betting strategy function from a configuration object.
   * @param {Object} config - The strategy configuration.
   * @param {string} config.type - The type of strategy (e.g., 'martingale', 'custom_sequence').
   * @param {Object} [config.params={}] - Parameters specific to the strategy type.
   * @returns {Function} A betting function `(state) => betAmount`.
   */
  static createStrategyFromConfig(config) {
    const params = config.params || {}; // Ensure params object exists

    switch (config.type.toLowerCase()) {
        case 'flat':
            return BettingPatternAnalyzer.flatBettingStrategy(params.baseBet);
        case 'martingale':
            return BettingPatternAnalyzer.martingaleStrategy(params.baseBet);
        case 'fibonacci':
            // fibonacciStrategy expects baseBet from params if defined, or defaults
            return BettingPatternAnalyzer.fibonacciStrategy(params.baseBet);
        case 'dalembert':
            // dAlembertStrategy expects baseBet from params if defined, or defaults
            return BettingPatternAnalyzer.dAlembertStrategy(params.baseBet);
        case 'labouchere':
            if (!params.initialSequence || !Array.isArray(params.initialSequence)) {
                throw new Error("Labouchere strategy requires 'initialSequence' array in params.");
            }
            // labouchereStrategy expects baseBet and initialSequence from params
            return BettingPatternAnalyzer.labouchereStrategy(params.baseBet, params.initialSequence);
        case 'custom_sequence':
            // Custom sequence strategy now takes the whole params object
            // which includes lossProgression, behavior, winReset, repeatLastOnMaxLoss, baseBet
            if (!params.lossProgression || !Array.isArray(params.lossProgression)) {
                throw new Error("Custom sequence strategy requires 'lossProgression' array in params.");
            }
            return BettingPatternAnalyzer.customSequenceStrategy(params); // Pass the entire params object
        default:
            throw new Error(`Unknown strategy type: ${config.type}`);
    }
  }

  /**
   * Helper to get the Nth Fibonacci number for betting (1, 1, 2, 3, 5...).
   * @param {number} n - The 0-based index in the betting Fibonacci sequence.
   * @returns {number} The Fibonacci multiplier.
   */
  static _getBettingFibonacciValue(n) {
    if (n <= 0) return 1; 
    if (n === 1) return 1;
    let a = 1;
    let b = 1;
    for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    return b;
  }

  /**
   * Fibonacci betting strategy.
   * On win, go back 2 steps. On loss, go forward 1 step.
   * Sequence of multipliers: 1, 1, 2, 3, 5, 8...
   * @param {number} [baseBetParam=1] - The base unit multiplier.
   * @returns {Function} A betting function for the modified Fibonacci system.
   */
  static fibonacciStrategy(baseBetParam = 1) {
    const baseBet = baseBetParam; 

    return (state) => {
        if (state.fibonacciCurrentIndex === undefined) {
            state.fibonacciCurrentIndex = 0; 
        }

        if (state.previousResults.length > 0) {
            const lastOutcome = state.previousResults[state.previousResults.length - 1];
            const previousBetWasOn = state.betOn; 

            if (lastOutcome !== 'tie') {
                if (lastOutcome === previousBetWasOn) { // WIN
                    state.fibonacciCurrentIndex = Math.max(0, state.fibonacciCurrentIndex - 2);
                } else { // LOSS
                    state.fibonacciCurrentIndex++;
                }
            }
        }
        
        const fibMultiplier = BettingPatternAnalyzer._getBettingFibonacciValue(state.fibonacciCurrentIndex);
        return baseBet * fibMultiplier;
    };
  }

  /**
   * Custom Sequence betting strategy.
   * @param {Object} params - Parameters for the strategy.
   * @param {number} [params.baseBet=1] - Multiplier for sequence values. If lossProgression has absolute amounts, set baseBet=1.
   * @param {number[]} params.lossProgression - Array of bet multipliers or absolute bet amounts.
   * @param {string} [params.behavior='standard'] - 'standard' or 'fibonacci_step'.
   * @param {boolean} [params.winReset=true] - For 'standard' behavior: if true, resets to start of progression on a win.
   * @param {boolean} [params.repeatLastOnMaxLoss=true] - If true, repeats the last progression value if current index exceeds sequence length.
   * @returns {Function} A betting function `(state) => betAmount`.
   */
  static customSequenceStrategy(params) {
    const {
        baseBet = 1, 
        lossProgression,
        behavior = 'standard', 
        winReset = true,       
        repeatLastOnMaxLoss = true
    } = params;

    if (!Array.isArray(lossProgression) || lossProgression.length === 0) {
        throw new Error("Custom sequence strategy requires a non-empty 'lossProgression' array in params.");
    }

    return (state) => {
        if (state.customSequenceCurrentIndex === undefined) {
            state.customSequenceCurrentIndex = 0; 
        }

        if (state.previousResults.length > 0) {
            const lastOutcome = state.previousResults[state.previousResults.length - 1];
            const previousBetWasOn = state.betOn;

            if (lastOutcome !== 'tie') {
                if (lastOutcome === previousBetWasOn) { // WIN
                    if (behavior === 'fibonacci_step') {
                        state.customSequenceCurrentIndex = Math.max(0, state.customSequenceCurrentIndex - 2);
                    } else { 
                        if (winReset) {
                            state.customSequenceCurrentIndex = 0;
                        }
                    }
                } else { // LOSS
                    state.customSequenceCurrentIndex++;
                }
            }
        }
        
        let currentIndexForBet = state.customSequenceCurrentIndex;

        if (currentIndexForBet >= lossProgression.length) {
            if (repeatLastOnMaxLoss) {
                currentIndexForBet = lossProgression.length - 1; 
            } else {
                return 0; 
            }
        }
         if (currentIndexForBet < 0) { // Should only happen with fibonacci_step on short arrays
            currentIndexForBet = 0;
        }

        const betValueFromProgression = lossProgression[currentIndexForBet];
        return baseBet * betValueFromProgression;
    };
  }

  /**
   * Martingale betting strategy - double bet after each loss
   * @param {number} [baseBet=1] - The initial bet amount.
   * @returns {Function} A betting function for the Martingale system
   */
  static martingaleStrategy(baseBet = 1) {
    return (state) => {
      if (state.consecutiveLosses === 0) {
        return baseBet;
      }
      return baseBet * Math.pow(2, state.consecutiveLosses);
    };
  }

  /**
   * D'Alembert betting strategy - increase bet by one unit after a loss, decrease by one unit after a win
   * @param {number} [baseBetParam=1] - The unit to increase/decrease by.
   * @returns {Function} A betting function for the D'Alembert system
   */
  static dAlembertStrategy(baseBetParam = 1) {
    const baseBet = baseBetParam;

    return (state) => {
      if (state.dAlembertCurrentBet === undefined) {
        state.dAlembertCurrentBet = baseBet;
      }
      
      if (state.previousResults.length > 0) {
        const lastOutcome = state.previousResults[state.previousResults.length - 1];
        const previousBetWasOn = state.betOn; 
        
        if (lastOutcome !== 'tie') {
          if (lastOutcome === previousBetWasOn) { 
            state.dAlembertCurrentBet = Math.max(baseBet, state.dAlembertCurrentBet - baseBet);
          } else { 
            state.dAlembertCurrentBet = state.dAlembertCurrentBet + baseBet;
          }
        }
      }
      return state.dAlembertCurrentBet;
    };
  }

  /**
   * Flat betting strategy - always bet the same amount
   * @param {number} [baseBet=1] - The amount to bet each time.
   * @returns {Function} A betting function for flat betting
   */
  static flatBettingStrategy(baseBet = 1) {
    return () => baseBet;
  }

  /**
   * Labouchère (cancellation) betting strategy
   * @param {number} [baseBetParam=1] - Base betting unit multiplier.
   * @param {number[]} [initialSequenceParam=[1, 2, 3]] - Initial sequence of units.
   * @returns {Function} A betting function for the Labouchère system
   */
  static labouchereStrategy(baseBetParam = 1, initialSequenceParam = [1, 2, 3]) {
    const baseBet = baseBetParam;
    const initialSequence = [...initialSequenceParam]; // Ensure we work with a copy

    return (state) => {
      if (!state.labouchereSequence || !Array.isArray(state.labouchereSequence)) { // Initialize or re-initialize if cleared
        state.labouchereSequence = [...initialSequence];
      }

      if (state.previousResults.length > 0 && typeof state.lastBet === 'number' && state.lastBet > 0) { // Process previous bet result
        const lastOutcome = state.previousResults[state.previousResults.length - 1];
        const previousBetWasOn = state.betOn;

        if (lastOutcome !== 'tie') {
          if (lastOutcome === previousBetWasOn) { // WIN
            if (state.labouchereSequence.length > 0) state.labouchereSequence.shift();
            if (state.labouchereSequence.length > 0) state.labouchereSequence.pop();
          } else { // LOSS
            if (baseBet > 0) { // Avoid division by zero if baseBet is not set or is 0
              const lastBetUnits = Math.round(state.lastBet / baseBet); // lastBet was in currency, convert to units
              if (lastBetUnits > 0) { // Only add if it's a valid unit amount
                state.labouchereSequence.push(lastBetUnits);
              }
            }
          }
        }
      }
      
      // If sequence is empty (all numbers cancelled or started empty), reset it.
      if (state.labouchereSequence.length === 0) {
        state.labouchereSequence = [...initialSequence];
        // If initialSequence was also empty (or became empty due to config), can't bet.
        if (state.labouchereSequence.length === 0) return 0; 
      }
      
      let currentBetUnits;
      if (state.labouchereSequence.length === 1) {
        currentBetUnits = state.labouchereSequence[0];
      } else { // Length > 1
        currentBetUnits = state.labouchereSequence[0] + state.labouchereSequence[state.labouchereSequence.length - 1];
      }
      
      return currentBetUnits * baseBet; // Return bet in currency
    };
  }
}

module.exports = BettingPatternAnalyzer;