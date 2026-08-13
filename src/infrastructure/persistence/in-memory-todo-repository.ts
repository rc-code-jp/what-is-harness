import type { Todo } from "@/domain/todo/todo";
import type { TodoId } from "@/domain/todo/todo-id";
import type { TodoRepository } from "@/domain/todo/todo-repository";

/** テスト用の実装。DB を立てずにユースケースを動かせる */
export class InMemoryTodoRepository implements TodoRepository {
  private readonly store = new Map<string, Todo>();

  constructor(initial: Todo[] = []) {
    for (const todo of initial) {
      this.store.set(todo.id.value, todo);
    }
  }

  async findAll(): Promise<Todo[]> {
    return [...this.store.values()];
  }

  async findById(id: TodoId): Promise<Todo | null> {
    return this.store.get(id.value) ?? null;
  }

  async save(todo: Todo): Promise<void> {
    this.store.set(todo.id.value, todo);
  }

  async delete(id: TodoId): Promise<void> {
    this.store.delete(id.value);
  }
}
