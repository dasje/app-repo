/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { UserType, getUser } from "@/app/lib/handlers/getUser";
import { WatchlistContentTable } from "@/app/database/types";
import Watchlist from "./Watchlist";
import { watchlistResponse } from "../page";
import { watch } from "fs";
import { useEffect, useState } from "react";

interface AvailableWatchlists {
  user: UserType;
}

export type watchlistResponse = {
  message: {
    id: string;
    watchlist_id: string;
    user_id: string;
    name: string;
    created_at: string;
    created_by: string;
  }[];
};

const AvailableWatchlists = ({ user }: AvailableWatchlists) => {
  const [watchlists, setWatchlists] = useState<watchlistResponse>();

  useEffect(() => {
    const getWatchlists = async () => {
      var userLists: watchlistResponse;
      user &&
        (await fetch(
          process.env.NEXT_PUBLIC_URL + "/api/watchlist/user-watchlists",
          {
            method: "POST",
            body: JSON.stringify({ userEmail: user.email }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(async (res) => {
          if (res.status !== 200) {
            console.log("Error caught");
            userLists = { message: [] };
          } else {
            userLists = await res.json();
            console.log("Success fetching user lists", userLists);
            setWatchlists(userLists);
          }
        }));
    };
    getWatchlists();
  }, [user]);

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
