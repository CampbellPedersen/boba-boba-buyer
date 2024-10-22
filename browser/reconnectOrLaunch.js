const {setTimeout} = require("node:timers/promises");
const {spawn} = require("node:child_process");
const puppeteer = require("puppeteer");

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
  const childProcess = spawn(
    executablePath,
    [`--remote-debugging-port=${browserURL.split(":").pop()}`],
    {
      detached: true,
      stdio: "ignore",
    }
  );
  childProcess.unref();

  // Hack: poll up to ~30s until browser connection succeeds
  for (let tries = 300; tries > 0; tries--) {
    await setTimeout(100);

    try {
      return await puppeteer.connect({browserURL});
    } catch (err) {
      // ignore; we'll throw later if we run out of retries
    }
  }

  throw Error("Unable to connect to browser");
};

module.exports = {reconnectOrLaunch};