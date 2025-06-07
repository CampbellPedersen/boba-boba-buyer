# Bobaboba Buyer
Automates buying Bobaboba stock via their Shopify storefront

## Running the Executable
The executable itself is not available in this repository. You can either:
- Built it yourself with the instructions below
- Ask me for a copy if you aren't a dev

To run the executable:
1. Put your exported csv file in the same directory as the executable.
2. Copy the `.env.sample` file to a new file named `.env` also in the same directory and fill out the relevant values. Note: You can Google the usual values for `CHROME_PATH` fairly easily
3. Run the relevant executable (Windows and MacOS x64 support) and watch the magic!

## Development Guide

## Setup
To use the correct version of Node/npm and install dependencies for dev, [install nvm](https://github.com/nvm-sh/nvm) and run the following commands in the root directory of this repo:
```bash
npm install nvm -g # If not already installed
nvm install
nvm use
npm install
```

## Running the Script
Make sure you copy `.env.sample` to a new file called `.env` and populate with appropriate values Afterwards, just run:
```bash
  npm run start
```
You should be good to go!

## Building and Running the Executable
```bash
  npm run build

  # on Windows
  dist\boba-boba-buyer-win.exe

  # on Mac
  ./dist/boba-boba-buyer-macos
```
Note: All filepaths are relative to the executable.