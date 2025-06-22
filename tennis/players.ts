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

/*
women:
- we dont have weight


*/

interface PlayerLinks {
  id: string;
  name: string;
  gender: boolean;
  flashLink: string;
  atpLink: string;
  sofaLink: string;
}

interface LinkType {
  ranking: "atp" | "wta";
  website: "flash" | "tour" | "sofa";
}

const getLink = (type: LinkType) => {
  let baseLink = "";

  switch (type.website) {
    case "flash":
      baseLink = "https://www.flashscore.com/tennis/rankings/";
      break;
    case "sofa":
      baseLink = "https://www.sofascore.ro/ro/tenis/clasament/";
      break;
    case "tour":
      if (type.ranking == "atp")
        baseLink =
          "https://www.atptour.com/en/rankings/singles?rankRange=0-5000";
      else baseLink = "https://www.wtatennis.com/rankings/singles";
      break;
  }

  if (type.website != "tour")
    if (type.ranking == "atp") baseLink += "atp";
    else baseLink += "wta";

  return baseLink;
};

const testLinks = () => {
  console.log("Flash ATP: ", getLink({ website: "flash", ranking: "atp" }));
  console.log("Flash WTA: ", getLink({ website: "flash", ranking: "wta" }));
  console.log("Sofa ATP: ", getLink({ website: "sofa", ranking: "atp" }));
  console.log("Sofa WTA: ", getLink({ website: "sofa", ranking: "wta" }));
  console.log("Tour ATP: ", getLink({ website: "tour", ranking: "atp" }));
  console.log("Tour WTA: ", getLink({ website: "tour", ranking: "wta" }));
};

const PLAYER_LINKS_EXTRACTION_SCRIPT = `
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

const getL = async () => {
  (
    await MutationHandler.getElement<HTMLButtonElement>(
      "div.rankingTable__row.rankingTable__row--more"
    )
  )[0].click();

  const playerLinkElements =
    await MutationHandler.getElement<HTMLAnchorElement>(
      "div.rankingTable__cell.rankingTable__cell--bold.rankingTable__cell--player a",
      [],
      300
    );

  const playerLinks: string[] = [];
  playerLinkElements.forEach((value) => playerLinks.push(value.href));

  const data = [];

  playerLinks.forEach((value) => {
    const linkParts = value.split("/");
    const name = linkParts[4]
      .split("-")
      .reduce((prev, curr) => prev + " " + curr.toUpperCase(), "");
    const id = linkParts[5];

    data.push({ id, name, link: value });
  });

  console.log(playerLinks);
};

const getPlayersLinks = async () => {
  let link = getLink({ website: "flash", ranking: "atp" });
  const driver = await Driver();

  await driver.get(link);

  let flashATP = await driver.executeScript<PlayerLinks[]>(
    MUTATION_HANDLER_SCRIPT + PLAYER_LINKS_EXTRACTION_SCRIPT + `return data;`
  );
  flashATP = flashATP.map((value) => {
    return { ...value, gender: false }; //false for men
  });

  link = getLink({ website: "flash", ranking: "wta" });
  await driver.get(link);
  let flashWTA = await driver.executeScript<PlayerLinks[]>(
    MUTATION_HANDLER_SCRIPT + PLAYER_LINKS_EXTRACTION_SCRIPT + `return data;`
  );
  flashWTA = flashWTA.map((value) => {
    return { ...value, gender: true }; // true for women
  });

  const data = flashATP.concat(flashWTA);

  console.log(data[3000]);

  //   await driver.sleep(30 * 1000);
  await driver.quit();
};

const getPlayers = async () => {};

export default getPlayers;

export { getPlayersLinks };
