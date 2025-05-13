#!/bin/bash

# Colors for better output readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Baccarat Betting Pattern Analysis${NC}"
echo "=================================="
echo ""
echo "Please select an analysis to run:"
echo ""
echo "1) Basic Betting Patterns Analysis"
echo "2) House Edge Compounding Analysis"
echo "3) Run Both Analyses"
echo "4) Interactive Shell"
echo "5) Exit"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
  1)
    echo -e "${GREEN}Running Basic Betting Patterns Analysis...${NC}"
    docker-compose up betting-patterns
    ;;
  2)
    echo -e "${GREEN}Running House Edge Compounding Analysis...${NC}"
    docker-compose up house-edge
    ;;
  3)
    echo -e "${GREEN}Running Both Analyses...${NC}"
    docker-compose up betting-patterns
    docker-compose up house-edge
    ;;
  4)
    echo -e "${GREEN}Starting Interactive Shell...${NC}"
    docker-compose run dev
    ;;
  5)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo "Invalid choice. Exiting."
    exit 1
    ;;
esac 