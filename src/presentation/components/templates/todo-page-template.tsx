import type { CategoryDto } from "@/application/category/category-dto";
import type { TodoDto } from "@/application/todo/todo-dto";
import type { FormAction } from "@/presentation/form-action";
import { PageNav } from "../molecules/page-nav";
import { TodoAddForm } from "../molecules/todo-add-form";
import { TodoCalendar } from "../organisms/todo-calendar";
import { TodoList } from "../organisms/todo-list";
import styles from "./todo-page-template.module.css";

type Props = {
  todos: TodoDto[];
  categories: CategoryDto[];
  /** カレンダーに表示する月。YYYY-MM */
  month: string;
  /** 今日。YYYY-MM-DD */
  today: string;
  onAdd: FormAction;
  onToggle: FormAction;
  onDelete: FormAction;
  onChangeDueDate: FormAction;
};

export function TodoPageTemplate({
  todos,
  categories,
  month,
  today,
  onAdd,
  onToggle,
  onDelete,
  onChangeDueDate,
}: Props) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>TODO</h1>

      <PageNav current="/" />

      <TodoAddForm categories={categories} action={onAdd} />

      <TodoList
        todos={todos}
        onToggle={onToggle}
        onDelete={onDelete}
        onChangeDueDate={onChangeDueDate}
      />

      <div className={styles.section}>
        <TodoCalendar todos={todos} month={month} today={today} />
      </div>
    </main>
  );
}
