# Bobaboba Buyer
Automates buying Boba Boba stock via their Shopify storefront

## Setup
1. [Install Node](https://nodejs.org/en/download/prebuilt-installer) to run this script. Must be minimum version 20.6.0. If you can run the `node --version` command in your terminal (`cmd.exe` for Windows), you've completed this step.
2. Navigate your terminal to the base directory of this project and run the following command:
```bash
npm install
```
3. Copy the `.env.sample` file in this directory and rename it to `.env`. Then, fill in the relevant values:
    1. SITE_URL: The web address of the storefront
    2. SITE_PASSWORD: The password to the storefront
    3. CHROME_PATH: The full file path to your Chrome executable


## Running the Script
1. Download the order sheet as a `.csv` file and drop it into the `sheets` directory.
2. Navigate your terminal (`cmd.exe` for Windows) to the base directory of this project and run the following command:
```bash
  npm run add-to-cart -- "filename.csv"
```

## Development Guide
To install the correct version of node for dev, [install nvm](https://github.com/nvm-sh/nvm) and run the following commands:
```bash
nvm install # If not already installed
nvm use
```

You should be good to go!
