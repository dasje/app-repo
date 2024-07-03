/* eslint-disable react-hooks/exhaustive-deps */
"use server";
import { UserType, getUser } from "@/app/lib/handlers/getUser";
import { WatchlistContentTable } from "@/app/database/types";
import Watchlist from "./Watchlist";
import { watchlistResponse } from "../page";
import { watch } from "fs";

interface AvailableWatchlists {
  user: UserType;
  watchlists: watchlistResponse;
}
const AvailableWatchlists = ({ user, watchlists }: AvailableWatchlists) => {
  console.log("HERE ", watchlists);
  return (
    <>
      {watchlists &&
        watchlists.message.map((i, k) => (
          <Watchlist
            key={k}
            user={user}
            watchlistId={i.watchlist_id}
            watchlistName={i.name}
          />
        ))}
    </>
  );
};

export default AvailableWatchlists;
