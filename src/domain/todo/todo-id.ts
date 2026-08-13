import { InvalidTodoIdError } from "./errors";

export class TodoId {
  private constructor(readonly value: string) {}

  static create(value: string): TodoId {
    if (value.trim().length === 0) {
      throw new InvalidTodoIdError("TodoId が空です");
    }
    return new TodoId(value);
  }

  equals(other: TodoId): boolean {
    return this.value === other.value;
  }
}
