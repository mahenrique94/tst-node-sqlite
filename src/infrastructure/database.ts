import sqlite from "node:sqlite";
import path from "node:path";

export type Value = string | number;

export class Database {
  private db: sqlite.DatabaseSync;

  public async connect(): Promise<void> {
    this.db = new sqlite.DatabaseSync(
      path.resolve(import.meta.dirname, "..", "..", "database.db")
    );
  }

  public async migrate(): Promise<void> {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        salt TEXT UNIQUE NOT NULL
      )
    `);
  }

  public async exec<T = unknown>(
    sql: string,
    values: Value[] = []
  ): Promise<sqlite.StatementResultingChanges | T> {
    const query = this.db.prepare(sql);

    if (sql.toLowerCase().startsWith("select")) {
      return query.all() as T;
    }

    return query.run(...values);
  }
}
