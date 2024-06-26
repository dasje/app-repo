"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      {!user && redirect("/login")}
      <div className="m-6 rounded bg-white flex flex-grow justify-center">
        Watchlist
      </div>
    </>
  );
}
