import { CategoryId } from "@/domain/category/category-id";
import type { CategoryRepository } from "@/domain/category/category-repository";
import type { TodoRepository } from "@/domain/todo/todo-repository";

export class DeleteCategory {
  constructor(
    private readonly categories: CategoryRepository,
    private readonly todos: TodoRepository,
  ) {}

  /** 削除したカテゴリーが付いていた TODO は消さずに未分類へ戻す */
  async execute(rawId: string): Promise<void> {
    const id = CategoryId.create(rawId);
    await this.categories.delete(id);

    for (const todo of await this.todos.findAll()) {
      if (todo.categoryId?.equals(id)) {
        await this.todos.save(todo.withCategory(null));
      }
    }
  }
}
