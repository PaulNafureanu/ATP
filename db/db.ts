import Database from "better-sqlite3";
const db = new Database("tennis.db");
db.pragma("foreign_keys = ON");

//
// ─── LOCATION & ENVIRONMENT (MATCH CONDITIONS) ───────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    country_id INTEGER NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    altitude INTEGER NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS environment (
    id INTEGER PRIMARY KEY,
    temperature INTEGER NOT NULL,
    humidity INTEGER NOT NULL,
    wind INTEGER NOT NULL,
    cloud INTEGER NOT NULL,
    pressure INTEGER NOT NULL
  );
`);

//
// ─── RECORDS (PER-SURFACE WIN/LOSS HISTORY) ───────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY,
    clayWins INTEGER NOT NULL,
    clayLosses INTEGER NOT NULL,
    grassWins INTEGER NOT NULL,
    grassLosses INTEGER NOT NULL,
    hardWins INTEGER NOT NULL,
    hardLosses INTEGER NOT NULL,
    titles INTEGER NOT NULL,
    money INTEGER NOT NULL
  );
`);

//
// ─── SERVE QUALITY ─────────────────────────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS serve_quality (
    id INTEGER PRIMARY KEY,
    firstServeInPercentage INTEGER NOT NULL,
    firstServePointsWonPercentage INTEGER NOT NULL,
    secondServePointsWonPercentage INTEGER NOT NULL,
    serviceGamesWonPercentage INTEGER NOT NULL,
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
    FOREIGN KEY (overall_id) REFERENCES serve_quality(id),
    FOREIGN KEY (grass_id) REFERENCES serve_quality(id),
    FOREIGN KEY (clay_id) REFERENCES serve_quality(id),
    FOREIGN KEY (hard_id) REFERENCES serve_quality(id)
  );
`);

//
// ─── RETURN ABILITY ────────────────────────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS return_ability (
    id INTEGER PRIMARY KEY,
    firstServeReturnPointsWonPercentage INTEGER NOT NULL,
    secondServeReturnPointsWonPercentage INTEGER NOT NULL,
    returnGamesWonPercentage INTEGER NOT NULL,
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
    FOREIGN KEY (overall_id) REFERENCES return_ability(id),
    FOREIGN KEY (grass_id) REFERENCES return_ability(id),
    FOREIGN KEY (clay_id) REFERENCES return_ability(id),
    FOREIGN KEY (hard_id) REFERENCES return_ability(id)
  );
`);

//
// ─── UNDER PRESSURE METRICS ────────────────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS under_pressure (
    id INTEGER PRIMARY KEY,
    breakPointsConvertedPercentage INTEGER NOT NULL,
    breakPointsSavedPercentage INTEGER NOT NULL,
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
    FOREIGN KEY (overall_id) REFERENCES under_pressure(id),
    FOREIGN KEY (grass_id) REFERENCES under_pressure(id),
    FOREIGN KEY (clay_id) REFERENCES under_pressure(id),
    FOREIGN KEY (hard_id) REFERENCES under_pressure(id)
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
    serves_id INTEGER NOT NULL,
    returns_id INTEGER NOT NULL,
    pressure_id INTEGER NOT NULL,
    FOREIGN KEY (records_id) REFERENCES records(id),
    FOREIGN KEY (serves_id) REFERENCES serves(id),
    FOREIGN KEY (returns_id) REFERENCES returns(id),
    FOREIGN KEY (pressure_id) REFERENCES pressure(id)
  );
`);

//
// ─── INJURIES ──────────────────────────────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS injuries (
    id INTEGER PRIMARY KEY,
    player_id TEXT NOT NULL,
    stats_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    startDate DATE,
    endDate DATE,
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (stats_id) REFERENCES stats(id)
  );
`);

