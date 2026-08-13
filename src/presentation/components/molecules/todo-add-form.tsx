import { Plus } from "lucide-react";
import type { CategoryDto } from "@/application/category/category-dto";
import type { FormAction } from "@/presentation/form-action";
import { Button } from "../atoms/button";
import { DateInput } from "../atoms/date-input";
import { Select } from "../atoms/select";
import { TextInput } from "../atoms/text-input";
import styles from "./todo-add-form.module.css";

type Props = {
  categories: CategoryDto[];
  action: FormAction;
};

export function TodoAddForm({ categories, action }: Props) {
  return (
    <form action={action} className={styles.form}>
      <TextInput
        name="text"
        placeholder="やることを入力"
        aria-label="やることを入力"
        className={styles.input}
      />
      <Select name="categoryId" aria-label="カテゴリーを選択" defaultValue="">
        <option value="">未分類</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <DateInput name="dueDate" aria-label="期限を指定" />
      <Button type="submit">
        <Plus size={18} aria-hidden />
        追加
      </Button>
    </form>
  );
}
