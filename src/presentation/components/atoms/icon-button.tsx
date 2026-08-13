import type { ComponentProps } from "react";
import { classNames } from "@/presentation/class-names";
import styles from "./icon-button.module.css";

type Props = ComponentProps<"button"> & {
  tone?: "default" | "danger";
};

// アイコン自体は children で受け取り、アイコンライブラリへの依存を atoms に持ち込まない
export function IconButton({ tone = "default", className, ...rest }: Props) {
  return <button className={classNames(styles.button, styles[tone], className)} {...rest} />;
}
