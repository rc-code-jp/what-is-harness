import { describe, expect, it } from "vitest";
import { Todo } from "@/domain/todo/todo";
import { TodoId } from "@/domain/todo/todo-id";
import { TodoText } from "@/domain/todo/todo-text";
import { InMemoryTodoRepository } from "@/infrastructure/persistence/in-memory-todo-repository";
import { ListTodos } from "./list-todos";

describe("ListTodos", () => {
  it("エンティティを DTO に変換して返す", async () => {
    const todos = new InMemoryTodoRepository([
      Todo.create(TodoId.create("todo-1"), TodoText.create("牛乳を買う")),
      Todo.create(TodoId.create("todo-2"), TodoText.create("卵を買う")).toggle(),
    ]);

    expect(await new ListTodos(todos).execute()).toEqual([
      { id: "todo-1", text: "牛乳を買う", done: false },
      { id: "todo-2", text: "卵を買う", done: true },
    ]);
  });

  it("1 件もなければ空配列", async () => {
    expect(await new ListTodos(new InMemoryTodoRepository()).execute()).toEqual([]);
  });
});
