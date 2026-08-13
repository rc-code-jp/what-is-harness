import { describe, expect, it } from "vitest";
import { CategoryId } from "@/domain/category/category-id";
import { DueDate } from "./due-date";
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

  it("カテゴリーを指定しなければ未分類", () => {
    expect(createTodo().categoryId).toBeNull();
  });

  it("期限を指定しなければ期限なし", () => {
    expect(createTodo().dueDate).toBeNull();
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

  it("withCategory は自身を変更せず、カテゴリーを付け替えた新しいインスタンスを返す", () => {
    const todo = createTodo();
    const categorized = todo.withCategory(CategoryId.create("category-1"));

    expect(categorized.categoryId?.value).toBe("category-1");
    expect(todo.categoryId).toBeNull();
    expect(categorized).not.toBe(todo);
  });

  it("withCategory(null) で未分類に戻せる", () => {
    const todo = createTodo().withCategory(CategoryId.create("category-1"));

    expect(todo.withCategory(null).categoryId).toBeNull();
  });

  it("withDueDate は自身を変更せず、期限を付け替えた新しいインスタンスを返す", () => {
    const todo = createTodo();
    const scheduled = todo.withDueDate(DueDate.create("2026-08-13"));

    expect(scheduled.dueDate?.value).toBe("2026-08-13");
    expect(todo.dueDate).toBeNull();
    expect(scheduled).not.toBe(todo);
  });

  it("withDueDate(null) で期限なしに戻せる", () => {
    const todo = createTodo().withDueDate(DueDate.create("2026-08-13"));

    expect(todo.withDueDate(null).dueDate).toBeNull();
  });

  it("toggle しても期限は変わらない", () => {
    const todo = createTodo().withDueDate(DueDate.create("2026-08-13"));

    expect(todo.toggle().dueDate?.value).toBe("2026-08-13");
  });
});
