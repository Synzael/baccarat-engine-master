@echo off
echo Baccarat Betting Pattern Analysis
echo ==================================
echo.
echo Please select an analysis to run:
echo.
echo 1) Basic Betting Patterns Analysis
echo 2) House Edge Compounding Analysis
echo 3) Run Both Analyses
echo 4) Interactive Shell
echo 5) Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo Running Basic Betting Patterns Analysis...
    docker-compose up betting-patterns
) else if "%choice%"=="2" (
    echo Running House Edge Compounding Analysis...
    docker-compose up house-edge
) else if "%choice%"=="3" (
    echo Running Both Analyses...
    docker-compose up betting-patterns
    docker-compose up house-edge
) else if "%choice%"=="4" (
    echo Starting Interactive Shell...
    docker-compose run dev
) else if "%choice%"=="5" (
    echo Exiting...
    exit
) else (
    echo Invalid choice. Exiting.
    exit /b 1
) 