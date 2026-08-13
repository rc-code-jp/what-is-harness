import { describe, expect, it } from "vitest";
import { InvalidCategoryNameError } from "@/domain/category/errors";
import { SequentialCategoryIdGenerator } from "@/infrastructure/id/sequential-category-id-generator";
import { InMemoryCategoryRepository } from "@/infrastructure/persistence/in-memory-category-repository";
import { AddCategory } from "./add-category";

function setup() {
  const categories = new InMemoryCategoryRepository();
  return {
    categories,
    addCategory: new AddCategory(categories, new SequentialCategoryIdGenerator()),
  };
}

describe("AddCategory", () => {
  it("採番された ID でカテゴリーを保存する", async () => {
    const { categories, addCategory } = setup();

    await addCategory.execute("買い物");
    const saved = await categories.findAll();

    expect(saved).toHaveLength(1);
    expect(saved[0].id.value).toBe("category-1");
    expect(saved[0].name.value).toBe("買い物");
  });

  it("前後の空白は落として保存する", async () => {
    const { categories, addCategory } = setup();

    await addCategory.execute("  買い物  ");

    expect((await categories.findAll())[0].name.value).toBe("買い物");
  });

  it("空白のみの入力は保存しない", async () => {
    const { categories, addCategory } = setup();

    await expect(addCategory.execute("   ")).rejects.toThrow(InvalidCategoryNameError);
    expect(await categories.findAll()).toHaveLength(0);
  });
});
