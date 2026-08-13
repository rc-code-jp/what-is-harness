import { describe, expect, it } from "vitest";
import { TodoNotFoundError } from "@/domain/todo/errors";
import { Todo } from "@/domain/todo/todo";
import { TodoId } from "@/domain/todo/todo-id";
import { TodoText } from "@/domain/todo/todo-text";
import { InMemoryTodoRepository } from "@/infrastructure/persistence/in-memory-todo-repository";
import { ToggleTodo } from "./toggle-todo";

function setup() {
  const todo = Todo.create(TodoId.create("todo-1"), TodoText.create("牛乳を買う"));
  const todos = new InMemoryTodoRepository([todo]);
  return { todos, toggleTodo: new ToggleTodo(todos) };
}

describe("ToggleTodo", () => {
  it("未完了を完了にする", async () => {
    const { todos, toggleTodo } = setup();

    await toggleTodo.execute("todo-1");

    expect((await todos.findById(TodoId.create("todo-1")))?.done).toBe(true);
  });

  it("2 回実行すると未完了に戻る", async () => {
    const { todos, toggleTodo } = setup();

    await toggleTodo.execute("todo-1");
    await toggleTodo.execute("todo-1");

    expect((await todos.findById(TodoId.create("todo-1")))?.done).toBe(false);
  });

  it("存在しない ID は TodoNotFoundError", async () => {
    const { toggleTodo } = setup();

    await expect(toggleTodo.execute("todo-999")).rejects.toThrow(TodoNotFoundError);
  });
});
