import { AddTodo } from "@/application/todo/add-todo";
import { DeleteTodo } from "@/application/todo/delete-todo";
import { ListTodos } from "@/application/todo/list-todos";
import { ToggleTodo } from "@/application/todo/toggle-todo";
import { UuidTodoIdGenerator } from "@/infrastructure/id/uuid-todo-id-generator";
import { getDb } from "@/infrastructure/persistence/sqlite/sqlite-connection";
import { SqliteTodoRepository } from "@/infrastructure/persistence/sqlite/sqlite-todo-repository";

// コンポジションルート。実装の選択と結線をここだけで行う。
// 差し替えたいときはこのファイルの右辺を変えるだけで済む。
const todoRepository = new SqliteTodoRepository(getDb());
const todoIdGenerator = new UuidTodoIdGenerator();

export const listTodos = new ListTodos(todoRepository);
export const addTodo = new AddTodo(todoRepository, todoIdGenerator);
export const toggleTodo = new ToggleTodo(todoRepository);
export const deleteTodo = new DeleteTodo(todoRepository);
