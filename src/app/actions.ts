"use server";

import { revalidatePath } from "next/cache";
import {
  addCategory,
  addTodo,
  deleteCategory,
  deleteTodo,
  toggleTodo,
} from "@/di/container";
import { DomainError } from "@/domain/todo/errors";

export async function addTodoAction(formData: FormData) {
  await run(() =>
    addTodo.execute(
      String(formData.get("text") ?? ""),
      String(formData.get("categoryId") ?? ""),
    ),
  );
}

export async function toggleTodoAction(formData: FormData) {
  await run(() => toggleTodo.execute(String(formData.get("id") ?? "")));
}

export async function deleteTodoAction(formData: FormData) {
  await run(() => deleteTodo.execute(String(formData.get("id") ?? "")));
}

export async function addCategoryAction(formData: FormData) {
  await run(() => addCategory.execute(String(formData.get("name") ?? "")));
}

export async function deleteCategoryAction(formData: FormData) {
  await run(() => deleteCategory.execute(String(formData.get("id") ?? "")));
}

/**
 * ユースケースを実行し、成功したら一覧を再検証する。
 * ドメインのルール違反（空入力など）は現状どおり黙って無視する。
 */
async function run(useCase: () => Promise<void>) {
  try {
    await useCase();
  } catch (error) {
    if (error instanceof DomainError) return;
    throw error;
  }

  revalidatePath("/");
}
