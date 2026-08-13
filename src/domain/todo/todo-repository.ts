import type { Todo } from "./todo";
import type { TodoId } from "./todo-id";

/**
 * TODO の永続化の契約。実装は infrastructure 層に置き、
 * ユースケースはこのインターフェースにのみ依存する。
 */
export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: TodoId): Promise<Todo | null>;
  /** 新規・更新兼用。ID はドメイン側で採番済みのため upsert として扱う */
  save(todo: Todo): Promise<void>;
  delete(id: TodoId): Promise<void>;
}
