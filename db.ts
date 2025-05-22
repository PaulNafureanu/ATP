import Database from "better-sqlite3";
const db = new Database("tennis.db");
db.pragma("foreign_keys = ON");

//
// ─── COUNTRIES ─────────────────────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
  );
`);

//
// ─── RECORDS (PER-SURFACE WIN/LOSS HISTORY) ───────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY,
    clay_wins INTEGER NOT NULL,
    clay_losses INTEGER NOT NULL,
    grass_wins INTEGER NOT NULL,
    grass_losses INTEGER NOT NULL,
    hard_wins INTEGER NOT NULL,
    hard_losses INTEGER NOT NULL
  );
`);

//
// ─── SERVE QUALITY ─────────────────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS servequality (
    id INTEGER PRIMARY KEY,
    firstServe INTEGER NOT NULL,
    firstServePointsWon INTEGER NOT NULL,
    secondServePointsWon INTEGER NOT NULL,
    serviceGamesWon INTEGER NOT NULL,
    avgAcesPerMatch INTEGER NOT NULL,
    avgDoubleFaultsPerMatch INTEGER NOT NULL,
    rating INTEGER NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS serves (
    id INTEGER PRIMARY KEY,
    overall_id INTEGER NOT NULL,
    grass_id INTEGER NOT NULL,
    clay_id INTEGER NOT NULL,
    hard_id INTEGER NOT NULL,
    FOREIGN KEY (overall_id) REFERENCES servequality(id),
    FOREIGN KEY (grass_id) REFERENCES servequality(id),
    FOREIGN KEY (clay_id) REFERENCES servequality(id),
    FOREIGN KEY (hard_id) REFERENCES servequality(id)
  );
`);

//
// ─── RETURN ABILITY ────────────────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS returnability (
    id INTEGER PRIMARY KEY,
    firstServeReturnPointsWon INTEGER NOT NULL,
    secondServeReturnPointsWon INTEGER NOT NULL,
    returnGamesWon INTEGER NOT NULL,
    rating INTEGER NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS returns (
    id INTEGER PRIMARY KEY,
    overall_id INTEGER NOT NULL,
    grass_id INTEGER NOT NULL,
    clay_id INTEGER NOT NULL,
    hard_id INTEGER NOT NULL,
    FOREIGN KEY (overall_id) REFERENCES returnability(id),
    FOREIGN KEY (grass_id) REFERENCES returnability(id),
    FOREIGN KEY (clay_id) REFERENCES returnability(id),
    FOREIGN KEY (hard_id) REFERENCES returnability(id)
  );
`);

//
// ─── UNDER PRESSURE METRICS ────────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS underpressure (
    id INTEGER PRIMARY KEY,
    breakPointsConverted INTEGER NOT NULL,
    breakPointsSaved INTEGER NOT NULL,
    tiebreaksWon INTEGER NOT NULL,
    decidingSetsWon INTEGER NOT NULL,
    rating INTEGER NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS pressure (
    id INTEGER PRIMARY KEY,
    overall_id INTEGER NOT NULL,
    grass_id INTEGER NOT NULL,
    clay_id INTEGER NOT NULL,
    hard_id INTEGER NOT NULL,
    FOREIGN KEY (overall_id) REFERENCES underpressure(id),
    FOREIGN KEY (grass_id) REFERENCES underpressure(id),
    FOREIGN KEY (clay_id) REFERENCES underpressure(id),
    FOREIGN KEY (hard_id) REFERENCES underpressure(id)
  );
`);

//
// ─── INJURIES ──────────────────────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS injuries (
    id INTEGER PRIMARY KEY,
    player_id TEXT NOT NULL,
    type TEXT NOT NULL,
    startdate DATE,
    enddate DATE,
    FOREIGN KEY (player_id) REFERENCES players(id)
  );
`);

//
// ─── STATS (SNAPSHOT OF PERFORMANCE) ──────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY,
    rank INTEGER,
    elo INTEGER,
    points INTEGER,
    records_id INTEGER NOT NULL,
    injuries_id INTEGER NOT NULL,
    serves_id INTEGER NOT NULL,
    returns_id INTEGER NOT NULL,
    pressure_id INTEGER NOT NULL,
    FOREIGN KEY (records_id) REFERENCES records(id),
    FOREIGN KEY (injuries_id) REFERENCES injuries(id),
    FOREIGN KEY (serves_id) REFERENCES serves(id),
    FOREIGN KEY (returns_id) REFERENCES returns(id),
    FOREIGN KEY (pressure_id) REFERENCES pressure(id)
  );
