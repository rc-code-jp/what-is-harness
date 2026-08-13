import type { TodoDto } from "@/application/todo/todo-dto";
import type { FormAction } from "@/presentation/form-action";
import { TodoAddForm } from "../molecules/todo-add-form";
import { TodoList } from "../organisms/todo-list";
import styles from "./todo-page-template.module.css";

type Props = {
  todos: TodoDto[];
  onAdd: FormAction;
  onToggle: FormAction;
  onDelete: FormAction;
};

export function TodoPageTemplate({ todos, onAdd, onToggle, onDelete }: Props) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>TODO</h1>

      <TodoAddForm action={onAdd} />

      <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
    </main>
  );
}
