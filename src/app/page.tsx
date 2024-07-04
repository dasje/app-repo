"use server";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  return (
    <div>
      {!user && (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          Landing page content. Sign up to access apps.
        </div>
      )}
      {user && (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          Click on Home to see apps.
        </div>
      )}
    </div>
  );
}
