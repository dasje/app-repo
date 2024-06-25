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
  app_access: AppAccessTable;
  apps: AppTable;
  watchlist_lists: WatchlistListsTable;
  watchlist_content: WatchlistContentTable;
  watchlist_user_map: WatchlistUserMapTable;
}

export interface UserTable {
  id: Generated<number>;
  email: string;
  password: string;
  created_at: ColumnType<Date, string | undefined>;
  login_at: ColumnType<Date, string | undefined>;
  ip: string | null;
}
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

export interface AppAccessTable {
  id: Generated<number>;
  user_id: number;
  app_id: number;
}
export type AppAccess = Selectable<AppAccessTable>;
export type NewAppAccess = Insertable<AppAccessTable>;
export type UpdateAppAccess = Updateable<AppAccessTable>;

export interface AppTable {
  id: Generated<number>;
  app_name: string;
  version: string;
  mobile: boolean;
  offline: boolean;
}
export type App = Selectable<AppTable>;
export type NewApp = Insertable<AppTable>;
export type UpdateApp = Updateable<AppTable>;

export interface WatchlistListsTable {
  id: Generated<number>;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
  created_by: number;
}
export type WatchlistLists = Selectable<WatchlistListsTable>;
export type NewWatchlistLists = Insertable<WatchlistListsTable>;
export type UpdateWatchlistLists = Updateable<WatchlistListsTable>;

export interface WatchlistContentTable {
  id: Generated<number>;
  watchlist_list_id: number;
  media_name: string;
  watched: boolean;
}

export type WatchlistContent = Selectable<WatchlistContentTable>;
export type NewWatchlistContent = Insertable<WatchlistContentTable>;
export type UpdateWatchlistContent = Updateable<WatchlistContentTable>;

export interface WatchlistUserMapTable {
  id: Generated<number>;
  watchlist_list_id: number;
  user_id: number;
}
export type WatchlistUserMap = Selectable<WatchlistUserMapTable>;
export type NewWatchlistUserMap = Insertable<WatchlistUserMapTable>;
export type UpdateWatchlistUserMap = Updateable<WatchlistUserMapTable>;
