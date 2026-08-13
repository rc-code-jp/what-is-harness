import { describe, expect, it } from "vitest";
import { Todo } from "./todo";
import { TodoId } from "./todo-id";
import { TodoText } from "./todo-text";

function createTodo() {
  return Todo.create(TodoId.create("todo-1"), TodoText.create("牛乳を買う"));
}

describe("Todo", () => {
  it("作成直後は未完了", () => {
    expect(createTodo().done).toBe(false);
  });

  it("toggle は自身を変更せず、反転した新しいインスタンスを返す", () => {
    const todo = createTodo();
    const toggled = todo.toggle();

    expect(toggled.done).toBe(true);
    expect(todo.done).toBe(false);
    expect(toggled).not.toBe(todo);
  });

  it("toggle を 2 回で元の状態に戻る", () => {
    expect(createTodo().toggle().toggle().done).toBe(false);
  });

  it("toggle しても id と text は変わらない", () => {
    const todo = createTodo();
    const toggled = todo.toggle();

    expect(toggled.id.equals(todo.id)).toBe(true);
    expect(toggled.text.equals(todo.text)).toBe(true);
  });
});
