import type { Category } from "@/domain/category/category";
import type { CategoryRepository } from "@/domain/category/category-repository";
import type { TodoRepository } from "@/domain/todo/todo-repository";
import { toTodoDto, type TodoDto } from "./todo-dto";

export class ListTodos {
  constructor(
    private readonly todos: TodoRepository,
    private readonly categories: CategoryRepository,
  ) {}

  async execute(): Promise<TodoDto[]> {
    const todos = await this.todos.findAll();
    const categories = await this.categories.findAll();
    const byId = new Map<string, Category>(
      categories.map((category) => [category.id.value, category]),
    );

    return todos.map((todo) =>
      toTodoDto(todo, todo.categoryId === null ? null : (byId.get(todo.categoryId.value) ?? null)),
    );
  }
}
