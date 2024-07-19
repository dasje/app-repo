import { TypeOf, number, object, string } from "zod";

export const addWatchlistSchema = object({
  watchlistName: string({ required_error: "Item name is required" }).min(
    1,
    "Item name is required"
  ),
  userEmail: string({ required_error: "Watchlist ID is required" }).min(
    1,
    "Watchlist ID is required"
  ),
});

export type NewWatchlist = TypeOf<typeof addWatchlistSchema>;

export const addWatchlistItemSchema = object({
  watchlistId: string({ required_error: "Watchlist ID is required" }).min(
    1,
    "Watchlist ID is required"
  ),
  mediaName: string({ required_error: "Media name is required" }).min(
    1,
    "Media name is required"
  ),
  userEmail: string({ required_error: "User email is required" }).min(
    1,
    "User email is required"
  ),
  year: string().optional(),
  rated: string().optional(),
  released: string().optional(),
  runtime: string().optional(),
  genre: string().optional(),
  director: string().optional(),
  writer: string().optional(),
  plot: string().optional(),
  language: string().optional(),
  country: string().optional(),
  awards: string().optional(),
  poster: string().optional(),
  imdbId: string().optional(),
});

export type WatchlistInput = TypeOf<typeof addWatchlistItemSchema>;

export const getUserWatchlists = object({
  userEmail: string({ required_error: "Watchlist ID is required" }).min(
    1,
    "User email is required"
  ),
});

export type UserWatchlists = TypeOf<typeof getUserWatchlists>;

export const getWatchlistContentSchema = object({
  watchlistId: string({ required_error: "Watchlist ID is required" }).min(
    1,
    "Watchlist ID is required"
  ),
});

export type WatchlistContent = TypeOf<typeof getWatchlistContentSchema>;

export const selectWatchlistItemSchema = object({
  watchlistItemId: string({
    required_error: "Watchlist item ID is required",
  }).min(1, "Watchlist item ID is required"),
  watchlistItemWatchStatus: number().optional(),
});

export type WatchlistItem = TypeOf<typeof selectWatchlistItemSchema>;

export const deleteWatchlistSchema = object({
  watchlistId: string({
    required_error: "Watchlist ID is required",
  }).min(1, "Watchlist ID is required"),
  userEmail: string({
    required_error: "User email is required",
  }).min(1, "User email is required"),
});

export type Watchlist = TypeOf<typeof deleteWatchlistSchema>;

export const addWatchlistFriendSchema = object({
  userEmail: string({
    required_error: "User email is required",
  }).min(1, "User email is required"),
  friendEmail: string({
    required_error: "Friend email is required",
  }).min(1, "Friend email is required"),
});

export type WatchlistFriend = TypeOf<typeof addWatchlistFriendSchema>;
