import Driver from "./driver";
import { MutationHandler, MUTATION_HANDLER_SCRIPT } from "./MutationHandler";

interface Data {
  countries: string[];
}

const COUNTRIES_EXTRACTION_SCRIPT = `
    (await MutationHandler.getElement(
      "div.rankingTable__row.rankingTable__row--more"
    ))[0].click();

    const nationalities = await MutationHandler.getData(
      "div.rankingTable__cell.rankingTable__cell--nationality", [], 300);
    const countries = [...new Set(nationalities)];
`;

const getCountries = async () => {
  const link = (ranking: "atp" | "wta") =>
    `https://www.flashscore.com/tennis/rankings/${ranking}/`;
  const driver = await Driver();

  let countries: string[] = [];

  await driver.get(link("atp"));
  let data = await driver.executeScript<Data>(
    MUTATION_HANDLER_SCRIPT +
      COUNTRIES_EXTRACTION_SCRIPT +
      `return {countries};`
  );
  countries.push(...data.countries.slice(1));

  await driver.get(link("wta"));
  data = await driver.executeScript<Data>(
    MUTATION_HANDLER_SCRIPT +
      COUNTRIES_EXTRACTION_SCRIPT +
      `return {countries};`
  );
  countries.push(...data.countries.slice(1));

  countries = [...new Set(countries)].sort();
  await driver.quit();
  return countries;
};

export default getCountries;
