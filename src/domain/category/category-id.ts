import { InvalidCategoryIdError } from "./errors";

export class CategoryId {
  private constructor(readonly value: string) {}

  static create(value: string): CategoryId {
    if (value.trim().length === 0) {
      throw new InvalidCategoryIdError("CategoryId が空です");
    }
    return new CategoryId(value);
  }

  equals(other: CategoryId): boolean {
    return this.value === other.value;
  }
}
