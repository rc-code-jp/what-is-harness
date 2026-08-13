import { listCategories, listTodos } from "@/di/container";
import { todayDate, toMonth } from "@/presentation/calendar";
import { TodoPageTemplate } from "@/presentation/components/templates/todo-page-template";
import {
  addTodoAction,
  changeTodoDueDateAction,
  deleteTodoAction,
  toggleTodoAction,
} from "./actions";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ month?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const todos = await listTodos.execute();
  const categories = await listCategories.execute();
  const today = todayDate();
  const { month } = await searchParams;

  return (
    <TodoPageTemplate
      todos={todos}
      categories={categories}
      month={toMonth(month, today)}
      today={today}
      onAdd={addTodoAction}
      onToggle={toggleTodoAction}
      onDelete={deleteTodoAction}
      onChangeDueDate={changeTodoDueDateAction}
    />
  );
}
