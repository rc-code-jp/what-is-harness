import type { Category } from "@/domain/category/category";

/**
 * presentation 層に渡す平坦な型。
 * エンティティを UI に直接渡さないことで、UI がドメインの内部構造に依存しなくなる。
 */
export type CategoryDto = {
  id: string;
  name: string;
};

export function toCategoryDto(category: Category): CategoryDto {
  return {
    id: category.id.value,
    name: category.name.value,
  };
}
