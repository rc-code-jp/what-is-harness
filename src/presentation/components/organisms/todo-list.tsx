import type { TodoDto } from "@/application/todo/todo-dto";
import type { FormAction } from "@/presentation/form-action";
import { TodoItem } from "../molecules/todo-item";
import styles from "./todo-list.module.css";

type Props = {
  todos: TodoDto[];
  onToggle: FormAction;
  onDelete: FormAction;
  onChangeDueDate: FormAction;
};

export function TodoList({ todos, onToggle, onDelete, onChangeDueDate }: Props) {
  if (todos.length === 0) {
    return <p className={styles.empty}>まだ何もありません</p>;
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onChangeDueDate={onChangeDueDate}
        />
      ))}
    </ul>
  );
}
