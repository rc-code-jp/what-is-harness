import { InvalidCategoryNameError } from "./errors";

const MAX_LENGTH = 20;

export class CategoryName {
  private constructor(readonly value: string) {}

  static create(raw: string): CategoryName {
    const trimmed = raw.trim();

    if (trimmed.length === 0) {
      throw new InvalidCategoryNameError("カテゴリー名を入力してください");
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new InvalidCategoryNameError(
        `カテゴリー名は ${MAX_LENGTH} 文字以内で入力してください`,
      );
    }

    return new CategoryName(trimmed);
  }

  equals(other: CategoryName): boolean {
    return this.value === other.value;
  }
}
