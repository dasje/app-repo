import { TypeOf, boolean, object, string } from "zod";

export const addUserAppSchema = object({
  userEmail: string(),
  appId: string(),
});

export type AddUserAppType = TypeOf<typeof addUserAppSchema>;
