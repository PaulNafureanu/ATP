import { By, until, WebDriver } from "selenium-webdriver";
import Driver from "../web/driver";
import {
  MUTATION_HANDLER_SCRIPT,
  MutationHandler,
} from "../web/MutationHandler";

interface Data {
  id: string; // from flashscore
  name: string; // from flashscore
  gender: boolean; // to add based on ranking
  flashLink: string; // from flashscore
  atpLink: string; // from atptour
  sofaLink: string; // from sofascore
  city_id: number; // null
  birthDate: string; // from atptour
  height: number; // from atptour
  weight: number; // from atptour
  rightHanded: boolean; // from atptour
  allTimeStats_id: number; // null
  lastYearStats_id: number; // null
}

interface PlayerLinks {
  id: string;
  name: string;
  gender: boolean;
  flashLink: string;
  atpLink: string;
  sofaLink: string;
}

const FLASH_LINKS_EXTRACTION_SCRIPT = `
    (await MutationHandler.getElement(
      "#live-table > div.rankingTable.tennis > button"
    ))[0].click();

    const playerLinkElements = await MutationHandler.getElement(
      "div.rankingTable__cell.rankingTable__cell--bold.rankingTable__cell--player a",[],300);

    const playerLinks = [];
    playerLinkElements.forEach((value) => playerLinks.push(value.href));

    const data = [];
    playerLinks.forEach((value) => {
        const linkParts = value.split("/");
        const name = linkParts[4].split("-").reduce((prev, curr) => prev + " " + curr.toUpperCase(), "");
        const id = linkParts[5];
        data.push({ id, name, flashLink: value });
    });
`;

const SOFA_LINKS_EXTRACTION_SCRIPT = `
  const names = arguments[0];
  const searchInput = (await MutationHandler.getElement("#search-input"))[0];
`;

const getL = async () => {
  const searchInput = (
    await MutationHandler.getElement<HTMLInputElement>("#search-input")
  )[0];
  searchInput.value = "Test me";
  searchInput.form?.submit();

  const eventNames = ["input", "keydown", "keyup"];
  for (const name of eventNames) {
    const event = new Event(name, { bubbles: true });
    searchInput.dispatchEvent(event);
  }
};

const getFlashLinks = async (driver: WebDriver) => {
  const flashATPLink = "https://www.flashscore.com/tennis/rankings/atp/";
  await driver.get(flashATPLink);

  let flashATP = await driver.executeScript<PlayerLinks[]>(
    MUTATION_HANDLER_SCRIPT + FLASH_LINKS_EXTRACTION_SCRIPT + `return data;`
  );
  flashATP = flashATP.map((value) => {
    return { ...value, gender: false }; //false for men
  });

  const flashWTALink = "https://www.flashscore.com/tennis/rankings/wta/";
  await driver.get(flashWTALink);
  let flashWTA = await driver.executeScript<PlayerLinks[]>(
    MUTATION_HANDLER_SCRIPT + FLASH_LINKS_EXTRACTION_SCRIPT + `return data;`
  );
  flashWTA = flashWTA.map((value) => {
    return { ...value, gender: true }; // true for women
  });

  return flashATP.concat(flashWTA);
};

const getSofaLinks = async (driver: WebDriver, playerLinks: PlayerLinks[]) => {
  const link = "https://sofascore.ro/en-us/tennis";
  await driver.get(link);

  const timer = 3000;

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // Find the input
  const inputLocator = until.elementLocated(By.id("search-input"));
  const searchInput = await driver.wait(inputLocator, timer);
  await driver.wait(until.elementIsVisible(searchInput), timer);
  await driver.wait(until.elementIsEnabled(searchInput), timer);
  console.time("refresh");

  const recLocator = By.css(
    "div.beautiful-scrollbar__content.beautiful-scrollbar__content--isDragging_false > div > div > div:nth-child(1) > a"
  );

  for (let index = 0; index < 2; index++) {
    // clear and send a new input to search
    await searchInput.clear();
    await searchInput.sendKeys(playerLinks[index].name);

    // refind the element, now with a new recommendation
    const firstRec = await driver.wait(until.elementLocated(recLocator), timer);
    await driver.wait(until.elementIsVisible(firstRec), timer);
    await driver.wait(until.elementIsEnabled(firstRec), timer);

    // Wait until result is updated with matching text
    await driver.wait(async () => {
      const rec = await driver.findElement(recLocator);
      const text = await rec.getText();
      return text
        .toLowerCase()
        .includes(playerLinks[index].name.split(" ")[0].toLowerCase());
    }, timer);

    // Get and store the link
    playerLinks[index].sofaLink = await firstRec.getAttribute("href");
    await driver.navigate().refresh();
  }

  console.timeEnd("refresh");
  console.log(playerLinks.splice(0, 2));
};

const getPlayersLinks = async () => {
  const driver = await Driver();
  let playerLinks = await getFlashLinks(driver);
  await getSofaLinks(driver, playerLinks);

  await driver.sleep(0.1 * 60 * 1000);
  await driver.quit();
};

const getPlayers = async () => {};

export default getPlayers;

export { getPlayersLinks };
