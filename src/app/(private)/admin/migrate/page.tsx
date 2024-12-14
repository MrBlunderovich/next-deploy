import { requestMigration } from "@/drizzle/migrate";

export default async function MigratePage() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-4">
      <form className="flex w-[300px] flex-col gap-4" action={requestMigration}>
        <input
          className="rounded px-2 py-1 text-black"
          type="text"
          name="passphrase"
          autoFocus
        />
        <button className="rounded bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-500">
          Migrate
        </button>
      </form>
    </div>
  );
}
