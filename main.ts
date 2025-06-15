import getCountries from "./countries";

(async () => {
  const countries = await getCountries();
  console.log(countries.length, countries);
})();
