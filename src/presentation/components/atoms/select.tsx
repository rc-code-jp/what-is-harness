import type { ComponentProps } from "react";
import { classNames } from "@/presentation/class-names";
import styles from "./select.module.css";

type Props = ComponentProps<"select">;

// 選択肢は children で受け取り、何を並べるかは molecules 側に任せる
export function Select({ className, ...rest }: Props) {
  return <select className={classNames(styles.select, className)} {...rest} />;
}
