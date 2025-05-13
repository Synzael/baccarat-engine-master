'use strict';

/**
 * Class for analyzing different betting patterns in Baccarat
 * and their interactions with the house edge
 */
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
      currentConsecutiveLosses: 0 // This seems to be a duplicate from results, betState should handle its own
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
      // currentConsecutiveLosses: 0 // Removed, as it's tracked in results.betsPlaced.maxConsecutiveLosses
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
    // Reset results
    this.resetResults();
    
    // Setup simulation state
    let bankroll = startingBankroll;
    this.results.startingBankroll = startingBankroll;
    this.results.maxBankroll = startingBankroll;
    this.results.minBankroll = startingBankroll;
    
    // Track state for betting pattern
    let betState = {
      consecutiveWins: 0,
      consecutiveLosses: 0,
      lastBet: 0,
      previousResults: [],
      betOn: betOn, // Make betOn available to the strategy function
      baseBetUnit: baseBetForStrategy, // Make baseBet unit available if strategy needs it directly
      // Strategy-specific state will be added to this object by the strategy functions themselves
      // e.g., labouchereSequence, dAlembertCurrentBet
    };

    // Run the simulation
    for (let i = 0; i < numGames; i++) {
      // Check if we need to burn cards and reshuffle
      if (this.gameEngine.isBurnNeeded) {
        this.gameEngine.shoe.shuffle();
        this.gameEngine.burnCards();
      }

      // Determine the bet size based on our strategy
      const betAmount = betFunction(betState);
      
      if (betAmount <= 0) { // Don't bet if strategy says to bet 0 or less (e.g. sequence exhausted and not repeating)
          // Optionally log this or handle as a "pass"
          // For simplicity, if bet is 0, we might just not play this round, or break if bankroll is also an issue.
          // Let's assume positive bet amounts are intended. If bankroll check fails, that's handled.
          if (bankroll <=0) break; // if already bankrupt, stop.
          // If betAmount is 0, but bankroll is >0, this loop effectively pauses until betAmount > 0
          // This might not be desired. Let's assume strategies always return >0 if they intend to bet.
          // If a strategy returns 0 due to exhausting its progression, it might mean stop betting.
          // The current loop will just try again. A specific check could be added.
      }


      if (betAmount > this.results.largestBet) {
        this.results.largestBet = betAmount;
      }

      // Skip bet if we don't have enough money or if bet is zero/negative
      if (betAmount <= 0 || betAmount > bankroll) {
        // If betAmount is > bankroll, it's a bust for this strategy.
        // If betAmount is <=0, it means the strategy decided not to bet.
        if (betAmount > bankroll) {
             // console.log(`Bankrupt or cannot afford bet: Bankroll $${bankroll}, Bet $${betAmount}`);
        }
        break; 
      }

      // Place the bet (reduce bankroll)
      bankroll -= betAmount;
      this.results.betsPlaced++;
      betState.lastBet = betAmount; // Record last bet amount *for the strategy's state*

      // Deal a hand and get the result
      const hand = this.gameEngine.dealGame();
      const result = this.gameEngine.resultsEngine.calculateGameResult(hand);
      betState.previousResults.push(result.outcome); // Add to history *before* processing outcome
      
      // Store the game result
      this.results.totalGames++;
      
      // Update statistics based on the outcome
      if (result.outcome === 'banker') {
        this.results.bankerWins++;
      } else if (result.outcome === 'player') {
        this.results.playerWins++;
      } else if (result.outcome === 'tie') {
        this.results.ties++;
      }

      // Determine if we won or lost the bet
      let wonBet = false;
      
      if (result.outcome === betOn) {
        wonBet = true;
        // Apply commission on banker bets (5%)
        if (betOn === 'banker') {
          bankroll += betAmount * 1.95; // Return original bet + 0.95x profit
        } else {
          bankroll += betAmount * 2; // Return original bet + 1x profit
        }
      } else if (result.outcome === 'tie') {
        // On tie, push the bet (return the original bet)
        bankroll += betAmount;
      }
      // Loss: nothing returned to bankroll

      // Update the bet state (consecutive wins/losses)
      if (wonBet) {
        betState.consecutiveWins++;
        betState.consecutiveLosses = 0;
      } else if (result.outcome !== 'tie') { // Loss
        betState.consecutiveLosses++;
        betState.consecutiveWins = 0;
        
        // Track maximum consecutive losses
        if (betState.consecutiveLosses > this.results.maxConsecutiveLosses) {
          this.results.maxConsecutiveLosses = betState.consecutiveLosses;
        }
      }
      // If tie, consecutive counts don't change.
      
      // Update max/min bankroll
      if (bankroll > this.results.maxBankroll) {
        this.results.maxBankroll = bankroll;
      }
      if (bankroll < this.results.minBankroll) {
        this.results.minBankroll = bankroll;
      }
      
      // Check if we're bankrupt
      if (bankroll <= 0) {
        break;
      }
    }

    this.results.endingBankroll = bankroll;
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
    const params = config.params || {};
    switch (config.type.toLowerCase()) {
        case 'flat':
            return BettingPatternAnalyzer.flatBettingStrategy(params.baseBet);
        case 'martingale':
            return BettingPatternAnalyzer.martingaleStrategy(params.baseBet);
        case 'fibonacci':
            return BettingPatternAnalyzer.fibonacciStrategy(params.baseBet);
        case 'dalembert':
            return BettingPatternAnalyzer.dAlembertStrategy(params.baseBet);
        case 'labouchere':
            if (!params.initialSequence || !Array.isArray(params.initialSequence)) {
                throw new Error("Labouchere strategy requires 'initialSequence' array in params.");
            }
            return BettingPatternAnalyzer.labouchereStrategy(params.baseBet, params.initialSequence);
        case 'custom_sequence':
            if (!params.lossProgression || !Array.isArray(params.lossProgression)) {
                throw new Error("Custom sequence strategy requires 'lossProgression' array in params.");
            }
            return BettingPatternAnalyzer.customSequenceStrategy(params);
        default:
            throw new Error(`Unknown strategy type: ${config.type}`);
    }
  }

  /**
   * Custom Sequence betting strategy.
   * Bets according to a predefined sequence on losses.
   * @param {Object} params - Parameters for the strategy.
   * @param {number} [params.baseBet=1] - The base unit multiplier for sequence values.
   * @param {number[]} params.lossProgression - Array of multipliers for consecutive losses. e.g. [1,2,4,8]
   * @param {boolean} [params.winReset=true] - If true, resets to the first element of progression on a win.
   * @param {boolean} [params.repeatLastOnMaxLoss=true] - If true, repeats the last progression value if losses exceed sequence length.
   * @returns {Function} A betting function `(state) => betAmount`.
   */
  static customSequenceStrategy(params) {
    const { baseBet = 1, lossProgression, winReset = true, repeatLastOnMaxLoss = true } = params;

    if (!Array.isArray(lossProgression) || lossProgression.length === 0) {
        throw new Error("Custom sequence strategy requires a non-empty 'lossProgression' array in params.");
    }

    return (state) => {
        if (state.consecutiveLosses === 0) { // Win or first bet
            return baseBet * lossProgression[0]; // Always bet first element of sequence after win or on first bet
        }

        let sequenceIndex = state.consecutiveLosses - 1; // 0-indexed for lossProgression

        if (sequenceIndex >= lossProgression.length) {
            if (repeatLastOnMaxLoss) {
                sequenceIndex = lossProgression.length - 1;
            } else {
                // Strategy exhausted, stop betting (or could throw error / use a max cap)
                // console.warn(`Custom sequence for strategy exhausted at ${state.consecutiveLosses} losses. Stopping bet.`);
                return 0; // Signal to stop betting
            }
        }
        return baseBet * lossProgression[sequenceIndex];
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
   * Fibonacci betting strategy - follow the Fibonacci sequence after losses
   * Sequence: 1, 1, 2, 3, 5, 8...
   * @param {number} [baseBet=1] - The base unit multiplier.
   * @returns {Function} A betting function for the Fibonacci system
   */
  static fibonacciStrategy(baseBet = 1) {
    return (state) => {
      if (state.consecutiveLosses === 0) return baseBet; // 1st unit
      if (state.consecutiveLosses === 1) return baseBet; // 1st unit (or 2nd number in 1,1 sequence)
      
      // For N losses (N >= 2), use the Nth number in 1,1,2,3,5... sequence.
      // Example: 2 losses -> bet 1 (fibSequence[1]), 3 losses -> bet 2 (fibSequence[2])
      let fib_a = 1; // Corresponds to fibSequence[0] for losses=1
      let fib_b = 1; // Corresponds to fibSequence[1] for losses=2
      for (let i = 2; i < state.consecutiveLosses; i++) { // Loop starts for 3rd loss
        const temp = fib_a + fib_b;
        fib_a = fib_b;
        fib_b = temp;
      }
      return baseBet * fib_b;
    };
  }

  /**
   * D'Alembert betting strategy - increase bet by one unit after a loss, decrease by one unit after a win
   * @param {number} [baseBetParam=1] - The unit to increase/decrease by.
   * @returns {Function} A betting function for the D'Alembert system
   */
  static dAlembertStrategy(baseBetParam = 1) {
    const baseBet = baseBetParam; // Capture in closure for consistency

    return (state) => {
      // Initialize current bet for D'Alembert in the state object if not present
      if (state.dAlembertCurrentBet === undefined) {
        state.dAlembertCurrentBet = baseBet;
      }
      
      // Update current bet based on the outcome of the *previous* bet
      if (state.previousResults.length > 0) { // Don't adjust on the very first bet
        const lastOutcome = state.previousResults[state.previousResults.length - 1];
        // state.betOn refers to the bet type for the *current* game.
        // We assume betOn choice is consistent for the D'Alembert sequence.
        const previousBetWasOn = state.betOn; 
        
        if (lastOutcome !== 'tie') {
          if (lastOutcome === previousBetWasOn) { // Previous bet was a WIN
            state.dAlembertCurrentBet = Math.max(baseBet, state.dAlembertCurrentBet - baseBet);
          } else { // Previous bet was a LOSS
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
    const initialSequence = [...initialSequenceParam]; // Ensure it's a copy

    return (state) => {
      // Initialize or reset sequence in state
      if (!state.labouchereSequence) {
        state.labouchereSequence = [...initialSequence];
      }

      // Process outcome of the *previous* bet
      if (state.previousResults.length > 0) {
        const lastOutcome = state.previousResults[state.previousResults.length - 1];
        const previousBetWasOn = state.betOn; // Assumes betOn is consistent

        if (lastOutcome !== 'tie') {
          if (lastOutcome === previousBetWasOn) { // WIN
            if (state.labouchereSequence.length > 0) state.labouchereSequence.shift();
            if (state.labouchereSequence.length > 0) state.labouchereSequence.pop();
          } else { // LOSS
            // Add the amount of the last bet (in units) to the end of the sequence
            if (state.lastBet > 0 && baseBet > 0) {
              const lastBetUnits = Math.round(state.lastBet / baseBet); // Use Math.round to avoid floating point issues
              if (lastBetUnits > 0) {
                state.labouchereSequence.push(lastBetUnits);
              }
            }
          }
        }
      }
      
      // If sequence is empty (goal met), reset for next cycle
      if (state.labouchereSequence.length === 0) {
        state.labouchereSequence = [...initialSequence];
        // If initialSequence is also empty, this strategy effectively stops.
        if (state.labouchereSequence.length === 0) return 0; // Cannot bet
      }
      
      // Determine current bet amount
      let currentBetUnits;
      if (state.labouchereSequence.length === 1) {
        currentBetUnits = state.labouchereSequence[0];
      } else { // length is > 1 (or 0 if initial was empty and not handled)
        currentBetUnits = state.labouchereSequence[0] + state.labouchereSequence[state.labouchereSequence.length - 1];
      }
      
      return currentBetUnits * baseBet;
    };
  }
}

module.exports = BettingPatternAnalyzer;