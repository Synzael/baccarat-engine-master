
@echo off
REM ============================================================================
REM Batch file to automate commits for a specific GitHub repository
REM using the auto_commit.py script.
REM
REM Make sure 'py' (Python launcher) or 'python' is in your PATH.
REM ============================================================================

REM --- !!! CONFIGURATION - MODIFY THESE VALUES !!! ---

REM Full path to your auto_commit.py script
SET PYTHON_SCRIPT_PATH="C:\Users\Synza\Documents\Github proj\auto_commit.py"

REM Full path to the local Git repository you want to automate
SET REPO_TO_COMMIT="C:\Users\Synza\Documents\GitHub\baccarat-engine-master"

REM (Optional) Default branch to push to. If empty, script uses current branch.
SET DEFAULT_BRANCH="new-working1"
REM SET DEFAULT_BRANCH=

REM (Optional) Default remote name. If empty, script uses 'origin'.
SET DEFAULT_REMOTE="origin"
REM SET DEFAULT_REMOTE=

REM (Optional) Custom commit message. If empty, script uses timestamp.
REM SET CUSTOM_COMMIT_MESSAGE="My custom automated update"
SET CUSTOM_COMMIT_MESSAGE=

REM --- GITHUB TOKEN (IMPORTANT - CHOOSE ONE METHOD) ---
REM
REM Method 1: Recommended - Assume GITHUB_TOKEN is already set globally
REM in your system environment variables. No action needed here.
REM
REM Method 2: Less Secure - Set GITHUB_TOKEN temporarily for this script run.
REM           The token will be visible in this file. Be careful if sharing!
REM           Uncomment the line below and replace with your token if using this.
REM SET "GITHUB_TOKEN=your_github_pat_here"
REM
REM --- END OF CONFIGURATION ---


REM --- SCRIPT EXECUTION ---
echo Starting automated commit process for: %REPO_TO_COMMIT%

REM Construct the command with optional arguments
SET CMD_ARGS=--repo "%REPO_TO_COMMIT%"

IF NOT "%DEFAULT_BRANCH%"=="" (
    SET CMD_ARGS=%CMD_ARGS% --branch "%DEFAULT_BRANCH%"
)

IF NOT "%DEFAULT_REMOTE%"=="" (
    SET CMD_ARGS=%CMD_ARGS% --remote "%DEFAULT_REMOTE%"
)

IF NOT "%CUSTOM_COMMIT_MESSAGE%"=="" (
    SET CMD_ARGS=%CMD_ARGS% --message "%CUSTOM_COMMIT_MESSAGE%"
)

REM Add other arguments like --dry-run if needed
REM SET CMD_ARGS=%CMD_ARGS% --dry-run

echo.
echo Executing: py %PYTHON_SCRIPT_PATH% %CMD_ARGS%
echo.

REM Run the Python script
py %PYTHON_SCRIPT_PATH% %CMD_ARGS%

echo.
echo Script execution finished.
echo Press any key to exit...
pause >nul
