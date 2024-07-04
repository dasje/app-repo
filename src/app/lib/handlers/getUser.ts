"use server";
import { auth } from "@/auth";

export type UserType = { name?: string; email?: string };

export const getUser = async () => {
  const session = await auth();
  const user: UserType = session?.user;
  console.log("session", session);
  console.log("HERE HERE", process.env.REACT_APP_DB_USER);
  return user;
};
