# boba-boba-buyer
Automates buying Boba Boba stock via their Shopify storefront

## Setup
1. [Install Node](https://nodejs.org/en/download/prebuilt-installer) to run this script. Must be minimum version 20.6.0.
2. Copy `.env.sample` to a new file `.env` and fill in the relevant values
3. Navigate your terminal to the base directory of this project and run the following command:
```bash
npm install
```

## Running
1. Download the spreadsheet as a `.csv` file and drop it into the `sheets` directory.
2. Navigate your terminal to the base directory of this project and run the following command:
```bash
  npm run add-to-cart -- "filename.csv"
```

## Development Guide
To install the correct version of node for dev, [install nvm](https://github.com/nvm-sh/nvm) and run the following:
```bash
nvm install
```

You should be good to go!
