import type { DatabaseSync } from "node:sqlite";
import { CategoryId } from "@/domain/category/category-id";
import { DueDate } from "@/domain/todo/due-date";
import { Todo } from "@/domain/todo/todo";
import { TodoId } from "@/domain/todo/todo-id";
import type { TodoRepository } from "@/domain/todo/todo-repository";
import { TodoText } from "@/domain/todo/todo-text";

type TodoRow = {
  id: string;
  text: string;
  done: number;
  category_id: string | null;
  due_date: string | null;
};

/** SQL とドメインの変換をここに閉じ込める。SQL が現れるのはこのファイルだけ */
export class SqliteTodoRepository implements TodoRepository {
  constructor(private readonly db: DatabaseSync) {}

  async findAll(): Promise<Todo[]> {
    // rowid は挿入順なので、追加した順に並ぶ
    const rows = this.db
      .prepare("SELECT id, text, done, category_id, due_date FROM todos ORDER BY rowid")
      .all() as unknown as TodoRow[];

    return rows.map(toTodo);
  }

  async findById(id: TodoId): Promise<Todo | null> {
    const row = this.db
      .prepare("SELECT id, text, done, category_id, due_date FROM todos WHERE id = ?")
      .get(id.value) as unknown as TodoRow | undefined;

    return row ? toTodo(row) : null;
  }

  async save(todo: Todo): Promise<void> {
    this.db
      .prepare(
        `INSERT INTO todos (id, text, done, category_id, due_date) VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           text = excluded.text, done = excluded.done,
           category_id = excluded.category_id, due_date = excluded.due_date`,
      )
      .run(
        todo.id.value,
        todo.text.value,
        todo.done ? 1 : 0,
        todo.categoryId?.value ?? null,
        todo.dueDate?.value ?? null,
      );
  }

  async delete(id: TodoId): Promise<void> {
    this.db.prepare("DELETE FROM todos WHERE id = ?").run(id.value);
  }
}

function toTodo(row: TodoRow): Todo {
  return Todo.reconstruct(
    TodoId.create(row.id),
    TodoText.create(row.text),
    row.done !== 0,
    row.category_id === null ? null : CategoryId.create(row.category_id),
    row.due_date === null ? null : DueDate.create(row.due_date),
  );
}
