import { DueDate } from "@/domain/todo/due-date";
import { TodoNotFoundError } from "@/domain/todo/errors";
import { TodoId } from "@/domain/todo/todo-id";
import type { TodoRepository } from "@/domain/todo/todo-repository";

export class ChangeTodoDueDate {
  constructor(private readonly todos: TodoRepository) {}

  /** rawDueDate が空なら期限なしに戻す */
  async execute(rawId: string, rawDueDate: string): Promise<void> {
    const id = TodoId.create(rawId);
    const todo = await this.todos.findById(id);

    if (todo === null) {
      throw new TodoNotFoundError(`TODO が見つかりません: ${id.value}`);
    }

    await this.todos.save(todo.withDueDate(this.resolveDueDate(rawDueDate)));
  }

  /** 空入力は期限なしを意味する */
  private resolveDueDate(rawDueDate: string): DueDate | null {
    return rawDueDate.trim().length === 0 ? null : DueDate.create(rawDueDate);
  }
}
