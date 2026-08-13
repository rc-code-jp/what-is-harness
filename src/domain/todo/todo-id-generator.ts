import type { TodoId } from "./todo-id";

/**
 * ID の採番手段。ドメインが crypto や DB の採番機能に依存しないよう、
 * インターフェースだけをここに置き実装は infrastructure 層に置く。
 */
export interface TodoIdGenerator {
  next(): TodoId;
}
