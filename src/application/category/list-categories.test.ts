import { describe, expect, it } from "vitest";
import { Category } from "@/domain/category/category";
import { CategoryId } from "@/domain/category/category-id";
import { CategoryName } from "@/domain/category/category-name";
import { InMemoryCategoryRepository } from "@/infrastructure/persistence/in-memory-category-repository";
import { ListCategories } from "./list-categories";

describe("ListCategories", () => {
  it("エンティティを DTO に変換して返す", async () => {
    const categories = new InMemoryCategoryRepository([
      Category.create(CategoryId.create("category-1"), CategoryName.create("買い物")),
      Category.create(CategoryId.create("category-2"), CategoryName.create("仕事")),
    ]);

    expect(await new ListCategories(categories).execute()).toEqual([
      { id: "category-1", name: "買い物" },
      { id: "category-2", name: "仕事" },
    ]);
  });

  it("1 件もなければ空配列", async () => {
    expect(await new ListCategories(new InMemoryCategoryRepository()).execute()).toEqual([]);
  });
});
