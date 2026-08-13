import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { TodoDto } from "@/application/todo/todo-dto";
import { buildCalendarMonth, WEEKDAY_LABELS } from "@/presentation/calendar";
import { CalendarDay } from "../molecules/calendar-day";
import styles from "./todo-calendar.module.css";

type Props = {
  todos: TodoDto[];
  /** 表示する月。YYYY-MM */
  month: string;
  /** 今日。YYYY-MM-DD */
  today: string;
};

export function TodoCalendar({ todos, month, today }: Props) {
  const calendar = buildCalendarMonth(month);
  const byDueDate = groupByDueDate(todos);

  return (
    <section className={styles.calendar}>
      <header className={styles.header}>
        <Link
          href={`/?month=${calendar.previousMonth}`}
          className={styles.navigation}
          aria-label="前の月"
        >
          <ChevronLeft size={18} />
        </Link>
        <h2 className={styles.label}>{calendar.label}</h2>
        <Link
          href={`/?month=${calendar.nextMonth}`}
          className={styles.navigation}
          aria-label="次の月"
        >
          <ChevronRight size={18} />
        </Link>
      </header>

      <table className={styles.table}>
        <thead>
          <tr>
            {WEEKDAY_LABELS.map((label) => (
              <th key={label} scope="col" className={styles.weekday}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.weeks.map((week) => (
            <tr key={week[0].date}>
              {week.map((day) => (
                <CalendarDay
                  key={day.date}
                  day={day}
                  todos={byDueDate.get(day.date) ?? []}
                  isToday={day.date === today}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function groupByDueDate(todos: TodoDto[]): Map<string, TodoDto[]> {
  const grouped = new Map<string, TodoDto[]>();

  for (const todo of todos) {
    if (todo.dueDate === null) continue;

    const sameDay = grouped.get(todo.dueDate);
    if (sameDay) {
      sameDay.push(todo);
    } else {
      grouped.set(todo.dueDate, [todo]);
    }
  }

  return grouped;
}
