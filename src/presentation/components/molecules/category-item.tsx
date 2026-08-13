import { Trash2 } from "lucide-react";
import type { CategoryDto } from "@/application/category/category-dto";
import type { FormAction } from "@/presentation/form-action";
import { IconButton } from "../atoms/icon-button";
import styles from "./category-item.module.css";

type Props = {
  category: CategoryDto;
  onDelete: FormAction;
};

export function CategoryItem({ category, onDelete }: Props) {
  return (
    <li className={styles.item}>
      <span className={styles.name}>{category.name}</span>

      <form action={onDelete}>
        <input type="hidden" name="id" value={category.id} />
        <IconButton type="submit" tone="danger" aria-label="削除">
          <Trash2 size={16} />
        </IconButton>
      </form>
    </li>
  );
}
