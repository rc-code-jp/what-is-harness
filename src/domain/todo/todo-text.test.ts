import { describe, expect, it } from "vitest";
import { InvalidTodoTextError } from "./errors";
import { TodoText } from "./todo-text";

describe("TodoText", () => {
  it("前後の空白を落とす", () => {
    expect(TodoText.create("  牛乳を買う  ").value).toBe("牛乳を買う");
  });

  it("空文字は作れない", () => {
    expect(() => TodoText.create("")).toThrow(InvalidTodoTextError);
  });

  it("空白のみは作れない", () => {
    expect(() => TodoText.create("   ")).toThrow(InvalidTodoTextError);
  });

  it("200 文字までは作れる", () => {
    expect(TodoText.create("あ".repeat(200)).value).toHaveLength(200);
  });

  it("201 文字は作れない", () => {
    expect(() => TodoText.create("あ".repeat(201))).toThrow(InvalidTodoTextError);
  });
});