`);

//
// ─── MATCH-LEVEL STATS ─────────────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS matchstats (
    id INTEGER PRIMARY KEY,
    rank INTEGER,
    elo INTEGER,
    points INTEGER,
    servequality_id INTEGER NOT NULL,
    returnability_id INTEGER NOT NULL,
    underpressure_id INTEGER NOT NULL,
    FOREIGN KEY (servequality_id) REFERENCES servequality(id),
    FOREIGN KEY (returnability_id) REFERENCES returnability(id),
    FOREIGN KEY (underpressure_id) REFERENCES underpressure(id)
  );
`);

//
// ─── PLAYERS ───────────────────────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    country_id INTEGER NOT NULL,
    birthdate DATE NOT NULL,
    height INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    righthanded BOOLEAN NOT NULL,
    startstats_id INTEGER NOT NULL,
    currstats_id INTEGER NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id),
    FOREIGN KEY (startstats_id) REFERENCES stats(id),
    FOREIGN KEY (currstats_id) REFERENCES stats(id)
  );
`);

//
// ─── H2H (HEAD-TO-HEAD MATCHES) ──────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS headtohead (
    id INTEGER PRIMARY KEY,
    player1_id TEXT NOT NULL,
    player2_id TEXT NOT NULL,
    homeMatchesWon INTEGER NOT NULL,
    homeSetsWon INTEGER NOT NULL,
    awayMatchesWon INTEGER NOT NULL,
    awaySetsWon INTEGER NOT NULL,
    lastmatchdate DATE,
    FOREIGN KEY (player1_id) REFERENCES players(id),
    FOREIGN KEY (player2_id) REFERENCES players(id)
  );
`);

//
// ─── OUTCOMES (MATCH SCORES) ──────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS outcomes (
    id INTEGER PRIMARY KEY,

    homeFirstSet INTEGER NOT NULL,
    homeSecondSet INTEGER NOT NULL,
    homeThirdSet INTEGER NOT NULL,
    homeFourthSet INTEGER NOT NULL,
    homeFifthSet INTEGER NOT NULL,

    awayFirstSet INTEGER NOT NULL,
    awaySecondSet INTEGER NOT NULL,
    awayThirdSet INTEGER NOT NULL,
    awayFourthSet INTEGER NOT NULL,
    awayFifthSet INTEGER NOT NULL,

    homeFirstTiebreak INTEGER NOT NULL,
    homeSecondTiebreak INTEGER NOT NULL,
    homeThirdTiebreak INTEGER NOT NULL,
    homeFourthTiebreak INTEGER NOT NULL,
    homeFifthTiebreak INTEGER NOT NULL,

    awayFirstTiebreak INTEGER NOT NULL,
    awaySecondTiebreak INTEGER NOT NULL,
    awayThirdTiebreak INTEGER NOT NULL,
    awayFourthTiebreak INTEGER NOT NULL,
    awayFifthTiebreak INTEGER NOT NULL,

    firstSetDuration INTEGER NOT NULL,
    secondSetDuration INTEGER NOT NULL,
    thirdSetDuration INTEGER NOT NULL,
    fourthSetDuration INTEGER NOT NULL,
    fifthSetDuration INTEGER NOT NULL
  );
`);

//
// ─── ENVIRONMENT (MATCH CONDITIONS) ───────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS environment (
    id INTEGER PRIMARY KEY,
    temperature INTEGER,
    humidity INTEGER,
    altitude INTEGER,
    wind INTEGER
  );
`);

//
// ─── MATCHES ───────────────────────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS matches (
    id TEXT PRIMARY KEY,
    home_id TEXT NOT NULL,
    away_id TEXT NOT NULL,
    home_odds INTEGER NOT NULL,
    away_odds INTEGER NOT NULL,
    datetime DATE NOT NULL,

    country_id INTEGER NOT NULL,
    city TEXT NOT NULL,
    surface TEXT NOT NULL CHECK(surface IN ('clay', 'grass', 'hard')),

    outcome_id INTEGER NOT NULL,
    headtohead_id INTEGER NOT NULL,
    homeMatchStats_id INTEGER NOT NULL,
    awayMatchStats_id INTEGER NOT NULL,
    environment_id INTEGER NOT NULL,

    FOREIGN KEY (home_id) REFERENCES players(id),
    FOREIGN KEY (away_id) REFERENCES players(id),
    FOREIGN KEY (country_id) REFERENCES countries(id),
    FOREIGN KEY (outcome_id) REFERENCES outcomes(id),
    FOREIGN KEY (headtohead_id) REFERENCES headtohead(id),
    FOREIGN KEY (homeMatchStats_id) REFERENCES matchstats(id),
    FOREIGN KEY (awayMatchStats_id) REFERENCES matchstats(id),
    FOREIGN KEY (environment_id) REFERENCES environment(id)
  );
`);

//
// ─── REWARDS (MATCH REWARDS) ──────────────────────────────────────────────
//
db.exec(`
  CREATE TABLE IF NOT EXISTS rewards (
    id INTEGER PRIMARY KEY,
    points INTEGER,
    money INTEGER
  );
`);
