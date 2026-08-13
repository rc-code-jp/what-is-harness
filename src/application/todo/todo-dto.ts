import { toCategoryDto, type CategoryDto } from "@/application/category/category-dto";
import type { Category } from "@/domain/category/category";
import type { Todo } from "@/domain/todo/todo";

/**
 * presentation 層に渡す平坦な型。
 * エンティティを UI に直接渡さないことで、UI がドメインの内部構造に依存しなくなる。
 */
export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
  /** 未分類は null */
  category: CategoryDto | null;
  /** 期限なしは null。形式は YYYY-MM-DD */
  dueDate: string | null;
};

export function toTodoDto(todo: Todo, category: Category | null): TodoDto {
  return {
    id: todo.id.value,
    text: todo.text.value,
    done: todo.done,
    category: category === null ? null : toCategoryDto(category),
    dueDate: todo.dueDate?.value ?? null,
  };
}
