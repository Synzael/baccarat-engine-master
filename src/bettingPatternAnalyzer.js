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
      currentConsecutiveLosses: 0
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
      currentConsecutiveLosses: 0
    };
  }

  /**
   * Run a simulation of a specific betting pattern
   * @param {Object} options - Simulation options
   * @param {number} options.numGames - Number of games to simulate
   * @param {number} options.startingBankroll - Starting bankroll amount
   * @param {Function} options.betFunction - Function that returns the next bet amount
   * @param {string} options.betOn - Which outcome to bet on ('player', 'banker')
   * @returns {Object} Simulation results
   */
  simulateBettingPattern({ numGames, startingBankroll, betFunction, betOn = 'banker' }) {
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
      // Additional state for complex strategies
      labouchereSequence: null,
      currentSequenceIndex: 0
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
      
      if (betAmount > this.results.largestBet) {
        this.results.largestBet = betAmount;
      }

      // Skip bet if we don't have enough money
      if (betAmount > bankroll) {
        break;
      }

      // Place the bet (reduce bankroll)
      bankroll -= betAmount;
      this.results.betsPlaced++;

      // Deal a hand and get the result
      const hand = this.gameEngine.dealGame();
      const result = this.gameEngine.resultsEngine.calculateGameResult(hand);
      
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

      // Update the bet state
      if (wonBet) {
        betState.consecutiveWins++;
        betState.consecutiveLosses = 0;
      } else if (result.outcome !== 'tie') {
        betState.consecutiveLosses++;
        betState.consecutiveWins = 0;
        
        // Track maximum consecutive losses
        if (betState.consecutiveLosses > this.results.maxConsecutiveLosses) {
          this.results.maxConsecutiveLosses = betState.consecutiveLosses;
        }
      }
      
      betState.lastBet = betAmount;
      betState.previousResults.push(result.outcome);
      
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
   * Martingale betting strategy - double bet after each loss
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
   * @returns {Function} A betting function for the Fibonacci system
   */
  static fibonacciStrategy(baseBet = 1) {
    return (state) => {
      if (state.consecutiveLosses === 0) {
        return baseBet;
      }
      
      // Calculate Fibonacci number for the current loss streak
      let a = 1;
      let b = 1;
      for (let i = 2; i <= state.consecutiveLosses; i++) {
        const temp = a + b;
        a = b;
        b = temp;
      }
      
      return baseBet * b;
    };
  }
  // static fibonacciStrategy(baseBet = 1) {
  //   return (state) => {
  //     if (state.consecutiveLosses === 0) {
  //       return baseBet;
  //     }
  //     let myHash = {
  //       1: 50,
  //       2: 100,
  //       3: 150,
  //       4: 250,
  //       5: 400,
  //       6: 650,
  //       7: 1050,
  //       8: 1700,
  //       9: 3000
  //     }
  //     for (let i = 2; i <= state.consecutiveLosses; i++) {
  //       if(i==9){
  //         let i=2
  //         return 50
  //       }
  //       return myHash[i];
  //     };
  //     // Calculate Fibonacci number for the current loss streak
  //     // let a = 1;
  //     // let b = 1;
  //     // for (let i = 2; i <= state.consecutiveLosses; i++) {
  //     //   const temp = a + b;
  //     //   a = b;
  //     //   b = temp;
  //     // }
      
     
  //   };
  // }
  /**
   * D'Alembert betting strategy - increase bet by one unit after a loss, decrease by one unit after a win
   * @returns {Function} A betting function for the D'Alembert system
   */
  static dAlembertStrategy(baseBet = 1) {
    let currentBet = baseBet;
    
    return (state) => {
      if (state.previousResults.length === 0) {
        return baseBet;
      }
      
      const lastResult = state.previousResults[state.previousResults.length - 1];
      const lastBetOn = 'banker'; // Assuming banker is default
      
      // If last game was a tie, keep the same bet
      if (lastResult === 'tie') {
        return currentBet;
      }
      
      // After a win, decrease bet by one unit (but not below base bet)
      if (lastResult === lastBetOn) {
        currentBet = Math.max(baseBet, currentBet - baseBet);
      } 
      // After a loss, increase bet by one unit
      else {
        currentBet = currentBet + baseBet;
      }
      
      return currentBet;
    };
  }

  /**
   * Flat betting strategy - always bet the same amount
   * @returns {Function} A betting function for flat betting
   */
  static flatBettingStrategy(baseBet = 1) {
    return () => baseBet;
  }

  /**
   * Labouchère (cancellation) betting strategy
   * Start with a sequence of numbers (e.g. [1, 2, 3])
   * Bet the sum of the first and last numbers
   * If you win, remove those numbers from the sequence
   * If you lose, add the amount you just bet to the end of the sequence
   * @param {number} baseBet - Base betting unit
   * @param {number[]} initialSequence - Initial sequence to use
   * @returns {Function} A betting function for the Labouchère system
   */
  static labouchereStrategy(baseBet = 1, initialSequence = [1, 2, 3]) {
    return (state) => {
      // Initialize sequence on first bet
      if (!state.labouchereSequence) {
        state.labouchereSequence = [...initialSequence];
      }
      
      // If sequence is empty, restart with initial sequence
      if (state.labouchereSequence.length === 0) {
        state.labouchereSequence = [...initialSequence];
      }
      
      // If only one number left in sequence, bet that amount
      if (state.labouchereSequence.length === 1) {
        return baseBet * state.labouchereSequence[0];
      }
      
      // Calculate bet amount (sum of first and last numbers in sequence)
      const first = state.labouchereSequence[0];
      const last = state.labouchereSequence[state.labouchereSequence.length - 1];
      const betAmount = (first + last) * baseBet;
      
      // Handle win/loss from previous bet (except for first bet)
      if (state.previousResults.length > 0) {
        const lastResult = state.previousResults[state.previousResults.length - 1];
        const lastBetOn = 'banker'; // Assuming banker is default
        
        // If last game wasn't a tie
        if (lastResult !== 'tie') {
          // After a win, remove first and last numbers from sequence
          if (lastResult === lastBetOn) {
            state.labouchereSequence.shift();
            if (state.labouchereSequence.length > 0) {
              state.labouchereSequence.pop();
            }
          } 
          // After a loss, add the last bet amount to the end of the sequence
          else {
            // The last bet amount divided by baseBet to get the raw units
            const lastBetUnits = state.lastBet / baseBet;
            state.labouchereSequence.push(lastBetUnits);
          }
        }
      }
      
      return betAmount;
    };
  }
}

module.exports = BettingPatternAnalyzer; 