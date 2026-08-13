import { describe, expect, it } from "vitest";
import { DueDate } from "./due-date";
import { InvalidDueDateError } from "./errors";

describe("DueDate", () => {
  it("YYYY-MM-DD をそのまま保持する", () => {
    expect(DueDate.create("2026-08-13").value).toBe("2026-08-13");
  });

  it("前後の空白は落とす", () => {
    expect(DueDate.create("  2026-08-13  ").value).toBe("2026-08-13");
  });

  it("うるう年の 2 月 29 日を受け付ける", () => {
    expect(DueDate.create("2028-02-29").value).toBe("2028-02-29");
  });

  it("形式が違う入力は弾く", () => {
    expect(() => DueDate.create("2026/08/13")).toThrow(InvalidDueDateError);
    expect(() => DueDate.create("2026-8-13")).toThrow(InvalidDueDateError);
    expect(() => DueDate.create("")).toThrow(InvalidDueDateError);
  });

  it("存在しない日付は弾く", () => {
    expect(() => DueDate.create("2026-02-31")).toThrow(InvalidDueDateError);
    expect(() => DueDate.create("2026-13-01")).toThrow(InvalidDueDateError);
    expect(() => DueDate.create("2027-02-29")).toThrow(InvalidDueDateError);
  });

  it("equals は値で比較する", () => {
    expect(DueDate.create("2026-08-13").equals(DueDate.create("2026-08-13"))).toBe(true);
    expect(DueDate.create("2026-08-13").equals(DueDate.create("2026-08-14"))).toBe(false);
  });
});
