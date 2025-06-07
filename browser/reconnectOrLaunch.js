const {setTimeout} = require("timers/promises");
const {spawn} = require("child_process");
const path = require("path");
const puppeteer = require("puppeteer");
const {getCurrentWorkingDirectory} = require('../util/working-directory');

const reconnectOrLaunch = async (
  executablePath,
  browserURL = "http://localhost:9222"
) => {
  try {
    return await puppeteer.connect({browserURL});
  } catch (err) {
    // ignore and try launching a child process below
  }

  // Hack: launch browser manually since browser.launch()
  // doesn't yet support a 'detach' option
  console.info('Launching browser at', executablePath);
  const childProcess = spawn(
    executablePath,
    [
      `--remote-debugging-port=${browserURL.split(":").pop()}`,
      `--user-data-dir=${path.join(getCurrentWorkingDirectory(), 'tmp', 'chrome-debug-profile')}`,
      '--no-first-run',
      '--no-default-browser-check',
    ],
    {
      detached: true,
      stdio: "ignore",
    }
  );
  childProcess.unref();

  let e;

  // Hack: poll up to ~30s until browser connection succeeds
  for (let tries = 10; tries > 0; tries--) {
    await setTimeout(1000);

    try {
      return await puppeteer.connect({browserURL});
    } catch (err) {
      e = err
      // ignore; we'll throw later if we run out of retries
    }
  }

  throw e;
};

module.exports = {reconnectOrLaunch};