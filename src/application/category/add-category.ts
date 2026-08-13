import { Category } from "@/domain/category/category";
import type { CategoryIdGenerator } from "@/domain/category/category-id-generator";
import { CategoryName } from "@/domain/category/category-name";
import type { CategoryRepository } from "@/domain/category/category-repository";

export class AddCategory {
  constructor(
    private readonly categories: CategoryRepository,
    private readonly idGenerator: CategoryIdGenerator,
  ) {}

  /** 入力が不正な場合は InvalidCategoryNameError を投げる */
  async execute(rawName: string): Promise<void> {
    const name = CategoryName.create(rawName);
    const category = Category.create(this.idGenerator.next(), name);
    await this.categories.save(category);
  }
}
