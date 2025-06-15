import { Database } from "better-sqlite3";

// ─── COUNTRIES CLASS ──────────────────────────────────────────────
export class CountriesModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO countries (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM countries WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM countries").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE countries SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM countries WHERE id = ?").run(id);
  }

  static getByName(db: Database, name: string) {
    return db.prepare("SELECT * FROM countries WHERE name = ?").get(name);
  }
}

// ─── CITIES CLASS ──────────────────────────────────────────────
export class CitiesModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO cities (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM cities WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM cities").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE cities SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM cities WHERE id = ?").run(id);
  }

  static getByName(db: Database, name: string) {
    return db.prepare("SELECT * FROM cities WHERE name = ?").get(name);
  }
}

// ─── ENVIRONMENT CLASS ──────────────────────────────────────────────
export class EnvironmentModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO environment (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM environment WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM environment").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE environment SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM environment WHERE id = ?").run(id);
  }
}

// ─── RECORDS CLASS ──────────────────────────────────────────────
export class RecordsModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO records (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM records WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM records").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE records SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM records WHERE id = ?").run(id);
  }
}

// ─── SERVE_QUALITY CLASS ──────────────────────────────────────────────
export class ServeQualityModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO serve_quality (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM serve_quality WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM serve_quality").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE serve_quality SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM serve_quality WHERE id = ?").run(id);
  }
}

// ─── SERVES CLASS ──────────────────────────────────────────────
export class ServesModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO serves (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM serves WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM serves").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE serves SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM serves WHERE id = ?").run(id);
  }
}

// ─── RETURN_ABILITY CLASS ──────────────────────────────────────────────
export class ReturnAbilityModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO return_ability (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM return_ability WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM return_ability").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(
      `UPDATE return_ability SET ${setters} WHERE id = ?`
    );
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM return_ability WHERE id = ?").run(id);
  }
}

// ─── RETURNS CLASS ──────────────────────────────────────────────
export class ReturnsModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO returns (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM returns WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM returns").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE returns SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM returns WHERE id = ?").run(id);
  }
}

// ─── UNDER_PRESSURE CLASS ──────────────────────────────────────────────
export class UnderPressureModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO under_pressure (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM under_pressure WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM under_pressure").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(
      `UPDATE under_pressure SET ${setters} WHERE id = ?`
    );
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM under_pressure WHERE id = ?").run(id);
  }
}

// ─── PRESSURE CLASS ──────────────────────────────────────────────
export class PressureModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO pressure (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM pressure WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM pressure").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE pressure SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM pressure WHERE id = ?").run(id);
  }
}

// ─── STATS CLASS ──────────────────────────────────────────────
export class StatsModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO stats (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM stats WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM stats").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE stats SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM stats WHERE id = ?").run(id);
  }
}

// ─── INJURIES CLASS ──────────────────────────────────────────────
export class InjuriesModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO injuries (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM injuries WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM injuries").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE injuries SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM injuries WHERE id = ?").run(id);
  }
}

// ─── MATCH_STATS CLASS ──────────────────────────────────────────────
export class MatchStatsModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO match_stats (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM match_stats WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM match_stats").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE match_stats SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM match_stats WHERE id = ?").run(id);
  }
}

// ─── PLAYERS CLASS ──────────────────────────────────────────────
export class PlayersModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO players (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM players WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM players").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE players SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM players WHERE id = ?").run(id);
  }

  static getByName(db: Database, name: string) {
    return db.prepare("SELECT * FROM players WHERE name = ?").get(name);
  }
}

// ─── HEAD_TO_HEAD CLASS ──────────────────────────────────────────────
export class HeadToHeadModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO head_to_head (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM head_to_head WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM head_to_head").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE head_to_head SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM head_to_head WHERE id = ?").run(id);
  }
}

// ─── OUTCOMES CLASS ──────────────────────────────────────────────
export class OutcomesModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO outcomes (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM outcomes WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM outcomes").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE outcomes SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM outcomes WHERE id = ?").run(id);
  }
}

// ─── REWARDS CLASS ──────────────────────────────────────────────
export class RewardsModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO rewards (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM rewards WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM rewards").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE rewards SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM rewards WHERE id = ?").run(id);
  }
}

// ─── MATCHES CLASS ──────────────────────────────────────────────
export class MatchesModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO matches (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM matches WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM matches").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE matches SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM matches WHERE id = ?").run(id);
  }
}

// ─── VOTES CLASS ──────────────────────────────────────────────
export class VotesModel {
  static insert(db: Database, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const stmt = db.prepare(
      `INSERT INTO votes (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById(db: Database, id: number | string) {
    return db.prepare("SELECT * FROM votes WHERE id = ?").get(id);
  }

  static getAll(db: Database) {
    return db.prepare("SELECT * FROM votes").all();
  }

  static update(db: Database, id: number | string, data: any) {
    const keys = Object.keys(data);
    const values = keys.map((k) => data[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(`UPDATE votes SET ${setters} WHERE id = ?`);
    return stmt.run(...values, id);
  }

  static delete(db: Database, id: number | string) {
    return db.prepare("DELETE FROM votes WHERE id = ?").run(id);
  }
}
