const {reconnectOrLaunch} = require('./reconnectOrLaunch');

const getExecutablePathFromEnv = () => {
  const executablePath = process.env.CHROME_PATH;
  if (!executablePath) {
    console.error('File parsed but missing CHROME_PATH. Follow the instructions in the README.')
    process.exit(1);
  }
  return executablePath;
}

const launchSite = async (executablePath, siteUrl) => {
  const browser = await reconnectOrLaunch(executablePath)
  const [page] = await browser.pages();
  await page.goto(siteUrl);
  return page;
};

const login = async (page, password) => {
  await page.locator('a[href="#LoginModal"]').click();
  await page.locator('input[type="password"]').fill(password);
  await page.keyboard.press('Enter');
}

const findAndAddItem = (page) => async ([name, quantity]) => {
  // Search for product
  await page.locator('button[data-predictive-search-open-drawer]').click();
  await page.locator('input[placeholder="Search"]').fill(name);
  await Promise.all([
    page.waitForNavigation({waitUntil: 'load'}),
    page.keyboard.press('Enter')
  ]);
  // Select first search result
  await Promise.all([
    page.waitForNavigation({waitUntil: 'load'}),
    page.locator('a.full-width-link').click(),
  ]);
  // Add to cart and view cart
  await page.click('text=Add to cart');
  await page.waitForRequest(request => request.url().endsWith('cart.js'))
  await Promise.all([
    page.waitForNavigation({waitUntil: 'load'}),
    page.locator('a[href="/cart"]').click(),
  ])
  // Add quantity if needed
  if(quantity > 1) {
    const inputSelector = 'input[name="updates[]"]';
    await page.click(inputSelector)
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type('input[name="updates[]"]', `${quantity}`);
    await page.click(inputSelector);
    await page.click('text=Your cart');
    await page.waitForRequest(request => request.url().endsWith('change.js'));
  }
}

/**
 * Takes tuples and orders them via Boba Boba's Shopify storefront
 * @param {[string, number][]} rows [name, order]
 * @param {[string, string]} siteDetails [siteUrl, password]
 */
const addAllItems = async (rows, siteDetails) => {
  const executablePath = getExecutablePathFromEnv();
  const [siteUrl, password] = siteDetails;
  const page = await launchSite(executablePath, siteUrl);
  await login(page, password);

  const missedItems = [];
  
  for (const row of rows) {
    try {
      // Try add the item
      console.info(`Adding ${quantity} ${name}...`)
      await findAndAddItem(page)(row)
      console.info(`Added ${quantity} ${name}!`);

    } catch (e) {
      // Print a message to console if fails
      console.error(`Failed to add ${row[1]} ${row[0]}: ${e.message}`);
      missedItems.push(row[0])
    } finally {
      // Navigate back to homepage regardless of success/failure
      await page.goto(`${siteUrl}/collections/all`);
    }
  }

  if (missedItems.length) {
    console.error(`Missed items:\n${missedItems.join('\n')}`)
  }
}

module.exports = {addAllItems}