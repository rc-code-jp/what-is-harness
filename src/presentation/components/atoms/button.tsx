import type { ComponentProps } from "react";
import { classNames } from "@/presentation/class-names";
import styles from "./button.module.css";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className, ...rest }: Props) {
  return <button className={classNames(styles.button, styles[variant], className)} {...rest} />;
}
