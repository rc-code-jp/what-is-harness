import { describe, expect, it } from "vitest";
import { InvalidTodoTextError } from "@/domain/todo/errors";
import { SequentialTodoIdGenerator } from "@/infrastructure/id/sequential-todo-id-generator";
import { InMemoryTodoRepository } from "@/infrastructure/persistence/in-memory-todo-repository";
import { AddTodo } from "./add-todo";

function setup() {
  const todos = new InMemoryTodoRepository();
  return { todos, addTodo: new AddTodo(todos, new SequentialTodoIdGenerator()) };
}

describe("AddTodo", () => {
  it("採番された ID で未完了の TODO を保存する", async () => {
    const { todos, addTodo } = setup();

    await addTodo.execute("牛乳を買う");
    const saved = await todos.findAll();

    expect(saved).toHaveLength(1);
    expect(saved[0].id.value).toBe("todo-1");
    expect(saved[0].text.value).toBe("牛乳を買う");
    expect(saved[0].done).toBe(false);
  });

  it("前後の空白は落として保存する", async () => {
    const { todos, addTodo } = setup();

    await addTodo.execute("  牛乳を買う  ");

    expect((await todos.findAll())[0].text.value).toBe("牛乳を買う");
  });

  it("空白のみの入力は保存しない", async () => {
    const { todos, addTodo } = setup();

    await expect(addTodo.execute("   ")).rejects.toThrow(InvalidTodoTextError);
    expect(await todos.findAll()).toHaveLength(0);
  });

  it("複数追加しても ID が衝突しない", async () => {
    const { todos, addTodo } = setup();

    await addTodo.execute("牛乳を買う");
    await addTodo.execute("卵を買う");
    const saved = await todos.findAll();

    expect(saved.map((todo) => todo.id.value)).toEqual(["todo-1", "todo-2"]);
  });
});
