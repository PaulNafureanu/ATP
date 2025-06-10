import Driver from "./driver";

(async () => {
  const driver = await Driver();

  await driver.get("https://www.flashscore.com/tennis/rankings/atp/");

  await driver.sleep(10 * 1000);

  await driver.quit();
})();

/**
 * Extract name list, id, countries, link from ranking
 * Tables:
 * - records end of 2024
 * - countries
 * - injuries
 * - players
 *
 *
 */
