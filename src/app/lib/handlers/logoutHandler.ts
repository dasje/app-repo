// import { signOut } from "next-auth/react";

import { signOut } from "@/auth";

export const logoutHandler = async () => {
  await signOut({ redirectTo: "/apps", redirect: true });
};
