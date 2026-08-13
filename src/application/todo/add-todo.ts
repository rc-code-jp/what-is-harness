import { CategoryId } from "@/domain/category/category-id";
import type { CategoryRepository } from "@/domain/category/category-repository";
import { CategoryNotFoundError } from "@/domain/category/errors";
import { DueDate } from "@/domain/todo/due-date";
import { Todo } from "@/domain/todo/todo";
import type { TodoIdGenerator } from "@/domain/todo/todo-id-generator";
import type { TodoRepository } from "@/domain/todo/todo-repository";
import { TodoText } from "@/domain/todo/todo-text";

export class AddTodo {
  constructor(
    private readonly todos: TodoRepository,
    private readonly categories: CategoryRepository,
    private readonly idGenerator: TodoIdGenerator,
  ) {}

  /**
   * 入力が不正な場合は InvalidTodoTextError / InvalidDueDateError、
   * 存在しないカテゴリーを指定された場合は CategoryNotFoundError を投げる。
   * rawCategoryId が空なら未分類、rawDueDate が空なら期限なしとして扱う。
   */
  async execute(rawText: string, rawCategoryId = "", rawDueDate = ""): Promise<void> {
    const text = TodoText.create(rawText);
    const categoryId = await this.resolveCategoryId(rawCategoryId);
    const dueDate = this.resolveDueDate(rawDueDate);
    const todo = Todo.create(this.idGenerator.next(), text, categoryId, dueDate);
    await this.todos.save(todo);
  }

  /** 空入力は期限なしを意味する */
  private resolveDueDate(rawDueDate: string): DueDate | null {
    return rawDueDate.trim().length === 0 ? null : DueDate.create(rawDueDate);
  }

  private async resolveCategoryId(rawCategoryId: string): Promise<CategoryId | null> {
    if (rawCategoryId.trim().length === 0) {
      return null;
    }

    const id = CategoryId.create(rawCategoryId);
    if ((await this.categories.findById(id)) === null) {
      throw new CategoryNotFoundError(`カテゴリーが見つかりません: ${id.value}`);
    }

    return id;
  }
}
