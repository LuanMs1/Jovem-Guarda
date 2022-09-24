# Jovem Guarda

## Description
Plataform that allows users to display vinyl discs from their own collection and make connection to exchange with each other. 

## Pre-requisites
- NodeJS 14+

Notes:

- You can install NodeJS via NVM ([see here](https://github.com/nvm-sh/nvm)) or via NodeJS website ([see here](https://nodejs.org/en/download/))

## Setup

1. Install Dependencies
    ```
    npm install
    ```
2. Setup environment variables
    See `.env.example` for explanation on the environment variables usage

## Running the application
1. Run project locally
   ```
   npm run dev
   ```

Go to https://localhost:8000

## Conventions
1. Semantic commit messages
- ``feat``: (new feature for the user, not a new feature for build script)
- ``fix``: (bug fix for the user, not a fix to a build script)
- ``ci``: (changes to our CI configuration files and scripts)
- ``chore``: (updating grunt tasks etc; no production code change)
- ``docs``: (changes to the documentation)
- ``test``: (adding missing tests, refactoring tests; no production code change)
- ``style``: (formatting, missing semi colons, etc; no production code change)
- ``refactor``: (refactoring production code, eg. renaming a variable)
- ``perf``: (a code change that improves performance)
- ``build``: (changes that affect the build system or external dependencies)
- ``revert``: (reverts a previous commit)
- ``hotfix``: (immediate rectification or upgrade of already deployed software)

2. Git branch naming conventions
- all lowercase
- only dashes (-) to separate words
- [author name]/[feat | fix | ci | chore | docs | test | style | refactor | perf | build | revert | hotfix]/[description in dash case]
- please keep it short

3. Pull Request naming conventions
Please follow the following syntax
[feat | fix | ci | chore | docs | test | style | refactor | perf | build | revert | hotfix]: description

4. Keeping git commits small, meaningful and limited to just one change. If you have more changes in your Merge request, create separate commit for each one.

---
###### This application was created by students of Alpha Edtech® 