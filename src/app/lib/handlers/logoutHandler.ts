import { signOut } from "next-auth/react";

export const logoutHandler = async () => {
  await signOut();
};
