import { CalendarCheck, Square, SquareCheckBig, Trash2 } from "lucide-react";
import type { TodoDto } from "@/application/todo/todo-dto";
import { classNames } from "@/presentation/class-names";
import type { FormAction } from "@/presentation/form-action";
import { DateInput } from "../atoms/date-input";
import { IconButton } from "../atoms/icon-button";
import styles from "./todo-item.module.css";

type Props = {
  todo: TodoDto;
  onToggle: FormAction;
  onDelete: FormAction;
  onChangeDueDate: FormAction;
};

export function TodoItem({ todo, onToggle, onDelete, onChangeDueDate }: Props) {
  return (
    <li className={styles.item}>
      <form action={onToggle}>
        <input type="hidden" name="id" value={todo.id} />
        <IconButton type="submit" aria-label="完了を切り替え">
          {todo.done ? <SquareCheckBig size={18} /> : <Square size={18} />}
        </IconButton>
      </form>

      <span className={classNames(styles.text, todo.done && styles.done)}>{todo.text}</span>

      {todo.category && <span className={styles.category}>{todo.category.name}</span>}

      {/* 空のまま送ると期限なしに戻る */}
      <form action={onChangeDueDate} className={styles.dueDateForm}>
        <input type="hidden" name="id" value={todo.id} />
        <DateInput
          name="dueDate"
          defaultValue={todo.dueDate ?? ""}
          aria-label={`${todo.text} の期限`}
          className={styles.dueDate}
        />
        <IconButton type="submit" aria-label="期限を更新">
          <CalendarCheck size={16} />
        </IconButton>
      </form>

      <form action={onDelete}>
        <input type="hidden" name="id" value={todo.id} />
        <IconButton type="submit" tone="danger" aria-label="削除">
          <Trash2 size={16} />
        </IconButton>
      </form>
    </li>
  );
}
