import type { CategoryId } from "@/domain/category/category-id";
import type { TodoId } from "./todo-id";
import type { TodoText } from "./todo-text";

export class Todo {
  private constructor(
    readonly id: TodoId,
    readonly text: TodoText,
    readonly done: boolean,
    /** カテゴリーは 1 つまで。未分類は null */
    readonly categoryId: CategoryId | null,
  ) {}

  /** 新しい TODO を作る。未完了で始まる */
  static create(id: TodoId, text: TodoText, categoryId: CategoryId | null = null): Todo {
    return new Todo(id, text, false, categoryId);
  }

  /** 永続化済みの値からエンティティを組み立て直す */
  static reconstruct(
    id: TodoId,
    text: TodoText,
    done: boolean,
    categoryId: CategoryId | null,
  ): Todo {
    return new Todo(id, text, done, categoryId);
  }

  /** 完了状態を反転させた新しいインスタンスを返す（自身は変更しない） */
  toggle(): Todo {
    return new Todo(this.id, this.text, !this.done, this.categoryId);
  }

  /** カテゴリーを付け替えた新しいインスタンスを返す（自身は変更しない） */
  withCategory(categoryId: CategoryId | null): Todo {
    return new Todo(this.id, this.text, this.done, categoryId);
  }
}
