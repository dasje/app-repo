import { TypeOf, number, object, string } from "zod";

export const createUserSchema = object({
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name is required"
  ),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  photo: string().optional(),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string({
    required_error: "Please confirm your password",
  })
    .min(1, "Please confirm your password")
    .optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export const loginUserSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email or password"),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password is required"
  ),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;

export const newFriendConnectionSchema = object({
  userEmail: string({ required_error: "User email is required" }).min(
    1,
    "User email is required"
  ),
  friendEmail: string({ required_error: "Friend email is required" }).min(
    1,
    "Friend email is required"
  ),
  inviteCode: string({ required_error: "Invite code is required" }).min(
    1,
    "Invite code is required"
  ),
});

export type NewFriendInput = TypeOf<typeof newFriendConnectionSchema>;

export const updateFriendConnectionSchema = object({
  userEmail: string({ required_error: "User email is required" })
    .min(1, "User email is required")
    .optional(),
  friendEmail: string({ required_error: "Friend email is required" })
    .min(1, "Friend email is required")
    .optional(),
  inviteCode: string({ required_error: "Invite code is required" })
    .min(1, "Invite code is required")
    .optional(),
  inviteDate: string({ required_error: "Invite date is required" })
    .min(1, "Invite date is required")
    .optional(),
  connectionDate: string({ required_error: "Connection date is required" })
    .min(1, "Connection date is required")
    .optional(),
  connected: number({
    required_error: "Connected value is required",
  }).optional(),
});

export type UpdateFriendInput = TypeOf<typeof updateFriendConnectionSchema>;

export const inviteFriendSchema = object({
  userEmail: string({ required_error: "User email is required" })
    .min(1, "User email is required")
    .optional(),
  friendEmail: string({ required_error: "Friend email is required" })
    .min(1, "Friend email is required")
    .optional(),
});

export type InviteFriend = TypeOf<typeof inviteFriendSchema>;
