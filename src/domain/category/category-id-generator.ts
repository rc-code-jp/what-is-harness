import type { CategoryId } from "./category-id";

/**
 * ID の採番手段。ドメインが crypto や DB の採番機能に依存しないよう、
 * インターフェースだけをここに置き実装は infrastructure 層に置く。
 */
export interface CategoryIdGenerator {
  next(): CategoryId;
}
