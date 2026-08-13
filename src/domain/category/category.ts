import type { CategoryId } from "./category-id";
import type { CategoryName } from "./category-name";

export class Category {
  private constructor(
    readonly id: CategoryId,
    readonly name: CategoryName,
  ) {}

  static create(id: CategoryId, name: CategoryName): Category {
    return new Category(id, name);
  }
}
