# Baccarat Betting Pattern Analysis

This project provides tools to analyze different betting patterns in Baccarat and how they interact with the house edge. It simulates thousands of games with various betting strategies to determine their effectiveness and how the house edge compounds over time.

## Requirements

- Docker
- Docker Compose

No need to install Node.js directly!

## Included Betting Strategies

1. **Flat Betting** - Always bet the same amount (control strategy)
2. **Martingale** - Double your bet after each loss
3. **Fibonacci** - Follow the Fibonacci sequence after losses
4. **D'Alembert** - Increase bet by one unit after loss, decrease by one unit after win

## Running the Analysis

### Quick Start

To analyze all betting patterns:

```bash
docker-compose up betting-patterns
```

To analyze how the house edge compounds over time:

```bash
docker-compose up house-edge
```

### Building and Running Manually

If you prefer to build and run the container manually:

```bash
# Build the Docker image
docker build -t baccarat-analysis .

# Run the betting patterns analysis
docker run -it --rm baccarat-analysis node test-betting-patterns.js

# Run the house edge compounding analysis
docker run -it --rm baccarat-analysis node test-house-edge-compounding.js
```

### Customizing the Analysis

To modify parameters like starting bankroll, base bet, or number of simulations:

1. Start an interactive shell:
   ```bash
   docker-compose run dev
   ```

2. Edit the test scripts inside the container:
   ```bash
   # Inside the container
   vi test-betting-patterns.js
   # or
   vi test-house-edge-compounding.js
   ```

3. Run the modified script:
   ```bash
   node test-betting-patterns.js
   ```

Alternatively, you can edit the files locally and they will be synced to the container through the volume mapping.

## Understanding the Results

The analysis will show:

- **Win/Loss Statistics**: Percentage of player wins, banker wins, and ties
- **Bankroll Changes**: Starting, ending, maximum, and minimum bankroll values
- **Betting Statistics**: Number of bets placed, largest bet, max consecutive losses
- **ROI**: Return on investment percentage
- **House Edge**: Calculated effective house edge compared to theoretical edge

## House Edge in Baccarat

The theoretical house edge in Baccarat is:
- Banker bet: 1.06%
- Player bet: 1.24%
- Tie bet: 14.36% (not simulated in this analysis)

The analysis examines how different betting patterns interact with this house edge and potentially compound it over time.

## Notes on Betting Systems

No betting system can overcome the house edge in the long run. The simulations are designed to demonstrate:

1. How quickly your bankroll changes with different strategies
2. The risk of bankruptcy for progressive betting systems
3. The way the house edge compounds over extended play
4. The maximum and minimum bankroll points during play
5. How the effective house edge compares to the theoretical house edge

## Extending the Analysis

You can modify the BettingPatternAnalyzer class to add your own custom betting strategies by adding new static methods similar to the existing ones. 