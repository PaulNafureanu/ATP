import Database from "better-sqlite3";
import getCountries from "./tennis/countries";
import { CountriesModel } from "./db/dbUtils";
import { ICountries } from "./db/dbInterfaces";
import getPlayers, { getPlayersLinks } from "./tennis/players";
import Driver from "./web/driver";

const db = new Database("tennis.db");

(async () => {
  // const a = CountriesModel.getAll<ICountries>(db);
  // console.log(a);

  await getPlayersLinks();

  // const countries = await getCountries();
  // console.log(countries.length, countries);
  // countries.forEach((value) => CountriesModel.insert(db, { name: value }));
})();
