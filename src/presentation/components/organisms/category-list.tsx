import type { CategoryDto } from "@/application/category/category-dto";
import type { FormAction } from "@/presentation/form-action";
import { CategoryItem } from "../molecules/category-item";
import styles from "./category-list.module.css";

type Props = {
  categories: CategoryDto[];
  onDelete: FormAction;
};

export function CategoryList({ categories, onDelete }: Props) {
  if (categories.length === 0) {
    return <p className={styles.empty}>カテゴリーがありません</p>;
  }

  return (
    <ul className={styles.list}>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} onDelete={onDelete} />
      ))}
    </ul>
  );
}
