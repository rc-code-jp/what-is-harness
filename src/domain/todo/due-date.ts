import { InvalidDueDateError } from "./errors";

const PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** 期限。時刻は持たず、日付だけを YYYY-MM-DD で表す */
export class DueDate {
  private constructor(readonly value: string) {}

  static create(raw: string): DueDate {
    const trimmed = raw.trim();

    if (!PATTERN.test(trimmed)) {
      throw new InvalidDueDateError("期限は YYYY-MM-DD の形式で入力してください");
    }
    // 13 月などは Invalid Date になり、2026-02-31 は繰り上がる。
    // どちらも「戻して元の文字列に一致するか」で存在しない日付として弾ける。
    const date = new Date(`${trimmed}T00:00:00Z`);
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== trimmed) {
      throw new InvalidDueDateError(`存在しない日付です: ${trimmed}`);
    }

    return new DueDate(trimmed);
  }

  equals(other: DueDate): boolean {
    return this.value === other.value;
  }
}
