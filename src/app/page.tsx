import { cn } from "@/lib/utils";
import AuthButton from "@/components/ui/auth/AuthButton.server";
import { db } from "@/drizzle/db";
import { TaskTable } from "@/drizzle/schema";
import { and, asc, desc, eq } from "drizzle-orm";
import { Check, PlusCircle, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { auth } from "@/nextauth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  const user_id = session?.user?.id;
  if (!user_id) redirect("/auth/login");

  const data = await db
    .select()
    .from(TaskTable)
    .where(eq(TaskTable.user_id, user_id))
    .orderBy(asc(TaskTable.is_completed), desc(TaskTable.updated_at));

  async function postTask(formData: FormData) {
    "use server";
    const description = (formData.get("description") as string) || "";
    const user_id = (formData.get("user_id") as string) || "";
    await db.insert(TaskTable).values({ description, user_id });
    revalidatePath("/");
  }

  async function handleEdit(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const description = (formData.get("description") as string) || "";
    const user_id = (formData.get("user_id") as string) || "";
    await db
      .update(TaskTable)
      .set({ description, updated_at: new Date().toISOString() })
      .where(and(eq(TaskTable.id, id), eq(TaskTable.user_id, user_id)));
    revalidatePath("/");
  }

  async function handleComplete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const user_id = (formData.get("user_id") as string) || "";
    await db
      .update(TaskTable)
      .set({
        is_completed: !data.find((task) => task.id === id)?.is_completed,
        updated_at: new Date().toISOString(),
      })
      .where(and(eq(TaskTable.id, id), eq(TaskTable.user_id, user_id)));
    revalidatePath("/");
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const user_id = (formData.get("user_id") as string) || "";
    await db
      .delete(TaskTable)
      .where(and(eq(TaskTable.id, id), eq(TaskTable.user_id, user_id)));
    revalidatePath("/");
  }

  return (
    <main className="flex grow flex-col items-center justify-center gap-4 p-24">
      <h1 className="mb-6 text-5xl">Server Only</h1>
      <div className="min-w-[400px] rounded border border-red-600 p-4">
        <ul className="flex flex-col">
          {data.map((task) => (
            <li
              className="flex items-center gap-4 rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
              key={task.id}
            >
              <form action={handleComplete}>
                <input type="text" name="id" hidden readOnly value={task.id} />
                <input
                  type="text"
                  name="user_id"
                  hidden
                  readOnly
                  value={user_id}
                />
                <button className="group flex h-8 w-8 items-center justify-center rounded border border-slate-400 bg-white text-black hover:text-amber-500 dark:border-0">
                  <Check
                    className={cn(
                      !task.is_completed && "hidden",
                      "group-hover:block",
                    )}
                  />
                </button>
              </form>
              <form className="grow" action={handleEdit}>
                <input type="text" name="id" hidden readOnly value={task.id} />
                <input
                  type="text"
                  name="user_id"
                  hidden
                  readOnly
                  value={user_id}
                />
                <input
                  className="flex h-8 w-full min-w-0 items-center rounded border border-slate-400 bg-white px-2 text-black dark:border-0"
                  type="text"
                  name="description"
                  defaultValue={task.description}
                />
                <input type="submit" hidden />
              </form>

              <form action={handleDelete}>
                <input type="text" name="id" hidden readOnly value={task.id} />
                <input
                  type="text"
                  name="user_id"
                  hidden
                  readOnly
                  value={user_id}
                />
                <button className="flex h-8 w-8 items-center justify-center rounded bg-red-700 text-black hover:bg-red-500">
                  <Trash2 className="text-white" />
                </button>
              </form>
            </li>
          ))}
        </ul>

        <form
          className="mt-4 flex items-center gap-4 rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
          action={postTask}
        >
          <input
            className="flex h-8 min-w-0 grow items-center rounded border border-slate-400 bg-white px-2 text-black dark:border-0"
            type="text"
            name="description"
            autoFocus
          />
          <input type="text" name="user_id" hidden readOnly value={user_id} />
          <button className="flex h-8 min-w-0 items-center rounded bg-amber-500 px-4 text-black hover:bg-amber-400">
            <PlusCircle />
          </button>
        </form>
      </div>
      <Link className="underline" href="/another-page">
        Go to another page
      </Link>

      <AuthButton />
    </main>
  );
}
