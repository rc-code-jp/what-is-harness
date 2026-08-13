import { listTodos } from "@/di/container";
import { TodoPageTemplate } from "@/presentation/components/templates/todo-page-template";
import { addTodoAction, deleteTodoAction, toggleTodoAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const todos = await listTodos.execute();

  return (
    <TodoPageTemplate
      todos={todos}
      onAdd={addTodoAction}
      onToggle={toggleTodoAction}
      onDelete={deleteTodoAction}
    />
  );
}
