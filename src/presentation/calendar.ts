/**
 * カレンダー表示のための日付の組み立て。
 * ドメインのルールではなく見せ方の都合なので presentation に置く。
 * 月は YYYY-MM、日は YYYY-MM-DD の文字列で扱い、計算は UTC で行って時差でずれないようにする。
 */

const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

export type CalendarDay = {
  /** YYYY-MM-DD */
  date: string;
  dayOfMonth: number;
  /** 表示中の月の日か。前後の月から埋めた日は false */
  inMonth: boolean;
};

export type CalendarMonth = {
  /** YYYY-MM */
  month: string;
  label: string;
  previousMonth: string;
  nextMonth: string;
  /** 日曜始まりの週の配列 */
  weeks: CalendarDay[][];
};

/** サーバーのローカル日付を YYYY-MM-DD で返す */
export function todayDate(now: Date = new Date()): string {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** クエリ文字列など外から来た月。不正・未指定なら fallbackDate の月にする */
export function toMonth(raw: string | undefined, fallbackDate: string): string {
  return raw !== undefined && MONTH_PATTERN.test(raw) ? raw : fallbackDate.slice(0, 7);
}

export function buildCalendarMonth(month: string): CalendarMonth {
  const [year, monthNumber] = split(month);
  const firstDay = new Date(Date.UTC(year, monthNumber - 1, 1));
  // 週は日曜始まり。1 日の曜日ぶん前月から埋める
  const start = addDays(firstDay, -firstDay.getUTCDay());
  const daysInMonth = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  const weekCount = Math.ceil((firstDay.getUTCDay() + daysInMonth) / 7);
  const weeks: CalendarDay[][] = [];

  for (let week = 0; week < weekCount; week++) {
    weeks.push(
      Array.from({ length: 7 }, (_, dayOfWeek) => {
        const date = addDays(start, week * 7 + dayOfWeek);
        return {
          date: toDate(date),
          dayOfMonth: date.getUTCDate(),
          inMonth: date.getUTCMonth() === monthNumber - 1,
        };
      }),
    );
  }

  return {
    month,
    label: `${year}年${monthNumber}月`,
    previousMonth: shiftMonth(month, -1),
    nextMonth: shiftMonth(month, 1),
    weeks,
  };
}

function shiftMonth(month: string, diff: number): string {
  const [year, monthNumber] = split(month);
  const shifted = new Date(Date.UTC(year, monthNumber - 1 + diff, 1));
  return `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}`;
}

function split(month: string): [number, number] {
  const [year, monthNumber] = month.split("-").map(Number);
  return [year, monthNumber];
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function toDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}
