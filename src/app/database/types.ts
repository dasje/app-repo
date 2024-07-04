import {
  ColumnType,
  Generated,
  GeneratedAlways,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";
import { Database } from "@auth/kysely-adapter";

export interface DB extends Database {
  User: UserTable;
  //   Account: AccountTable;
  //   Session: SessionTable;
  //   VerificationToken: VerificationTokenTable;
  app_access: AppAccessTable;
  apps: AppTable;
  watchlist_lists: WatchlistListsTable;
  watchlist_content: WatchlistContentTable;
  watchlist_user_map: WatchlistUserMapTable;
}

export interface UserTable {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  hashedPassword: string;
  image: string | null;
}
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

export interface AccountTable {
  id: string;
  userId: string;
  type: string | null;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: Lowercase<string> | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}
export type Account = Selectable<AccountTable>;
export type NewAccount = Insertable<AccountTable>;
export type UpdateAccount = Updateable<AccountTable>;

export interface SessionTable {
  id: string;
  userId: string;
  sessionToken: string;
}
export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type UpdateSession = Updateable<SessionTable>;

export interface VerificationTokenTable {
  identifier: string;
  token: string;
  expires: Date;
}
export type VerificationToken = Selectable<VerificationTokenTable>;
export type NewVerificationToken = Insertable<VerificationTokenTable>;
export type UpdateVerificationToken = Updateable<VerificationTokenTable>;

export interface AppAccessTable {
  id: string;
  user_id: string;
  app_id: string;
}
export type AppAccess = Selectable<AppAccessTable>;
export type NewAppAccess = Insertable<AppAccessTable>;
export type UpdateAppAccess = Updateable<AppAccessTable>;

export interface AppTable {
  id: string;
  app_name: string;
  app_prefix: string;
  byline: string;
  short_description: string;
  long_description: string;
  remote_image_address: string;
  version: string;
  mobile: number;
  offline: number;
}
export type App = Selectable<AppTable>;
export type NewApp = Insertable<AppTable>;
export type UpdateApp = Updateable<AppTable>;

export interface WatchlistListsTable {
  id: string;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
  created_by: string;
}
export type WatchlistLists = Selectable<WatchlistListsTable>;
export type NewWatchlistLists = Insertable<WatchlistListsTable>;
export type UpdateWatchlistLists = Updateable<WatchlistListsTable>;

export interface WatchlistContentTable {
  id: string;
  watchlist_id: string;
  watched: number;
  media_name: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  imdb_id: string;
}

export type WatchlistContent = Selectable<WatchlistContentTable>;
export type NewWatchlistContent = Insertable<WatchlistContentTable>;
export type UpdateWatchlistContent = Updateable<WatchlistContentTable>;

export interface WatchlistUserMapTable {
  id: string;
  watchlist_id: string;
  user_id: string;
}
export type WatchlistUserMap = Selectable<WatchlistUserMapTable>;
export type NewWatchlistUserMap = Insertable<WatchlistUserMapTable>;
export type UpdateWatchlistUserMap = Updateable<WatchlistUserMapTable>;
