import Link from "next/link";
import { classNames } from "@/presentation/class-names";
import styles from "./page-nav.module.css";

const LINKS = [
  { href: "/", label: "TODO" },
  { href: "/categories", label: "カテゴリー管理" },
];

type Props = {
  /** 表示中の画面の href */
  current: string;
};

export function PageNav({ current }: Props) {
  return (
    <nav className={styles.nav}>
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classNames(styles.link, link.href === current && styles.current)}
          aria-current={link.href === current ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
