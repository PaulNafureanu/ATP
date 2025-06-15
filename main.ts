import Database from "better-sqlite3";
import getCountries from "./countries";
import { CountriesModel } from "./dbUtils";

const db = new Database("tennis.db");

(async () => {
  const countries = await getCountries();
  console.log(countries.length, countries);
  countries.forEach((value) => CountriesModel.insert(db, { name: value }));
})();
