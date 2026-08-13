import { randomUUID } from "node:crypto";
import type { TodoIdGenerator } from "@/domain/todo/todo-id-generator";
import { TodoId } from "@/domain/todo/todo-id";

export class UuidTodoIdGenerator implements TodoIdGenerator {
  next(): TodoId {
    return TodoId.create(randomUUID());
  }
}
