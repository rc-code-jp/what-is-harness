import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

function createDb() {
  const dir = path.join(process.cwd(), "data");
  mkdirSync(dir, { recursive: true });

  const db = new DatabaseSync(path.join(dir, "todos.db"));
  db.exec("PRAGMA journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0
    )
  `);
  return db;
}

// 開発時の HMR でコネクションが増え続けないよう global に保持する
const globalForDb = globalThis as unknown as { db?: DatabaseSync };

export function getDb(): DatabaseSync {
  return (globalForDb.db ??= createDb());
}
