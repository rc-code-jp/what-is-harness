import { Todo } from "@/domain/todo/todo";
import type { TodoIdGenerator } from "@/domain/todo/todo-id-generator";
import type { TodoRepository } from "@/domain/todo/todo-repository";
import { TodoText } from "@/domain/todo/todo-text";

export class AddTodo {
  constructor(
    private readonly todos: TodoRepository,
    private readonly idGenerator: TodoIdGenerator,
  ) {}

  /** 入力が不正な場合は InvalidTodoTextError を投げる */
  async execute(rawText: string): Promise<void> {
    const text = TodoText.create(rawText);
    const todo = Todo.create(this.idGenerator.next(), text);
    await this.todos.save(todo);
  }
}
