import { TypeOf, boolean, object, string } from "zod";

export const queryAvailableAppsSchema = object({
  id: string(),
  app_name: string(),
  version: string(),
  app_prefix: string(),
  mobile: boolean().optional(),
  offline: boolean().optional(),
});

export type AvailableAppsType = TypeOf<typeof queryAvailableAppsSchema>;

export const userEmailSchema = object({
  userEmail: string(),
});

export type UserEmailType = TypeOf<typeof userEmailSchema>;
