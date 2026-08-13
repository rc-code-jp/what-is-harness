import type { Category } from "./category";
import type { CategoryId } from "./category-id";

/**
 * カテゴリーの永続化の契約。実装は infrastructure 層に置き、
 * ユースケースはこのインターフェースにのみ依存する。
 */
export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: CategoryId): Promise<Category | null>;
  /** 新規・更新兼用。ID はドメイン側で採番済みのため upsert として扱う */
  save(category: Category): Promise<void>;
  delete(id: CategoryId): Promise<void>;
}
