import { listCategories } from "@/di/container";
import { CategoryPageTemplate } from "@/presentation/components/templates/category-page-template";
import { addCategoryAction, deleteCategoryAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function Categories() {
  const categories = await listCategories.execute();

  return (
    <CategoryPageTemplate
      categories={categories}
      onAdd={addCategoryAction}
      onDelete={deleteCategoryAction}
    />
  );
}
