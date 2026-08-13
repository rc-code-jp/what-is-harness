import { describe, expect, it } from "vitest";
import { Category } from "@/domain/category/category";
import { CategoryId } from "@/domain/category/category-id";
import { CategoryName } from "@/domain/category/category-name";
import { CategoryNotFoundError } from "@/domain/category/errors";
import { InvalidDueDateError, InvalidTodoTextError } from "@/domain/todo/errors";
import { SequentialTodoIdGenerator } from "@/infrastructure/id/sequential-todo-id-generator";
import { InMemoryCategoryRepository } from "@/infrastructure/persistence/in-memory-category-repository";
import { InMemoryTodoRepository } from "@/infrastructure/persistence/in-memory-todo-repository";
import { AddTodo } from "./add-todo";

function setup() {
  const todos = new InMemoryTodoRepository();
  const categories = new InMemoryCategoryRepository([
    Category.create(CategoryId.create("category-1"), CategoryName.create("買い物")),
  ]);
  return {
    todos,
    addTodo: new AddTodo(todos, categories, new SequentialTodoIdGenerator()),
  };
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

  it("指定したカテゴリーを付けて保存する", async () => {
    const { todos, addTodo } = setup();

    await addTodo.execute("牛乳を買う", "category-1");

    expect((await todos.findAll())[0].categoryId?.value).toBe("category-1");
  });

  it("カテゴリーを指定しなければ未分類で保存する", async () => {
    const { todos, addTodo } = setup();

    await addTodo.execute("牛乳を買う");

    expect((await todos.findAll())[0].categoryId).toBeNull();
  });

  it("存在しないカテゴリーは保存しない", async () => {
    const { todos, addTodo } = setup();

    await expect(addTodo.execute("牛乳を買う", "category-999")).rejects.toThrow(
      CategoryNotFoundError,
    );
    expect(await todos.findAll()).toHaveLength(0);
  });

  it("指定した期限を付けて保存する", async () => {
    const { todos, addTodo } = setup();

    await addTodo.execute("牛乳を買う", "", "2026-08-13");

    expect((await todos.findAll())[0].dueDate?.value).toBe("2026-08-13");
  });

  it("期限を指定しなければ期限なしで保存する", async () => {
    const { todos, addTodo } = setup();

    await addTodo.execute("牛乳を買う");

    expect((await todos.findAll())[0].dueDate).toBeNull();
  });

  it("不正な期限は保存しない", async () => {
    const { todos, addTodo } = setup();

    await expect(addTodo.execute("牛乳を買う", "", "2026-02-31")).rejects.toThrow(
      InvalidDueDateError,
    );
    expect(await todos.findAll()).toHaveLength(0);
  });
});
