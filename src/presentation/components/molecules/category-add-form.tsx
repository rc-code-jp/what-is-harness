import { Plus } from "lucide-react";
import type { FormAction } from "@/presentation/form-action";
import { Button } from "../atoms/button";
import { TextInput } from "../atoms/text-input";
import styles from "./category-add-form.module.css";

type Props = {
  action: FormAction;
};

export function CategoryAddForm({ action }: Props) {
  return (
    <form action={action} className={styles.form}>
      <TextInput
        name="name"
        placeholder="カテゴリー名を入力"
        aria-label="カテゴリー名を入力"
        className={styles.input}
      />
      <Button type="submit">
        <Plus size={18} aria-hidden />
        追加
      </Button>
    </form>
  );
}
