import type { TodoIdGenerator } from "@/domain/todo/todo-id-generator";
import { TodoId } from "@/domain/todo/todo-id";

/** テスト用の実装。採番が予測できるので結果を検証しやすい */
export class SequentialTodoIdGenerator implements TodoIdGenerator {
  private count = 0;

  constructor(private readonly prefix = "todo-") {}

  next(): TodoId {
    this.count += 1;
    return TodoId.create(`${this.prefix}${this.count}`);
  }
}
