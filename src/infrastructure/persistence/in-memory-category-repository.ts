import type { Category } from "@/domain/category/category";
import type { CategoryId } from "@/domain/category/category-id";
import type { CategoryRepository } from "@/domain/category/category-repository";

/** テスト用の実装。DB を立てずにユースケースを動かせる */
export class InMemoryCategoryRepository implements CategoryRepository {
  private readonly store = new Map<string, Category>();

  constructor(initial: Category[] = []) {
    for (const category of initial) {
      this.store.set(category.id.value, category);
    }
  }

  async findAll(): Promise<Category[]> {
    return [...this.store.values()];
  }

  async findById(id: CategoryId): Promise<Category | null> {
    return this.store.get(id.value) ?? null;
  }

  async save(category: Category): Promise<void> {
    this.store.set(category.id.value, category);
  }

  async delete(id: CategoryId): Promise<void> {
    this.store.delete(id.value);
  }
}
