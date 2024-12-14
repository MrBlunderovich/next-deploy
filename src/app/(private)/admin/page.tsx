import { db } from "@/drizzle/db";
import { TaskTable, UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function AdminDasboardPage() {
  const userList = await db.select().from(UserTable);
  const taskLIst = await db
    .select({
      task: TaskTable.description,
      userName: UserTable.name,
    })
    .from(TaskTable)
    .innerJoin(UserTable, eq(TaskTable.user_id, UserTable.id));

  return (
    <div className="grow py-4">
      <h1 className="h1">Admin dashboard</h1>
      <pre className="text-[8px] text-green-300">
        {JSON.stringify(userList, null, 2)}
      </pre>
      <pre className="text-[8px] text-blue-300">
        {JSON.stringify(taskLIst, null, 2)}
      </pre>
    </div>
  );
}
