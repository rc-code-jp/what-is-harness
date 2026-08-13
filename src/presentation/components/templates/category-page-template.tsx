import type { CategoryDto } from "@/application/category/category-dto";
import type { FormAction } from "@/presentation/form-action";
import { CategoryAddForm } from "../molecules/category-add-form";
import { PageNav } from "../molecules/page-nav";
import { CategoryList } from "../organisms/category-list";
import styles from "./category-page-template.module.css";

type Props = {
  categories: CategoryDto[];
  onAdd: FormAction;
  onDelete: FormAction;
};

export function CategoryPageTemplate({ categories, onAdd, onDelete }: Props) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>カテゴリー管理</h1>

      <PageNav current="/categories" />

      <CategoryAddForm action={onAdd} />

      <CategoryList categories={categories} onDelete={onDelete} />
    </main>
  );
}
