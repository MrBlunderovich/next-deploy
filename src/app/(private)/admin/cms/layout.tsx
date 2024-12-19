import Link from "next/link";
import { PropsWithChildren } from "react";

export default function CmsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex grow">
      <aside className="basis-80 border-r-2 border-red-800 px-4 py-8">
        <ul className="flex flex-col gap-1">
          <MenuItem href="./cms/homepage">Homepage</MenuItem>
          <MenuItem href="./cms/homepage">Homepage</MenuItem>
          <MenuItem href="./cms/homepage">Homepage</MenuItem>
          <MenuItem href="./cms/homepage">Homepage</MenuItem>
          <MenuItem href="./cms/homepage">Homepage</MenuItem>
          <MenuItem href="./cms/homepage">Homepage</MenuItem>
          <MenuItem href="./cms/homepage">Homepage</MenuItem>
          <MenuItem href="./cms/homepage">Homepage</MenuItem>
        </ul>
      </aside>
      <main className="flex grow flex-col gap-4 px-4 py-8">{children}</main>
    </div>
  );
}

function MenuItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link className="block w-full p-2 px-2 hover:bg-red-800" href={href}>
        {children}
      </Link>
    </li>
  );
}
