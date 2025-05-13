/* eslint-disable no-console */
'use strict';

const BaccaratGameEngine = require('./src/gameEngine/baccaratGameEngine');
const BettingPatternAnalyzer = require('./src/bettingPatternAnalyzer');

// Helper function to format numbers with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Runs a simulation with a specific betting strategy and displays the results
 * @param {string} strategyName - The name of the strategy being tested
 * @param {BettingPatternAnalyzer} analyzer - The betting pattern analyzer
 * @param {Function} betFunction - The betting function to use
 * @param {Object} options - Additional simulation options
 */
function runSimulation(strategyName, analyzer, betFunction, options = {}) {
  console.log(`\n==== ${strategyName} Strategy Simulation ====`);
  
  const simulationOptions = {
    numGames: options.numGames || 10000,
    startingBankroll: options.startingBankroll || 1000,
    betFunction,
    betOn: options.betOn || 'banker'
  };
  
  console.log(`Starting bankroll: $${formatNumber(simulationOptions.startingBankroll)}`);
  console.log(`Number of games to simulate: ${formatNumber(simulationOptions.numGames)}`);
  console.log(`Betting on: ${simulationOptions.betOn}`);
  
  const startTime = Date.now();
  const results = analyzer.simulateBettingPattern(simulationOptions);
  const endTime = Date.now();
  
  const returnPercentage = (results.endingBankroll / results.startingBankroll * 100).toFixed(2);
  const netProfit = results.endingBankroll - results.startingBankroll;
  const simulationTime = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log(`\nSimulation completed in ${simulationTime} seconds.`);
  console.log(`Games played: ${formatNumber(results.totalGames)} (${((results.totalGames / simulationOptions.numGames) * 100).toFixed(2)}% of planned games)`);
  console.log(`Banker wins: ${formatNumber(results.bankerWins)} (${(results.bankerWins / results.totalGames * 100).toFixed(2)}%)`);
  console.log(`Player wins: ${formatNumber(results.playerWins)} (${(results.playerWins / results.totalGames * 100).toFixed(2)}%)`);
  console.log(`Ties: ${formatNumber(results.ties)} (${(results.ties / results.totalGames * 100).toFixed(2)}%)`);
  console.log(`\nBets placed: ${formatNumber(results.betsPlaced)}`);
  console.log(`Largest bet: $${formatNumber(results.largestBet)}`);
  console.log(`Max consecutive losses: ${results.maxConsecutiveLosses}`);
  console.log(`\nEnding bankroll: $${formatNumber(results.endingBankroll)} (${returnPercentage}% of starting bankroll)`);
  console.log(`Net profit/loss: $${netProfit > 0 ? '+' : ''}${formatNumber(netProfit)}`);
  console.log(`Maximum bankroll: $${formatNumber(results.maxBankroll)}`);
  console.log(`Minimum bankroll: $${formatNumber(results.minBankroll)}`);
  
  return results;
}

// Initialize the game engine
const gameEngine = new BaccaratGameEngine();
gameEngine.shoe.createDecks();
gameEngine.shoe.shuffle();
gameEngine.burnCards();

// Create the betting pattern analyzer
const analyzer = new BettingPatternAnalyzer(gameEngine);

// Simulation options
const GAMES_TO_SIMULATE = 5000;
const STARTING_BANKROLL = 26000;
const BASE_BET = 5;

// Run simulations with different betting strategies
const results = {};

// Flat betting (control)
results.flat = runSimulation(
  'Flat Betting',
  analyzer,
  BettingPatternAnalyzer.flatBettingStrategy(BASE_BET),
  { numGames: GAMES_TO_SIMULATE, startingBankroll: STARTING_BANKROLL }
);

// Martingale
results.martingale = runSimulation(
  'Martingale',
  analyzer,
  BettingPatternAnalyzer.martingaleStrategy(BASE_BET),
  { numGames: GAMES_TO_SIMULATE, startingBankroll: STARTING_BANKROLL }
);

// Fibonacci
results.fibonacci = runSimulation(
  'Fibonacci',
  analyzer,
  BettingPatternAnalyzer.fibonacciStrategy(BASE_BET),
  { numGames: GAMES_TO_SIMULATE, startingBankroll: STARTING_BANKROLL }
);

// D'Alembert
results.dAlembert = runSimulation(
  "D'Alembert",
  analyzer,
  BettingPatternAnalyzer.dAlembertStrategy(BASE_BET),
  { numGames: GAMES_TO_SIMULATE, startingBankroll: STARTING_BANKROLL }
);

// Labouchère
results.labouchere = runSimulation(
  "Labouchère",
  analyzer,
  BettingPatternAnalyzer.labouchereStrategy(BASE_BET, [1, 2, 3, 4]),
  { numGames: GAMES_TO_SIMULATE, startingBankroll: STARTING_BANKROLL }
);

// Compare the results of all strategies
console.log('\n==== Strategy Comparison ====');
const strategies = Object.keys(results);
for (const strategy of strategies) {
  const result = results[strategy];
  const returnPercentage = (result.endingBankroll / result.startingBankroll * 100).toFixed(2);
  const netReturn = result.endingBankroll - result.startingBankroll;
  
  console.log(`${strategy} strategy: $${formatNumber(result.endingBankroll)} (${returnPercentage}%), Net: $${netReturn > 0 ? '+' : ''}${formatNumber(netReturn)}`);
}

// Find the best strategy based on ending bankroll
const bestStrategy = strategies.reduce((best, current) => {
  return results[current].endingBankroll > results[best].endingBankroll ? current : best;
}, strategies[0]);

console.log(`\nBest performing strategy: ${bestStrategy} with ending bankroll of $${formatNumber(results[bestStrategy].endingBankroll)}`);

// Calculate how the house edge compounds
if (results.flat.totalGames > 0) {
  const flatBettingEdge = (STARTING_BANKROLL - results.flat.endingBankroll) / (BASE_BET * results.flat.totalGames) * 100;
  console.log(`\nCalculated house edge (from flat betting): ${flatBettingEdge.toFixed(4)}%`);
  console.log(`Theoretical house edge for banker bets: 1.06%, player bets: 1.24%`);
} 