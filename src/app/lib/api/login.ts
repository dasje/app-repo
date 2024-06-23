"use server";

import {
  createUser,
  findUser,
} from "@/app/database/repositories/UserRepository";
import { User } from "@/app/database/types";
import {
  encryptPassword,
  verifyPassword,
} from "../auth/passwordAuthentication";

export async function login(email: string, password: string) {
  console.log("Login");
  const user = await findUser({ email: email });
  if (user.length > 0 && verifyPassword(user[0].password, password)) {
    return { message: "user_exists", data: user };
  }
  return { message: "wrong_credentials" };
}