//
// ─── MATCH-LEVEL STATS ─────────────────────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS match_stats (
    id INTEGER PRIMARY KEY,
    rank INTEGER,
    elo INTEGER,
    points INTEGER,
    serve_quality_id INTEGER NOT NULL,
    return_ability_id INTEGER NOT NULL,
    under_pressure_id INTEGER NOT NULL,
    FOREIGN KEY (serve_quality_id) REFERENCES serve_quality(id),
    FOREIGN KEY (return_ability_id) REFERENCES return_ability(id),
    FOREIGN KEY (under_pressure_id) REFERENCES under_pressure(id)
  );
`);

//
// ─── PLAYERS ───────────────────────────────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    gender BOOLEAN NOT NULL,
    flashLink TEXT NOT NULL,
    atpLink TEXT NOT NULL,
    sofaLink TEXT NOT NULL,
    city_id INTEGER NOT NULL,
    birthDate DATE NOT NULL,
    height INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    rightHanded BOOLEAN NOT NULL,
    allTimeStats_id INTEGER NOT NULL,
    lastYearStats_id INTEGER NOT NULL,
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (allTimeStats_id) REFERENCES stats(id),
    FOREIGN KEY (lastYearStats_id) REFERENCES stats(id)
  );
`);

//
// ─── HEAD TO HEAD ──────────────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS head_to_head (
    id INTEGER PRIMARY KEY,
    home_id TEXT NOT NULL,
    away_id TEXT NOT NULL,
    homeMatchesWon INTEGER NOT NULL,
    homeSetsWon INTEGER NOT NULL,
    awayMatchesWon INTEGER NOT NULL,
    awaySetsWon INTEGER NOT NULL,
    lastMatchDate DATE,
    FOREIGN KEY (home_id) REFERENCES players(id),
    FOREIGN KEY (away_id) REFERENCES players(id)
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
// ─── REWARDS (MATCH REWARDS) ──────────────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS rewards (
    id INTEGER PRIMARY KEY,
    points INTEGER,
    money INTEGER
  );
`);

//
// ─── MATCHES ───────────────────────────────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS matches (
    id TEXT PRIMARY KEY,
    tour TEXT NOT NULL,
    home_id TEXT NOT NULL,
    away_id TEXT NOT NULL,
    winner_id TEXT NOT NULL,
    reward_id INTEGER NOT NULL,
    homeOdds INTEGER NOT NULL,
    awayOdds INTEGER NOT NULL,
    dateTime DATE NOT NULL,

    city_id INTEGER NOT NULL,
    neutral BOOLEAN NOT NULL,
    indoor BOOLEAN NOT NULL,
    surface TEXT NOT NULL CHECK(surface IN ('clay', 'grass', 'hard')),
    environment_id INTEGER NOT NULL,

    outcome_id INTEGER NOT NULL,
    head_to_head_id INTEGER NOT NULL,
    homeMatchStats_id INTEGER NOT NULL,
    awayMatchStats_id INTEGER NOT NULL,
    votes_id INTEGER NOT NULL,

    FOREIGN KEY (home_id) REFERENCES players(id),
    FOREIGN KEY (away_id) REFERENCES players(id),
    FOREIGN KEY (winner_id) REFERENCES players(id),
    FOREIGN KEY (reward_id) REFERENCES rewards(id),
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (environment_id) REFERENCES environment(id),
    FOREIGN KEY (outcome_id) REFERENCES outcomes(id),
    FOREIGN KEY (head_to_head_id) REFERENCES head_to_head(id),
    FOREIGN KEY (homeMatchStats_id) REFERENCES match_stats(id),
    FOREIGN KEY (awayMatchStats_id) REFERENCES match_stats(id),
    FOREIGN KEY (votes_id) REFERENCES votes(id)
  );
`);

//
// ─── VOTES (PUBLIC OPINION) ──────────────────────────────────────────────
//

db.exec(`
  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY,
    home INTEGER NOT NULL,
    away INTEGER NOT NULL,
    votes INTEGER NOT NULL
  );
`);

export default db;
