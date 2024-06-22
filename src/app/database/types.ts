import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  users: UserTable;
}

export interface UserTable {
  id: Generated<number>;
  email: string;
  password: string;
  created_at: ColumnType<Date, string | undefined, never>;
  login_at: ColumnType<Date, string | undefined, never>;
  ip: string | null;
}
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;
