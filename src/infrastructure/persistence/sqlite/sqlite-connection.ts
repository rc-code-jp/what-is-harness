import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

function createDb() {
  const dir = path.join(process.cwd(), "data");
  mkdirSync(dir, { recursive: true });

  const db = new DatabaseSync(path.join(dir, "todos.db"));
  db.exec("PRAGMA journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    )
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      category_id TEXT
    )
  `);
  addCategoryIdColumn(db);
  return db;
}

/** カテゴリー導入前に作られた todos テーブルには category_id が無いので後から足す */
function addCategoryIdColumn(db: DatabaseSync) {
  const columns = db.prepare("PRAGMA table_info(todos)").all() as unknown as { name: string }[];

  if (!columns.some((column) => column.name === "category_id")) {
    db.exec("ALTER TABLE todos ADD COLUMN category_id TEXT");
  }
}

// 開発時の HMR でコネクションが増え続けないよう global に保持する
const globalForDb = globalThis as unknown as { db?: DatabaseSync };

export function getDb(): DatabaseSync {
  return (globalForDb.db ??= createDb());
}
