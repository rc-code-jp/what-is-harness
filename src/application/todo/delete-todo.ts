import { TodoId } from "@/domain/todo/todo-id";
import type { TodoRepository } from "@/domain/todo/todo-repository";

export class DeleteTodo {
  constructor(private readonly todos: TodoRepository) {}

  async execute(rawId: string): Promise<void> {
    await this.todos.delete(TodoId.create(rawId));
  }
}
