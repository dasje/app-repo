import { TypeOf, object, string } from "zod";

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
  itemName: string({ required_error: "Item name is required" }).min(
    1,
    "Item name is required"
  ),
  watchlistId: string({ required_error: "Watchlist ID is required" }).min(
    1,
    "Watchlist ID is required"
  ),
  mediaName: string({ required_error: "Media name is required" }).min(
    1,
    "Media name is required"
  ),
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

export const removeWatchlistItemSchema = object({
  watchlistItemId: string({
    required_error: "Watchlist item ID is required",
  }).min(1, "Watchlist item ID is required"),
});

export type WatchlistItem = TypeOf<typeof removeWatchlistItemSchema>;
