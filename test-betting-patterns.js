/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');
const BaccaratGameEngine = require('./src/gameEngine/baccaratGameEngine');
const BettingPatternAnalyzer = require('./src/bettingPatternAnalyzer');

// Helper function to format numbers with commas
function formatNumber(num) {
  if (typeof num !== 'number') return String(num);
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Runs a simulation with a specific betting strategy and displays the results
 * @param {string} strategyName - The name of the strategy being tested
 * @param {BettingPatternAnalyzer} analyzer - The betting pattern analyzer
 * @param {Function} betFunction - The betting function to use
 * @param {Object} options - Additional simulation options (numGames, startingBankroll, betOn, baseBetForStrategy)
 */
function runSimulation(strategyName, analyzer, betFunction, options = {}) {
  console.log(`\n==== ${strategyName} Strategy Simulation ====`);
  
  const simulationOptions = {
    numGames: options.numGames || 10000,
    startingBankroll: options.startingBankroll || 1000,
    betFunction,
    betOn: options.betOn || 'banker',
    baseBetForStrategy: options.baseBetForStrategy || 1 // For strategy's internal unit logic
  };
  
  console.log(`Starting bankroll: $${formatNumber(simulationOptions.startingBankroll)}`);
  console.log(`Number of games to simulate: ${formatNumber(simulationOptions.numGames)}`);
  console.log(`Betting on: ${simulationOptions.betOn}`);
  
  const startTime = Date.now();
  // Pass baseBetForStrategy to simulateBettingPattern if strategies need it in their state
  const results = analyzer.simulateBettingPattern(simulationOptions);
  const endTime = Date.now();
  
  const returnPercentage = (results.endingBankroll / results.startingBankroll * 100).toFixed(2);
  const netProfit = results.endingBankroll - results.startingBankroll;
  const simulationTime = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log(`\nSimulation completed in ${simulationTime} seconds.`);
  console.log(`Games played: ${formatNumber(results.totalGames)} (${((results.totalGames / simulationOptions.numGames) * 100).toFixed(2)}% of planned games)`);
  console.log(`Banker wins: ${formatNumber(results.bankerWins)} (${results.totalGames > 0 ? (results.bankerWins / results.totalGames * 100).toFixed(2) : '0.00'}%)`);
  console.log(`Player wins: ${formatNumber(results.playerWins)} (${results.totalGames > 0 ? (results.playerWins / results.totalGames * 100).toFixed(2) : '0.00'}%)`);
  console.log(`Ties: ${formatNumber(results.ties)} (${results.totalGames > 0 ? (results.ties / results.totalGames * 100).toFixed(2) : '0.00'}%)`);
  console.log(`\nBets placed: ${formatNumber(results.betsPlaced)}`);
  console.log(`Largest bet: $${formatNumber(results.largestBet)}`);
  console.log(`Max consecutive losses: ${results.maxConsecutiveLosses}`);
  console.log(`\nEnding bankroll: $${formatNumber(results.endingBankroll)} (${results.startingBankroll !== 0 ? returnPercentage : 'N/A'}% of starting bankroll)`);
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

// Default Simulation options (can be overridden by JSON for custom strategies)
const DEFAULT_GAMES_TO_SIMULATE = 5000;
const DEFAULT_STARTING_BANKROLL = 26000;
const DEFAULT_BASE_BET = 5; // For built-in strategies if not configured otherwise

const allSimulationResults = {};

// Load and run custom strategies from JSON
try {
    const patternsFilePath = path.join(__dirname, 'custom-patterns.json'); // Assumes custom-patterns.json is in the same directory
    if (fs.existsSync(patternsFilePath)) {
        const rawData = fs.readFileSync(patternsFilePath, 'utf-8');
        const customStrategyConfigs = JSON.parse(rawData);

        console.log(`\nFound ${customStrategyConfigs.length} custom strategies in custom-patterns.json`);

        for (const strategyConfig of customStrategyConfigs) {
            try {
                // Use baseBet from params if available, otherwise it's handled by strategy's default or structure
                const baseBetForStrategy = strategyConfig.params && strategyConfig.params.baseBet !== undefined 
                                           ? strategyConfig.params.baseBet 
                                           : DEFAULT_BASE_BET;

                const betFunction = BettingPatternAnalyzer.createStrategyFromConfig(strategyConfig);
                
                const simOptions = {
                    numGames: strategyConfig.numGames || DEFAULT_GAMES_TO_SIMULATE,
                    startingBankroll: strategyConfig.startingBankroll || DEFAULT_STARTING_BANKROLL,
                    betOn: strategyConfig.betOn || 'banker',
                    baseBetForStrategy: baseBetForStrategy // Pass this to runSimulation
                };

                allSimulationResults[strategyConfig.name] = runSimulation(
                    strategyConfig.name,
                    analyzer,
                    betFunction,
                    simOptions
                );
            } catch (e) {
                console.error(`\nERROR: Failed to initialize or run custom strategy "${strategyConfig.name}": ${e.message}`);
                console.error(e.stack); // For more detailed error
            }
        }
    } else {
        console.log("\ncustom-patterns.json not found. Skipping custom strategies.");
    }
} catch (error) {
    console.error("\nERROR: Error loading or parsing custom-patterns.json:", error);
}


// Run built-in strategies (you can choose to remove these if all strategies will be JSON-defined)
console.log("\n==== Running Built-in Strategies ====");
const builtInStrategiesToRun = [
    { name: 'Flat Betting (Built-in)', strategyFnGetter: () => BettingPatternAnalyzer.flatBettingStrategy(DEFAULT_BASE_BET), baseBet: DEFAULT_BASE_BET },
    { name: 'Martingale (Built-in)', strategyFnGetter: () => BettingPatternAnalyzer.martingaleStrategy(DEFAULT_BASE_BET), baseBet: DEFAULT_BASE_BET },
    { name: 'Fibonacci (Built-in)', strategyFnGetter: () => BettingPatternAnalyzer.fibonacciStrategy(DEFAULT_BASE_BET), baseBet: DEFAULT_BASE_BET },
    { name: "D'Alembert (Built-in)", strategyFnGetter: () => BettingPatternAnalyzer.dAlembertStrategy(DEFAULT_BASE_BET), baseBet: DEFAULT_BASE_BET },
    { 
      name: "Labouchère (Built-in)", 
      strategyFnGetter: () => BettingPatternAnalyzer.labouchereStrategy(DEFAULT_BASE_BET, [1, 2, 3, 4]), 
      baseBet: DEFAULT_BASE_BET,
      // params: { initialSequence: [1,2,3,4]} // For consistency if needed
    }
];

for (const strategyDef of builtInStrategiesToRun) {
    if (!allSimulationResults[strategyDef.name]) { // Avoid re-running if a custom strategy has the same name
        allSimulationResults[strategyDef.name] = runSimulation(
            strategyDef.name,
            analyzer,
            strategyDef.strategyFnGetter(),
            { 
                numGames: DEFAULT_GAMES_TO_SIMULATE, 
                startingBankroll: DEFAULT_STARTING_BANKROLL,
                betOn: 'banker', // Default for built-ins
                baseBetForStrategy: strategyDef.baseBet
            }
        );
    } else {
        console.log(`\nSkipping built-in strategy "${strategyDef.name}" as a custom strategy with the same name was already run.`);
    }
}


// Compare the results of all strategies
console.log('\n\n==== Overall Strategy Comparison ====');
const strategyNames = Object.keys(allSimulationResults);

if (strategyNames.length > 0) {
    strategyNames.sort((a, b) => allSimulationResults[b].endingBankroll - allSimulationResults[a].endingBankroll);

    for (const strategyName of strategyNames) {
      const result = allSimulationResults[strategyName];
      if (!result || typeof result.endingBankroll !== 'number' || typeof result.startingBankroll !== 'number') {
          console.log(`${strategyName} strategy: Results are incomplete or invalid.`);
          continue;
      }
      const returnPercentage = result.startingBankroll !== 0 ? (result.endingBankroll / result.startingBankroll * 100).toFixed(2) : 'N/A';
      const netReturn = result.endingBankroll - result.startingBankroll;
      
      console.log(`${strategyName}: Ended with $${formatNumber(result.endingBankroll)} (${returnPercentage}%), Net: $${netReturn > 0 ? '+' : ''}${formatNumber(netReturn)}`);
    }

    const bestStrategyName = strategyNames[0]; // Already sorted
    console.log(`\nBest performing strategy: ${bestStrategyName} with ending bankroll of $${formatNumber(allSimulationResults[bestStrategyName].endingBankroll)}`);

    // Calculate house edge from a flat betting strategy if available
    const flatStrategyName = strategyNames.find(name => name.toLowerCase().includes('flat betting'));
    if (flatStrategyName && allSimulationResults[flatStrategyName] && allSimulationResults[flatStrategyName].totalGames > 0) {
      const flatBetResult = allSimulationResults[flatStrategyName];
      // Try to get baseBet used for this flat strategy
      let flatBaseBet = DEFAULT_BASE_BET; // Fallback
      const flatBuiltIn = builtInStrategiesToRun.find(s => s.name === flatStrategyName);
      if (flatBuiltIn) {
          flatBaseBet = flatBuiltIn.baseBet;
      } else {
          // Check if it was a custom one
          const patternsFilePath = path.join(__dirname, 'custom-patterns.json');
          if (fs.existsSync(patternsFilePath)) {
              const cfgs = JSON.parse(fs.readFileSync(patternsFilePath, 'utf-8'));
              const customCfg = cfgs.find(c => c.name === flatStrategyName && c.type.toLowerCase() === 'flat');
              if (customCfg && customCfg.params && customCfg.params.baseBet !== undefined) {
                  flatBaseBet = customCfg.params.baseBet;
              }
          }
      }

      const flatBettingEdge = (flatBetResult.startingBankroll - flatBetResult.endingBankroll) / (flatBaseBet * flatBetResult.betsPlaced) * 100;
      console.log(`\nCalculated house edge (from ${flatStrategyName}): ${flatBettingEdge.toFixed(4)}% (using base bet $${flatBaseBet})`);
      console.log(`Theoretical house edge for banker bets: 1.06%, player bets: 1.24%`);
    }

} else {
    console.log("No strategies were run or results available for comparison.");
}