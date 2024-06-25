"use server";

import {
  createUser,
  findUser,
} from "@/app/database/repositories/UserRepository";
import { User } from "@/app/database/types";
import { encryptPassword } from "../auth/passwordAuthentication";

export async function signUp(email: string, password: string) {
  console.log("Signup");
  const user = await findUser({ email: email });
  if (user.length > 0) {
    return { message: "user_exists" };
  }
  const hashedPassword = encryptPassword(password);
  const newUser = await createUser({ email: email, password: hashedPassword });
  const res = { message: "user_added", data: newUser };
}
