import type { ComponentProps } from "react";
import { classNames } from "@/presentation/class-names";
import styles from "./text-input.module.css";

type Props = Omit<ComponentProps<"input">, "type">;

export function TextInput({ className, ...rest }: Props) {
  return <input type="text" className={classNames(styles.input, className)} {...rest} />;
}
