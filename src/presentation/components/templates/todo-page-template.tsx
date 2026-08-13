import type { CategoryDto } from "@/application/category/category-dto";
import type { TodoDto } from "@/application/todo/todo-dto";
import type { FormAction } from "@/presentation/form-action";
import { CategoryAddForm } from "../molecules/category-add-form";
import { TodoAddForm } from "../molecules/todo-add-form";
import { CategoryList } from "../organisms/category-list";
import { TodoList } from "../organisms/todo-list";
import styles from "./todo-page-template.module.css";

type Props = {
  todos: TodoDto[];
  categories: CategoryDto[];
  onAdd: FormAction;
  onToggle: FormAction;
  onDelete: FormAction;
  onAddCategory: FormAction;
  onDeleteCategory: FormAction;
};

export function TodoPageTemplate({
  todos,
  categories,
  onAdd,
  onToggle,
  onDelete,
  onAddCategory,
  onDeleteCategory,
}: Props) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>TODO</h1>

      <TodoAddForm categories={categories} action={onAdd} />

      <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />

      <section className={styles.section}>
        <h2 className={styles.subtitle}>カテゴリー</h2>

        <CategoryAddForm action={onAddCategory} />

        <CategoryList categories={categories} onDelete={onDeleteCategory} />
      </section>
    </main>
  );
}
