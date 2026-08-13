import { InvalidTodoTextError } from "./errors";

const MAX_LENGTH = 200;

export class TodoText {
  private constructor(readonly value: string) {}

  static create(raw: string): TodoText {
    const trimmed = raw.trim();

    if (trimmed.length === 0) {
      throw new InvalidTodoTextError("やることを入力してください");
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new InvalidTodoTextError(`やることは ${MAX_LENGTH} 文字以内で入力してください`);
    }

    return new TodoText(trimmed);
  }

  equals(other: TodoText): boolean {
    return this.value === other.value;
  }
}
