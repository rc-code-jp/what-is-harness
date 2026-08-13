import type { CategoryRepository } from "@/domain/category/category-repository";
import { toCategoryDto, type CategoryDto } from "./category-dto";

export class ListCategories {
  constructor(private readonly categories: CategoryRepository) {}

  async execute(): Promise<CategoryDto[]> {
    const categories = await this.categories.findAll();
    return categories.map(toCategoryDto);
  }
}
