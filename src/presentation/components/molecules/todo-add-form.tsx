import { Plus } from "lucide-react";
import type { FormAction } from "@/presentation/form-action";
import { Button } from "../atoms/button";
import { TextInput } from "../atoms/text-input";
import styles from "./todo-add-form.module.css";

type Props = {
  action: FormAction;
};

export function TodoAddForm({ action }: Props) {
  return (
    <form action={action} className={styles.form}>
      <TextInput
        name="text"
        placeholder="やることを入力"
        aria-label="やることを入力"
        className={styles.input}
      />
      <Button type="submit">
        <Plus size={18} aria-hidden />
        追加
      </Button>
    </form>
  );
}
