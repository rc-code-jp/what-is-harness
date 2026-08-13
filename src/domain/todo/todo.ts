import type { TodoId } from "./todo-id";
import type { TodoText } from "./todo-text";

export class Todo {
  private constructor(
    readonly id: TodoId,
    readonly text: TodoText,
    readonly done: boolean,
  ) {}

  /** 新しい TODO を作る。未完了で始まる */
  static create(id: TodoId, text: TodoText): Todo {
    return new Todo(id, text, false);
  }

  /** 永続化済みの値からエンティティを組み立て直す */
  static reconstruct(id: TodoId, text: TodoText, done: boolean): Todo {
    return new Todo(id, text, done);
  }

  /** 完了状態を反転させた新しいインスタンスを返す（自身は変更しない） */
  toggle(): Todo {
    return new Todo(this.id, this.text, !this.done);
  }
}
