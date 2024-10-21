const puppeteer = require('puppeteer');

/**
 * Takes tuples and orders them via Boba Boba's Shopify storefront
 * @param {[string, string][]} tuples [product name, order quantity]
 * @param {[string, string]} siteDetails [siteUrl, password]
 */
const addAllItems = async (tuples, siteDetails) => {
  const executablePath = process.env.CHROME_PATH;
  if (!executablePath) {
    console.error('File parsed but missing CHROME_PATH. Follow the instructions in the README.')
    process.exit();
  }
  const [siteUrl, password] = siteDetails;
  const browser = await puppeteer.launch({executablePath, headless: false});
  const page = await browser.newPage();
  await page.goto(siteUrl);
}

module.exports = {addAllItems};