import type { CategoryId } from "@/domain/category/category-id";
import type { DueDate } from "./due-date";
import type { TodoId } from "./todo-id";
import type { TodoText } from "./todo-text";

export class Todo {
  private constructor(
    readonly id: TodoId,
    readonly text: TodoText,
    readonly done: boolean,
    /** カテゴリーは 1 つまで。未分類は null */
    readonly categoryId: CategoryId | null,
    /** 期限なしは null */
    readonly dueDate: DueDate | null,
  ) {}

  /** 新しい TODO を作る。未完了で始まる */
  static create(
    id: TodoId,
    text: TodoText,
    categoryId: CategoryId | null = null,
    dueDate: DueDate | null = null,
  ): Todo {
    return new Todo(id, text, false, categoryId, dueDate);
  }

  /** 永続化済みの値からエンティティを組み立て直す */
  static reconstruct(
    id: TodoId,
    text: TodoText,
    done: boolean,
    categoryId: CategoryId | null,
    dueDate: DueDate | null,
  ): Todo {
    return new Todo(id, text, done, categoryId, dueDate);
  }

  /** 完了状態を反転させた新しいインスタンスを返す（自身は変更しない） */
  toggle(): Todo {
    return new Todo(this.id, this.text, !this.done, this.categoryId, this.dueDate);
  }

  /** カテゴリーを付け替えた新しいインスタンスを返す（自身は変更しない） */
  withCategory(categoryId: CategoryId | null): Todo {
    return new Todo(this.id, this.text, this.done, categoryId, this.dueDate);
  }

  /** 期限を付け替えた新しいインスタンスを返す（自身は変更しない）。null で期限なしに戻す */
  withDueDate(dueDate: DueDate | null): Todo {
    return new Todo(this.id, this.text, this.done, this.categoryId, dueDate);
  }
}
