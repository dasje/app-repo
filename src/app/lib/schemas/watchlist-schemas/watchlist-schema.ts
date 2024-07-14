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
  year: string({ required_error: "Year is required" }).min(
    1,
    "Yeare is required"
  ),
  rated: string({ required_error: "Rating is required" }).min(
    1,
    "Rating is required"
  ),
  released: string({ required_error: "Release date is required" }).min(
    1,
    "Release date is required"
  ),
  runtime: string({ required_error: "Runtime is required" }).min(
    1,
    "Runtime is required"
  ),
  genre: string({ required_error: "Genre is required" }).min(
    1,
    "Genre is required"
  ),
  director: string({ required_error: "Director data is required" }).min(
    1,
    "Director data is required"
  ),
  writer: string({ required_error: "Writer data is required" }).min(
    1,
    "Writer data is required"
  ),
  plot: string({ required_error: "Plot description is required" }).min(
    1,
    "Plot description is required"
  ),
  language: string({ required_error: "Language is required" }).min(
    1,
    "Language is required"
  ),
  country: string({ required_error: "Country is required" }).min(
    1,
    "Country is required"
  ),
  awards: string({ required_error: "Awards data is required" }).min(
    1,
    "Awards data is required"
  ),
  poster: string({ required_error: "Poster URL is required" }).min(
    1,
    "Poster URL is required"
  ),
  imdbId: string({ required_error: "IMDB ID is required" }).min(
    1,
    "IMDB ID is required"
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
