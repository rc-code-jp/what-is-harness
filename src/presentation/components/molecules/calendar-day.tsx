import type { TodoDto } from "@/application/todo/todo-dto";
import type { CalendarDay as CalendarDayModel } from "@/presentation/calendar";
import { classNames } from "@/presentation/class-names";
import styles from "./calendar-day.module.css";

type Props = {
  day: CalendarDayModel;
  /** その日が期限の TODO */
  todos: TodoDto[];
  isToday: boolean;
};

export function CalendarDay({ day, todos, isToday }: Props) {
  return (
    <td className={classNames(styles.cell, !day.inMonth && styles.outside)}>
      <span className={classNames(styles.dayOfMonth, isToday && styles.today)}>
        {day.dayOfMonth}
      </span>

      <ul className={styles.todos}>
        {todos.map((todo) => (
          <li key={todo.id} className={classNames(styles.todo, todo.done && styles.done)}>
            {todo.text}
          </li>
        ))}
      </ul>
    </td>
  );
}
