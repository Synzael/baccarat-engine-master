'use strict';

class BettingPatternAnalyzer {
    // ... (constructor, resetResults, simulateBettingPattern, createStrategyFromConfig) ...
    // ... (_getBettingFibonacciValue, martingaleStrategy, fibonacciStrategy - these remain as previously modified) ...

    /**
     * Custom Sequence betting strategy.
     * Bets according to a predefined sequence defined in lossProgression.
     * Behavior can be 'standard' (resets on win if specified) or 'fibonacci_step' (moves back 2 steps in the array on win).
     * @param {Object} params - Parameters for the strategy.
     * @param {number} [params.baseBet=1] - The base unit multiplier for sequence values. NOTE: If lossProgression contains absolute bet amounts, baseBet should be 1.
     * @param {number[]} params.lossProgression - Array of bet multipliers or absolute bet amounts.
     * @param {string} [params.behavior='standard'] - How the sequence progresses. 'standard' or 'fibonacci_step'.
     * @param {boolean} [params.winReset=true] - For 'standard' behavior: if true, resets to start of progression on a win.
     * @param {boolean} [params.repeatLastOnMaxLoss=true] - If true, repeats the last progression value if current index exceeds sequence length.
     * @returns {Function} A betting function `(state) => betAmount`.
     */
    static customSequenceStrategy(params) {
        const {
            baseBet = 1, // If lossProgression has absolute bet values, baseBet should be 1.
            lossProgression,
            behavior = 'standard', // 'standard' or 'fibonacci_step'
            winReset = true,       // Only used if behavior is 'standard'
            repeatLastOnMaxLoss = true
        } = params;

        if (!Array.isArray(lossProgression) || lossProgression.length === 0) {
            throw new Error("Custom sequence strategy requires a non-empty 'lossProgression' array in params.");
        }

        return (state) => {
            // Initialize custom sequence index if not present in the state for this simulation
            if (state.customSequenceCurrentIndex === undefined) {
                state.customSequenceCurrentIndex = 0; // Start at the 0th index of the lossProgression array
            }

            // Adjust customSequenceCurrentIndex based on the outcome of the PREVIOUS bet
            if (state.previousResults.length > 0) {
                const lastOutcome = state.previousResults[state.previousResults.length - 1];
                const previousBetWasOn = state.betOn; // The bet type for the game that just finished

                if (lastOutcome !== 'tie') {
                    if (lastOutcome === previousBetWasOn) { // WIN
                        if (behavior === 'fibonacci_step') {
                            state.customSequenceCurrentIndex = Math.max(0, state.customSequenceCurrentIndex - 2);
                        } else { // 'standard' behavior (or any other future behaviors)
                            if (winReset) {
                                state.customSequenceCurrentIndex = 0;
                            }
                            // If 'standard' and winReset is false, index remains at current step on win.
                        }
                    } else { // LOSS
                        state.customSequenceCurrentIndex++;
                    }
                }
                // On TIE, customSequenceCurrentIndex does not change for any behavior.
            }
            // If previousResults.length is 0, it's the first bet, index remains 0.

            let currentIndexForBet = state.customSequenceCurrentIndex;

            // Handle exceeding the sequence length
            if (currentIndexForBet >= lossProgression.length) {
                if (repeatLastOnMaxLoss) {
                    currentIndexForBet = lossProgression.length - 1; // Use the last value in the sequence
                } else {
                    // Strategy sequence exhausted, and not repeating. Stop betting.
                    // console.warn(`Custom sequence for "${params.name || 'Unnamed Strategy'}" exhausted. Stopping bet.`);
                    return 0; // Signal to stop betting
                }
            }
            // Ensure index is not negative (can happen if sequence is very short and fibonacci_step is used)
             if (currentIndexForBet < 0) {
                currentIndexForBet = 0;
            }


            const betValueFromProgression = lossProgression[currentIndexForBet];
            return baseBet * betValueFromProgression; // Apply baseBet multiplier
        };
    }

    // ... (dAlembertStrategy, flatBettingStrategy, labouchereStrategy remain the same) ...
}

module.exports = BettingPatternAnalyzer;