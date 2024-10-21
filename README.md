# boba-boba-buyer
Automates buying Boba Boba stock via their Shopify storefront

## Setup
1. [Install Node](https://nodejs.org/en/download/prebuilt-installer) to run this script. Must be minimum version 20.6.0.
2. Copy `.env.sample` to a new file `.env` and fill in the relevant values
3. Navigate your terminal to the base directory of this project and run `npm install`

## Running
Navigate your terminal to the base directory of this project and run the following two commands:
```bash
  npm run add-to-cart -- "filename.csv" "storefrontpassword"
```

## Development Guide
To install the correct version of node for dev, [install nvm](https://github.com/nvm-sh/nvm) and run the following:
```
nvm install
```

You should be good to go!