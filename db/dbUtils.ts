import { Database } from "better-sqlite3";

export abstract class Model {
  static tableName: string;

  static insert<T extends object>(
    this: { tableName: string },
    db: Database,
    data: T
  ) {
    const keys = Object.keys(data);
    const values = keys.map((k) => (data as any)[k]);
    const stmt = db.prepare(
      `INSERT INTO ${this.tableName} (${keys.join(", ")}) VALUES (${keys
        .map(() => "?")
        .join(", ")})`
    );
    return stmt.run(...values);
  }

  static getById<T extends object>(
    this: { tableName: string },
    db: Database,
    id: number | string
  ): T {
    return db
      .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
      .get(id) as T;
  }

  static getAll<T extends object>(
    this: { tableName: string },
    db: Database
  ): T[] {
    return db.prepare(`SELECT * FROM ${this.tableName}`).all() as T[];
  }

  static update<T extends object>(
    this: { tableName: string },
    db: Database,
    id: number | string,
    data: Partial<T>
  ) {
    const keys = Object.keys(data);
    const values = keys.map((k) => (data as any)[k]);
    const setters = keys.map((k) => `${k} = ?`).join(", ");
    const stmt = db.prepare(
      `UPDATE ${this.tableName} SET ${setters} WHERE id = ?`
    );
    return stmt.run(...values, id);
  }

  static delete(
    this: { tableName: string },
    db: Database,
    id: number | string
  ) {
    return db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id);
  }

  static getByField<T extends object>(
    this: { tableName: string },
    db: Database,
    field: string,
    value: any
  ): T {
    return db
      .prepare(`SELECT * FROM ${this.tableName} WHERE ${field} = ?`)
      .get(value) as T;
  }
}

export class CountriesModel extends Model {
  static override tableName = "countries";
}

export class CitiesModel extends Model {
  static override tableName = "cities";
}

export class EnvironmentModel extends Model {
  static override tableName = "environment";
}

export class RecordsModel extends Model {
  static override tableName = "records";
}

export class ServeQualityModel extends Model {
  static override tableName = "serve_quality";
}

export class ServesModel extends Model {
  static override tableName = "serves";
}

export class ReturnAbilityModel extends Model {
  static override tableName = "return_ability";
}

export class ReturnsModel extends Model {
  static override tableName = "returns";
}

export class UnderPressureModel extends Model {
  static override tableName = "under_pressure";
}

export class PressureModel extends Model {
  static override tableName = "pressure";
}

export class StatsModel extends Model {
  static override tableName = "stats";
}

export class InjuriesModel extends Model {
  static override tableName = "injuries";
}

export class MatchStatsModel extends Model {
  static override tableName = "match_stats";
}

export class PlayersModel extends Model {
  static override tableName = "players";
}

export class HeadToHeadModel extends Model {
  static override tableName = "head_to_head";
}

export class OutcomesModel extends Model {
  static override tableName = "outcomes";
}

export class RewardsModel extends Model {
  static override tableName = "rewards";
}

export class MatchesModel extends Model {
  static override tableName = "matches";
}

export class VotesModel extends Model {
  static override tableName = "votes";
}
