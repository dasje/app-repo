"use server";
import { auth } from "@/auth";

export type UserType = { name?: string; email?: string };

export const getUser = async () => {
  const session = await auth();
  const user: UserType = session?.user;
  console.log("session", session);
  return user;
};
