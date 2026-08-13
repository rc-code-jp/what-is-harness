import { randomUUID } from "node:crypto";
import type { CategoryIdGenerator } from "@/domain/category/category-id-generator";
import { CategoryId } from "@/domain/category/category-id";

export class UuidCategoryIdGenerator implements CategoryIdGenerator {
  next(): CategoryId {
    return CategoryId.create(randomUUID());
  }
}
