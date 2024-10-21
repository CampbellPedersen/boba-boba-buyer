const puppeteer = require('puppeteer');

const getExecutablePathFromEnv = () => {
  const executablePath = process.env.CHROME_PATH;
  if (!executablePath) {
    console.error('File parsed but missing CHROME_PATH. Follow the instructions in the README.')
    process.exit();
  }
  return executablePath;
}

const launchSite = async (executablePath, siteUrl) => {
  const browser = await puppeteer.launch({executablePath, headless: false, args:[
    '--start-fullscreen' // you can also use '--start-maximized'
 ]});
  const page = await browser.newPage();
  await page.goto(siteUrl);
  return page;
};

const login = async (page, password) => {
  await page.locator('a[href="#LoginModal"]').click();
  await page.locator('input[type="password"]').fill(password);
  await page.keyboard.press('Enter');
}

const findAndAddItem = (page) => async ([name, quantity]) => {
  await page.locator('button[data-predictive-search-open-drawer]').click();
  await page.locator('input[placeholder="Search"]').fill(name);
  await Promise.all([
    page.waitForNavigation({waitUntil: 'load'}),
    page.keyboard.press('Enter')
  ]);
  await Promise.all([
    page.waitForNavigation({waitUntil: 'load'}),
    page.locator('a.full-width-link').click(),
  ]);
  await page.click('text=Add to cart');
  await page.waitForRequest(request => request.url().endsWith('cart.js'))
  await Promise.all([
    page.waitForNavigation({waitUntil: 'load'}),
    page.locator('a[href="/cart"]').click(),
  ])
  // await page.locator('input[name="updates[]"]').fill('20');
  await Promise.all([
    page.waitForNavigation(),
    page.locator('a[href="/collections/all"]').click(),
  ]);
}

/**
 * Takes tuples and orders them via Boba Boba's Shopify storefront
 * @param {[string, string][]} rows [name, order]
 * @param {[string, string]} siteDetails [siteUrl, password]
 */
const addAllItems = async (rows, siteDetails) => {
  const executablePath = getExecutablePathFromEnv();
  const [siteUrl, password] = siteDetails;
  const page = await launchSite(executablePath, siteUrl);
  await login(page, password);
  
  for (const row of rows) {
    await findAndAddItem(page)(row)
  }
}

module.exports = {addAllItems};