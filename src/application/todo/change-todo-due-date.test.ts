import { describe, expect, it } from "vitest";
import { DueDate } from "@/domain/todo/due-date";
import { InvalidDueDateError, TodoNotFoundError } from "@/domain/todo/errors";
import { Todo } from "@/domain/todo/todo";
import { TodoId } from "@/domain/todo/todo-id";
import { TodoText } from "@/domain/todo/todo-text";
import { InMemoryTodoRepository } from "@/infrastructure/persistence/in-memory-todo-repository";
import { ChangeTodoDueDate } from "./change-todo-due-date";

function setup() {
  const todos = new InMemoryTodoRepository([
    Todo.create(
      TodoId.create("todo-1"),
      TodoText.create("牛乳を買う"),
      null,
      DueDate.create("2026-08-13"),
    ),
  ]);
  return { todos, changeTodoDueDate: new ChangeTodoDueDate(todos) };
}

describe("ChangeTodoDueDate", () => {
  it("期限を差し替える", async () => {
    const { todos, changeTodoDueDate } = setup();

    await changeTodoDueDate.execute("todo-1", "2026-08-20");

    expect((await todos.findAll())[0].dueDate?.value).toBe("2026-08-20");
  });

  it("空文字を渡すと期限なしに戻る", async () => {
    const { todos, changeTodoDueDate } = setup();

    await changeTodoDueDate.execute("todo-1", "");

    expect((await todos.findAll())[0].dueDate).toBeNull();
  });

  it("期限を変えても他の項目は変わらない", async () => {
    const { todos, changeTodoDueDate } = setup();

    await changeTodoDueDate.execute("todo-1", "2026-08-20");
    const saved = (await todos.findAll())[0];

    expect(saved.text.value).toBe("牛乳を買う");
    expect(saved.done).toBe(false);
  });

  it("存在しない TODO は変更できない", async () => {
    const { changeTodoDueDate } = setup();

    await expect(changeTodoDueDate.execute("todo-999", "2026-08-20")).rejects.toThrow(
      TodoNotFoundError,
    );
  });

  it("不正な日付は保存しない", async () => {
    const { todos, changeTodoDueDate } = setup();

    await expect(changeTodoDueDate.execute("todo-1", "2026-02-31")).rejects.toThrow(
      InvalidDueDateError,
    );
    expect((await todos.findAll())[0].dueDate?.value).toBe("2026-08-13");
  });
});
