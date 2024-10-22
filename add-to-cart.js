const fs = require('node:fs');
const csv = require('csv-parse/sync')
const {addAllItems} = require('./browser/add-all-items');

const getFilenameFromArgv = () => {
  const f = process.argv[2];

  if (!f || !f.endsWith('.csv')) {
    console.error('CSV filename required');
    process.exit();
  }

  return f;
}

const getSiteDetailsFromEnv = () => {
  const details = [process.env.SITE_URL, process.env.SITE_PASSWORD];

  if (!details[0] || !details[1]) {
    console.error('SITE_URL and SITE_PASSWORD are both required. Please follow the instructions in README.md.');
    process.exit();
  }

  return details;
}

const loadCSV = (filename) => {
  const processedFilename = filename.replaceAll('/', ':')
  const file = fs.readFileSync(`${__dirname}/sheets/${processedFilename}`).toString();
  const parsedCSV = csv.parse(file);
  // Remove header
  parsedCSV.shift();
  return parsedCSV;
}

const parseName = (name) => name.trim();

const parseOrder = (order) => {
  const trimmed = order.trim();
  if (['YES'].includes(trimmed)) return 1;
  if (['NO', 'ORDER'].includes(trimmed)) return 0;
  if (isNaN(+trimmed)) return 0;

  return +trimmed;
}

const createTuples = (rawCsv) =>
  rawCsv.map(row => [parseName(row[0]), parseOrder(row[2])])


const filterTuples = (tuples) => {
  return tuples.filter(([name, order]) => !!name && !!order)
}

// MAIN

try {
  // First retrieve arguments
  const filename= getFilenameFromArgv();
  const siteDetails = getSiteDetailsFromEnv();
  // Loads CSV from file into an array of rows
  const csv = loadCSV(filename)
  // Map each row to only contain values we want. Also convert YES in amount to 1.0
  const tuples = createTuples(csv)
  // Filter by rows we need to order
  const filtered = filterTuples(tuples);
  // Now go to the browser and order all the items
  (async () => {
    await addAllItems(filtered, siteDetails);
    process.exit(0);
  })()
} catch (e) {
  console.log(e.message)
  process.exit(1)
}
