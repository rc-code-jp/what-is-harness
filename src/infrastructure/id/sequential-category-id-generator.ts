import type { CategoryIdGenerator } from "@/domain/category/category-id-generator";
import { CategoryId } from "@/domain/category/category-id";

/** テスト用の実装。採番が予測できるので結果を検証しやすい */
export class SequentialCategoryIdGenerator implements CategoryIdGenerator {
  private count = 0;

  constructor(private readonly prefix = "category-") {}

  next(): CategoryId {
    this.count += 1;
    return CategoryId.create(`${this.prefix}${this.count}`);
  }
}
