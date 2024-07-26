export type watchlistType = {
  id: string;
  watchlist_id: string;
  user_id: string;
  name: string;
  created_at: string;
  created_by: string;
  role: "owner" | "friend";
};

export type watchlistResponse = watchlistType[];
