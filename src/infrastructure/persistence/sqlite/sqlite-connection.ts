import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

function createDb() {
  const dir = path.join(process.cwd(), "data");
  mkdirSync(dir, { recursive: true });

  const db = new DatabaseSync(path.join(dir, "todos.db"));
  // ビルド時はページごとに別プロセスが同じ DB を開くため、
  // ロックが取れないときは即エラーにせず待たせる
  db.exec("PRAGMA busy_timeout = 5000");
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
      category_id TEXT,
      due_date TEXT
    )
  `);
  addMissingTodoColumns(db);
  return db;
}

/** 機能追加より前に作られた todos テーブルには列が無いので、足りない分だけ後から足す */
function addMissingTodoColumns(db: DatabaseSync) {
  const columns = db.prepare("PRAGMA table_info(todos)").all() as unknown as { name: string }[];
  const existing = new Set(columns.map((column) => column.name));

  for (const name of ["category_id", "due_date"]) {
    if (!existing.has(name)) {
      db.exec(`ALTER TABLE todos ADD COLUMN ${name} TEXT`);
    }
  }
}

// 開発時の HMR でコネクションが増え続けないよう global に保持する
const globalForDb = globalThis as unknown as { db?: DatabaseSync };

export function getDb(): DatabaseSync {
  return (globalForDb.db ??= createDb());
}
