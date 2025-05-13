/* eslint-disable no-console */
'use strict';

const BaccaratGameEngine = require('./src/gameEngine/baccaratGameEngine');
const BettingPatternAnalyzer = require('./src/bettingPatternAnalyzer');

// Helper function to format numbers with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Analyzes how the house edge compounds over different numbers of hands played
 * @param {string} strategyName - The name of the strategy being tested
 * @param {BettingPatternAnalyzer} analyzer - The betting pattern analyzer
 * @param {Function} betFunction - The betting function to use
 * @param {string} betOn - Which outcome to bet on ('banker' or 'player')
 * @param {number} numTrials - Number of trials to run for each checkpoint
 */
function analyzeHouseEdgeCompounding(strategyName, analyzer, betFunction, betOn = 'banker', numTrials = 100) {
  console.log(`\n==== House Edge Compounding Analysis: ${strategyName} Strategy ====`);
  console.log(`Betting on: ${betOn}`);
  console.log(`Number of trials per checkpoint: ${numTrials}\n`);
  
  // Define checkpoints (number of hands to simulate)
  const checkpoints = [
    10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000
  ];
  
  const results = {};
  
  for (const numHands of checkpoints) {
    console.log(`Running ${numTrials} trials of ${formatNumber(numHands)} hands each...`);
    
    let totalROI = 0;
    let bankruptcies = 0;
    let totalEdge = 0;
    
    // Run multiple trials to get an average
    for (let trial = 0; trial < numTrials; trial++) {
      const trialResult = analyzer.simulateBettingPattern({
        numGames: numHands,
        startingBankroll: 10000,
        betFunction,
        betOn
      });
      
      // Calculate Return on Investment for this trial
      const roi = (trialResult.endingBankroll / trialResult.startingBankroll) - 1;
      totalROI += roi;
      
      // Calculate effective house edge
      const totalBetAmount = trialResult.betsPlaced * 10; // Assuming base bet is 10
      const loss = trialResult.startingBankroll - trialResult.endingBankroll;
      const edgePercent = (loss / totalBetAmount) * 100;
      totalEdge += edgePercent;
      
      // Count bankruptcies
      if (trialResult.endingBankroll <= 0) {
        bankruptcies++;
      }
    }
    
    const averageROI = (totalROI / numTrials) * 100;
    const averageEdge = totalEdge / numTrials;
    const bankruptcyRate = (bankruptcies / numTrials) * 100;
    
    results[numHands] = {
      averageROI,
      averageEdge,
      bankruptcyRate
    };
    
    console.log(`  After ${formatNumber(numHands)} hands:`);
    console.log(`    Average ROI: ${averageROI.toFixed(2)}%`);
    console.log(`    Effective house edge: ${averageEdge.toFixed(4)}%`);
    console.log(`    Bankruptcy rate: ${bankruptcyRate.toFixed(2)}%`);
  }
  
  // Analyze the compounding effect
  console.log(`\n==== Compounding Effect Analysis for ${strategyName} ====`);
  
  const theoreticalEdge = betOn === 'banker' ? 1.06 : 1.24;
  console.log(`Theoretical house edge for ${betOn} bets: ${theoreticalEdge}%`);
  
  let previousEdge = null;
  for (const numHands of checkpoints) {
    const { averageEdge } = results[numHands];
    
    if (previousEdge !== null) {
      const relativeIncrease = ((averageEdge - previousEdge) / previousEdge) * 100;
      
      console.log(`From ${formatNumber(checkpoints[checkpoints.indexOf(numHands) - 1])} to ${formatNumber(numHands)} hands:`);
      console.log(`  Effective edge increased from ${previousEdge.toFixed(4)}% to ${averageEdge.toFixed(4)}%`);
      console.log(`  Relative change: ${relativeIncrease > 0 ? '+' : ''}${relativeIncrease.toFixed(2)}%`);
      console.log(`  Edge multiplier vs theoretical: ${(averageEdge / theoreticalEdge).toFixed(2)}x`);
    }
    
    previousEdge = averageEdge;
  }
  
  return results;
}

// Initialize the game engine
const gameEngine = new BaccaratGameEngine();
gameEngine.shoe.createDecks();
gameEngine.shoe.shuffle();
gameEngine.burnCards();

// Create the betting pattern analyzer
const analyzer = new BettingPatternAnalyzer(gameEngine);

// Define base bet amount
const BASE_BET = 10;
const NUM_TRIALS = 10; // Reduced for faster execution

// Analyze flat betting (control)
analyzeHouseEdgeCompounding(
  'Flat Betting',
  analyzer,
  BettingPatternAnalyzer.flatBettingStrategy(BASE_BET),
  'banker',
  NUM_TRIALS
);

// Analyze Fibonacci
analyzeHouseEdgeCompounding(
  'Fibonacci',
  analyzer,
  BettingPatternAnalyzer.fibonacciStrategy(BASE_BET),
  'banker',
  NUM_TRIALS
);

// Analyze Martingale
analyzeHouseEdgeCompounding(
  'Martingale',
  analyzer,
  BettingPatternAnalyzer.martingaleStrategy(BASE_BET),
  'banker',
  NUM_TRIALS
);

// Analyze D'Alembert
analyzeHouseEdgeCompounding(
  "D'Alembert",
  analyzer,
  BettingPatternAnalyzer.dAlembertStrategy(BASE_BET),
  'banker',
  NUM_TRIALS
);

// Analyze Labouchère
analyzeHouseEdgeCompounding(
  "Labouchère",
  analyzer,
  BettingPatternAnalyzer.labouchereStrategy(BASE_BET, [1, 2, 3, 4]),
  'banker',
  NUM_TRIALS
); 