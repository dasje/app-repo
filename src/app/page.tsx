"use server";
import { auth } from "@/auth";
import { Features } from "./components/Features";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      {!user && (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          <Features />
        </div>
      )}
      {user && redirect("/apps")}
    </div>
  );
}
