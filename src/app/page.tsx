import { Plus, Square, SquareCheckBig, Trash2 } from "lucide-react";
import { db, type Todo } from "@/lib/db";
import { addTodo, toggleTodo, deleteTodo } from "./actions";

export const dynamic = "force-dynamic";

export default function Home() {
  const todos = db
    .prepare("SELECT id, text, done FROM todos ORDER BY id")
    .all() as unknown as Todo[];

  return (
    <main>
      <h1>TODO</h1>

      <form action={addTodo} className="add">
        <input name="text" placeholder="やることを入力" aria-label="やることを入力" />
        <button type="submit">
          <Plus size={18} aria-hidden />
          追加
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <form action={toggleTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit" className="check" aria-label="完了を切り替え">
                {todo.done ? <SquareCheckBig size={18} /> : <Square size={18} />}
              </button>
            </form>

            <span className={todo.done ? "done" : undefined}>{todo.text}</span>

            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit" className="delete" aria-label="削除">
                <Trash2 size={16} />
              </button>
            </form>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p className="empty">まだ何もありません</p>}
    </main>
  );
}
