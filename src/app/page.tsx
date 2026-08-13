import { listCategories, listTodos } from "@/di/container";
import { TodoPageTemplate } from "@/presentation/components/templates/todo-page-template";
import {
  addCategoryAction,
  addTodoAction,
  deleteCategoryAction,
  deleteTodoAction,
  toggleTodoAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const todos = await listTodos.execute();
  const categories = await listCategories.execute();

  return (
    <TodoPageTemplate
      todos={todos}
      categories={categories}
      onAdd={addTodoAction}
      onToggle={toggleTodoAction}
      onDelete={deleteTodoAction}
      onAddCategory={addCategoryAction}
      onDeleteCategory={deleteCategoryAction}
    />
  );
}
