import { describe, expect, it } from "vitest";
import { Todo } from "@/domain/todo/todo";
import { TodoId } from "@/domain/todo/todo-id";
import { TodoText } from "@/domain/todo/todo-text";
import { InMemoryTodoRepository } from "@/infrastructure/persistence/in-memory-todo-repository";
import { DeleteTodo } from "./delete-todo";

function setup() {
  const todos = new InMemoryTodoRepository([
    Todo.create(TodoId.create("todo-1"), TodoText.create("牛乳を買う")),
    Todo.create(TodoId.create("todo-2"), TodoText.create("卵を買う")),
  ]);
  return { todos, deleteTodo: new DeleteTodo(todos) };
}

describe("DeleteTodo", () => {
  it("指定した TODO だけを削除する", async () => {
    const { todos, deleteTodo } = setup();

    await deleteTodo.execute("todo-1");
    const saved = await todos.findAll();

    expect(saved.map((todo) => todo.id.value)).toEqual(["todo-2"]);
  });

  it("存在しない ID でもエラーにならない", async () => {
    const { todos, deleteTodo } = setup();

    await expect(deleteTodo.execute("todo-999")).resolves.toBeUndefined();
    expect(await todos.findAll()).toHaveLength(2);
  });
});
