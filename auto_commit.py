
## Full Source Code

#!/usr/bin/env python3
"""
auto_commit.py - Automate Git commits and pushes for a local repository

This script scans a local Git repository for changes, stages them, creates a
timestamped commit, and pushes to a remote branch. It supports authentication
via GitHub tokens or SSH keys.

Author: T3 Chat
Date: 2025-05-13
"""

import argparse
import os
import sys
from datetime import datetime
import git
from git import Repo
from git.exc import GitCommandError, InvalidGitRepositoryError


def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="Automate Git commits and pushes for a local repository"
    )
    parser.add_argument(
        "--repo", required=True, help="Path to the local Git repository"
    )
    parser.add_argument(
        "--branch",
        default=None,
        help="Remote branch to push to (defaults to current branch)",
    )
    parser.add_argument(
        "--message",
        default=None,
        help="Custom commit message (defaults to timestamp)",
    )
    parser.add_argument(
        "--remote", default="origin", help="Remote name (defaults to 'origin')"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be done without making changes",
    )
    return parser.parse_args()


def check_repository_status(repo_path):
    """
    Check if the repository exists and has changes to commit.
    
    Args:
        repo_path: Path to the Git repository
        
    Returns:
        tuple: (Repo object, list of changed files)
    
    Raises:
        InvalidGitRepositoryError: If the path is not a valid Git repository
    """
    try:
        repo = Repo(repo_path)
        
        # Check for uncommitted changes (modified, new, deleted files)
        changed_files = [item.a_path for item in repo.index.diff(None)]
        changed_files += repo.untracked_files
        
        return repo, changed_files
    except InvalidGitRepositoryError:
        print(f"Error: {repo_path} is not a valid Git repository")
        raise


def stage_changes(repo, dry_run=False):
    """
    Stage all changes in the repository.
    
    Args:
        repo: GitPython Repo object
        dry_run: If True, only print what would be done
        
    Returns:
        bool: True if changes were staged
    """
    if dry_run:
        print("Would stage all changes")
        return True
    
    try:
        repo.git.add("--all")
        return True
    except GitCommandError as e:
        print(f"Error staging changes: {str(e)}")
        return False


def commit_changes(repo, message=None, dry_run=False):
    """
    Commit staged changes with timestamp.
    
    Args:
        repo: GitPython Repo object
        message: Optional custom commit message
        dry_run: If True, only print what would be done
        
    Returns:
        str: Commit hash or None if commit failed
    """
    # Generate timestamp for commit message
    timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    commit_message = message or f"Automated update: {timestamp}"
    
    if dry_run:
        print(f"Would commit with message: '{commit_message}'")
        return "dry-run-commit-hash"
    
    try:
        commit = repo.index.commit(commit_message)
        print(f"Changes committed: {commit.hexsha[:8]}")
        return commit.hexsha
    except GitCommandError as e:
        print(f"Error committing changes: {str(e)}")
        return None


def push_to_remote(repo, remote_name="origin", branch=None, dry_run=False):
    """
    Push commits to the remote repository.
    
    Args:
        repo: GitPython Repo object
        remote_name: Name of the remote (default: origin)
        branch: Branch to push to (default: current branch)
        dry_run: If True, only print what would be done
        
    Returns:
        bool: True if push was successful
    """
    try:
        # Get current branch if not specified
        if not branch:
            branch = repo.active_branch.name
            
        # Check if remote exists
        try:
            remote = repo.remote(name=remote_name)
        except ValueError:
            print(f"Error: Remote '{remote_name}' not found")
            return False
            
        if dry_run:
            print(f"Would push to {remote_name}/{branch}")
            return True
            
        # Push to remote
        push_info = remote.push(refspec=f"{branch}:{branch}")
        
        # Check for push errors
        for info in push_info:
            if info.flags & info.ERROR:
                print(f"Push error: {info.summary}")
                return False
                
        print(f"Successfully pushed to {remote_name}/{branch}")
        return True
    except GitCommandError as e:
        # Check for authentication errors
        if "authentication" in str(e).lower():
            print("Authentication error. Please check your credentials.")
            print("Set GITHUB_TOKEN environment variable or configure SSH keys.")
        else:
            print(f"Error pushing to remote: {str(e)}")
        return False


def main():
    """Main function to orchestrate Git operations."""
    args = parse_arguments()
    
    try:
        # Check repository status
        repo, changed_files = check_repository_status(args.repo)
        
        if not changed_files:
            print("No changes to commit in the repository.")
            return 0
            
        print(f"Found {len(changed_files)} changed files:")
        for file in changed_files[:5]:  # Show first 5 files
            print(f"  - {file}")
        if len(changed_files) > 5:
            print(f"  ... and {len(changed_files) - 5} more")
            
        # Stage changes
        if not stage_changes(repo, args.dry_run):
            return 1
            
        # Commit changes
        commit_hash = commit_changes(repo, args.message, args.dry_run)
        if not commit_hash:
            return 1
            
        # Push to remote
        if not push_to_remote(repo, args.remote, args.branch, args.dry_run):
            return 1
            
        return 0
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return 1


if __name__ == "__main__":
    sys.exit(main())

