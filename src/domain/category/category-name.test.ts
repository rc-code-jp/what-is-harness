import { describe, expect, it } from "vitest";
import { CategoryName } from "./category-name";
import { InvalidCategoryNameError } from "./errors";

describe("CategoryName", () => {
  it("前後の空白を落とす", () => {
    expect(CategoryName.create("  買い物  ").value).toBe("買い物");
  });

  it("空文字は作れない", () => {
    expect(() => CategoryName.create("")).toThrow(InvalidCategoryNameError);
  });

  it("空白のみは作れない", () => {
    expect(() => CategoryName.create("   ")).toThrow(InvalidCategoryNameError);
  });

  it("20 文字までは作れる", () => {
    expect(CategoryName.create("あ".repeat(20)).value).toHaveLength(20);
  });

  it("21 文字は作れない", () => {
    expect(() => CategoryName.create("あ".repeat(21))).toThrow(InvalidCategoryNameError);
  });
});
