import type { TodoRepository } from "@/domain/todo/todo-repository";
import { toTodoDto, type TodoDto } from "./todo-dto";

export class ListTodos {
  constructor(private readonly todos: TodoRepository) {}

  async execute(): Promise<TodoDto[]> {
    const todos = await this.todos.findAll();
    return todos.map(toTodoDto);
  }
}
