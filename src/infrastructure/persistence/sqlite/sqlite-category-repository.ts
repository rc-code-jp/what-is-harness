import type { DatabaseSync } from "node:sqlite";
import { Category } from "@/domain/category/category";
import { CategoryId } from "@/domain/category/category-id";
import { CategoryName } from "@/domain/category/category-name";
import type { CategoryRepository } from "@/domain/category/category-repository";

type CategoryRow = {
  id: string;
  name: string;
};

/** SQL とドメインの変換をここに閉じ込める */
export class SqliteCategoryRepository implements CategoryRepository {
  constructor(private readonly db: DatabaseSync) {}

  async findAll(): Promise<Category[]> {
    // rowid は挿入順なので、追加した順に並ぶ
    const rows = this.db
      .prepare("SELECT id, name FROM categories ORDER BY rowid")
      .all() as unknown as CategoryRow[];

    return rows.map(toCategory);
  }

  async findById(id: CategoryId): Promise<Category | null> {
    const row = this.db
      .prepare("SELECT id, name FROM categories WHERE id = ?")
      .get(id.value) as unknown as CategoryRow | undefined;

    return row ? toCategory(row) : null;
  }

  async save(category: Category): Promise<void> {
    this.db
      .prepare(
        `INSERT INTO categories (id, name) VALUES (?, ?)
         ON CONFLICT(id) DO UPDATE SET name = excluded.name`,
      )
      .run(category.id.value, category.name.value);
  }

  async delete(id: CategoryId): Promise<void> {
    this.db.prepare("DELETE FROM categories WHERE id = ?").run(id.value);
  }
}

function toCategory(row: CategoryRow): Category {
  return Category.create(CategoryId.create(row.id), CategoryName.create(row.name));
}
