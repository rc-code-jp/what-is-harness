import type { ComponentProps } from "react";
import { classNames } from "@/presentation/class-names";
import styles from "./date-input.module.css";

type Props = Omit<ComponentProps<"input">, "type">;

export function DateInput({ className, ...rest }: Props) {
  return <input type="date" className={classNames(styles.input, className)} {...rest} />;
}
