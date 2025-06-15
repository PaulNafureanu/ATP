import Database from "better-sqlite3";
import getCountries from "./countries";
import { CountriesModel } from "./dbUtils";
import { ICountries } from "./dbInterfaces";

const db = new Database("tennis.db");

(async () => {
  const a = CountriesModel.getAll<ICountries>(db);
  console.log(a);

  // const countries = await getCountries();
  // console.log(countries.length, countries);
  // countries.forEach((value) => CountriesModel.insert(db, { name: value }));
})();
