import { AddCategory } from "@/application/category/add-category";
import { DeleteCategory } from "@/application/category/delete-category";
import { ListCategories } from "@/application/category/list-categories";
import { AddTodo } from "@/application/todo/add-todo";
import { ChangeTodoDueDate } from "@/application/todo/change-todo-due-date";
import { DeleteTodo } from "@/application/todo/delete-todo";
import { ListTodos } from "@/application/todo/list-todos";
import { ToggleTodo } from "@/application/todo/toggle-todo";
import { UuidCategoryIdGenerator } from "@/infrastructure/id/uuid-category-id-generator";
import { UuidTodoIdGenerator } from "@/infrastructure/id/uuid-todo-id-generator";
import { getDb } from "@/infrastructure/persistence/sqlite/sqlite-connection";
import { SqliteCategoryRepository } from "@/infrastructure/persistence/sqlite/sqlite-category-repository";
import { SqliteTodoRepository } from "@/infrastructure/persistence/sqlite/sqlite-todo-repository";

// コンポジションルート。実装の選択と結線をここだけで行う。
// 差し替えたいときはこのファイルの右辺を変えるだけで済む。
const db = getDb();
const todoRepository = new SqliteTodoRepository(db);
const categoryRepository = new SqliteCategoryRepository(db);
const todoIdGenerator = new UuidTodoIdGenerator();
const categoryIdGenerator = new UuidCategoryIdGenerator();

export const listTodos = new ListTodos(todoRepository, categoryRepository);
export const addTodo = new AddTodo(todoRepository, categoryRepository, todoIdGenerator);
export const toggleTodo = new ToggleTodo(todoRepository);
export const deleteTodo = new DeleteTodo(todoRepository);
export const changeTodoDueDate = new ChangeTodoDueDate(todoRepository);

export const listCategories = new ListCategories(categoryRepository);
export const addCategory = new AddCategory(categoryRepository, categoryIdGenerator);
export const deleteCategory = new DeleteCategory(categoryRepository, todoRepository);
