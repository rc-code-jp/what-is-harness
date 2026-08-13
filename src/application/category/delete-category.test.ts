import { describe, expect, it } from "vitest";
import { Category } from "@/domain/category/category";
import { CategoryId } from "@/domain/category/category-id";
import { CategoryName } from "@/domain/category/category-name";
import { Todo } from "@/domain/todo/todo";
import { TodoId } from "@/domain/todo/todo-id";
import { TodoText } from "@/domain/todo/todo-text";
import { InMemoryCategoryRepository } from "@/infrastructure/persistence/in-memory-category-repository";
import { InMemoryTodoRepository } from "@/infrastructure/persistence/in-memory-todo-repository";
import { DeleteCategory } from "./delete-category";

function setup() {
  const categories = new InMemoryCategoryRepository([
    Category.create(CategoryId.create("category-1"), CategoryName.create("買い物")),
    Category.create(CategoryId.create("category-2"), CategoryName.create("仕事")),
  ]);
  const todos = new InMemoryTodoRepository([
    Todo.create(
      TodoId.create("todo-1"),
      TodoText.create("牛乳を買う"),
      CategoryId.create("category-1"),
    ),
    Todo.create(
      TodoId.create("todo-2"),
      TodoText.create("日報を書く"),
      CategoryId.create("category-2"),
    ),
  ]);
  return { categories, todos, deleteCategory: new DeleteCategory(categories, todos) };
}

describe("DeleteCategory", () => {
  it("指定したカテゴリーだけを削除する", async () => {
    const { categories, deleteCategory } = setup();

    await deleteCategory.execute("category-1");
    const saved = await categories.findAll();

    expect(saved.map((category) => category.id.value)).toEqual(["category-2"]);
  });

  it("削除したカテゴリーの TODO は残り、未分類に戻る", async () => {
    const { todos, deleteCategory } = setup();

    await deleteCategory.execute("category-1");
    const saved = await todos.findAll();

    expect(saved).toHaveLength(2);
    expect(saved[0].categoryId).toBeNull();
    expect(saved[0].text.value).toBe("牛乳を買う");
  });

  it("他のカテゴリーの TODO は変わらない", async () => {
    const { todos, deleteCategory } = setup();

    await deleteCategory.execute("category-1");

    expect((await todos.findAll())[1].categoryId?.value).toBe("category-2");
  });

  it("存在しない ID でもエラーにならない", async () => {
    const { categories, deleteCategory } = setup();

    await expect(deleteCategory.execute("category-999")).resolves.toBeUndefined();
    expect(await categories.findAll()).toHaveLength(2);
  });
});
