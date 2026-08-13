import { describe, expect, it } from "vitest";
import { Category } from "@/domain/category/category";
import { CategoryId } from "@/domain/category/category-id";
import { CategoryName } from "@/domain/category/category-name";
import { Todo } from "@/domain/todo/todo";
import { TodoId } from "@/domain/todo/todo-id";
import { TodoText } from "@/domain/todo/todo-text";
import { InMemoryCategoryRepository } from "@/infrastructure/persistence/in-memory-category-repository";
import { InMemoryTodoRepository } from "@/infrastructure/persistence/in-memory-todo-repository";
import { ListTodos } from "./list-todos";

describe("ListTodos", () => {
  it("エンティティを DTO に変換して返す", async () => {
    const todos = new InMemoryTodoRepository([
      Todo.create(
        TodoId.create("todo-1"),
        TodoText.create("牛乳を買う"),
        CategoryId.create("category-1"),
      ),
      Todo.create(TodoId.create("todo-2"), TodoText.create("卵を買う")).toggle(),
    ]);
    const categories = new InMemoryCategoryRepository([
      Category.create(CategoryId.create("category-1"), CategoryName.create("買い物")),
    ]);

    expect(await new ListTodos(todos, categories).execute()).toEqual([
      { id: "todo-1", text: "牛乳を買う", done: false, category: { id: "category-1", name: "買い物" } },
      { id: "todo-2", text: "卵を買う", done: true, category: null },
    ]);
  });

  it("1 件もなければ空配列", async () => {
    const listTodos = new ListTodos(new InMemoryTodoRepository(), new InMemoryCategoryRepository());

    expect(await listTodos.execute()).toEqual([]);
  });
});
