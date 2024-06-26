"use server";
import { auth, signOut } from "@/auth";

import AppDashboard from "./components/layoutComponents/AppDashboard";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      {user && <AppDashboard />}
      {!user && (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          Landing page content. Sign up to access apps.
        </div>
      )}
    </>
  );
}
