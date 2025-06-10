import path from "node:path";
import { Browser, Builder } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";

async function Driver(headless: boolean = false) {
  const builder = new Builder().forBrowser(Browser.CHROME);

  const headPath = path.join(
    "./",
    "web",
    headless ? "headless" : "head",
    headless ? "chrome-headless-shell.exe" : "chrome.exe"
  );
  const downloads = "download";

  const chromeOptions = new ChromeOptions();
  chromeOptions
    .addArguments(
      "--disable-gpu", // Disables GPU hardware acceleration
      "--disable-extensions", // Disables browser extensions
      "--no-sandbox", // Bypass OS security model (important for headless environments)
      "--disable-dev-shm-usage", // Use disk instead of shared memory
      "--disable-background-networking", // Disable background network tasks
      "--disable-background-timer-throttling", // Disable background timer throttling
      "--disable-breakpad", // Disable crash reporting
      "--disable-client-side-phishing-detection", // Disable phishing detection
      "--disable-component-extensions-with-background-pages", // Disable extensions with background pages
      "--disable-default-apps", // Disable default apps
      "--disable-hang-monitor", // Disable the hang monitor
      "--disable-ipc-flooding-protection", // Disable IPC flooding protection
      "--disable-popup-blocking", // Disable popup blocking
      "--disable-prompt-on-repost", // Disable the prompt on repost
      "--disable-renderer-backgrounding", // Prevent background rendering throttling
      "--enable-automation", // Tell websites we're being automated
      "--metrics-recording-only", // Reduce CPU usage
      "--mute-audio", // Mute audio to save resources
      "--no-first-run", // Skip first run wizards
      "--safebrowsing-disable-auto-update", // Disable Safe Browsing
      "--enable-features=NetworkService,NetworkServiceInProcess", // Optimize network performance
      "--blink-settings=imagesEnabled=false", // Disable image loading
      "--start-maximized",
      "--enable-unsafe-swiftshader",
      "--disable-blink-features=AutomationControlled",
      "--window-size=1920,1080",
      "--window-position=0,0"
      // "--start-fullscreen"
    )
    .setUserPreferences({ "download.default_directory": downloads })
    .excludeSwitches("enable-logging");

  chromeOptions.setBinaryPath(headPath);
  if (headless) chromeOptions.addArguments("--headless=new");
  builder.setChromeOptions(chromeOptions);

  return await builder.build();
}

export default Driver;
