import { TodoNotFoundError } from "@/domain/todo/errors";
import { TodoId } from "@/domain/todo/todo-id";
import type { TodoRepository } from "@/domain/todo/todo-repository";

export class ToggleTodo {
  constructor(private readonly todos: TodoRepository) {}

  async execute(rawId: string): Promise<void> {
    const id = TodoId.create(rawId);
    const todo = await this.todos.findById(id);

    if (todo === null) {
      throw new TodoNotFoundError(`TODO が見つかりません: ${id.value}`);
    }

    await this.todos.save(todo.toggle());
  }
}
