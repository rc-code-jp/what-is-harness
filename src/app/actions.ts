"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function addTodo(formData: FormData) {
  const text = String(formData.get("text") ?? "").trim();
  if (!text) return;

  db.prepare("INSERT INTO todos (text) VALUES (?)").run(text);
  revalidatePath("/");
}

export async function toggleTodo(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  db.prepare("UPDATE todos SET done = 1 - done WHERE id = ?").run(id);
  revalidatePath("/");
}

export async function deleteTodo(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  db.prepare("DELETE FROM todos WHERE id = ?").run(id);
  revalidatePath("/");
}
