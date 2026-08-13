import type { Todo } from "@/domain/todo/todo";

/**
 * presentation 層に渡す平坦な型。
 * エンティティを UI に直接渡さないことで、UI がドメインの内部構造に依存しなくなる。
 */
export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
};

export function toTodoDto(todo: Todo): TodoDto {
  return {
    id: todo.id.value,
    text: todo.text.value,
    done: todo.done,
  };
}
