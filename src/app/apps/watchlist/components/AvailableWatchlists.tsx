/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { UserType } from "@/app/lib/handlers/getUser";
import Watchlist from "./Watchlist";
import { useEffect, useState } from "react";

interface AvailableWatchlists {
  currentUser: UserType;
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

const AvailableWatchlists = ({ currentUser }: AvailableWatchlists) => {
  const [watchlists, setWatchlists] = useState<watchlistResponse>();
  const [user, setUser] = useState<UserType>(currentUser);
  const [deleteWatchlist, setDeleteWatchlist] = useState<boolean | string>(
    false
  );

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

  useEffect(() => {
    const deleteList = async () => {
      await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/watchlist/remove-watchlists",
        {
          method: "POST",
          body: JSON.stringify({
            userEmail: user.email,
            watchlistId: deleteWatchlist,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.status === 403) {
          // TODO: handle user permission error
        } else if (res.status === 200) {
          setDeleteWatchlist(false);
          setUser(user);
        }
      });
    };
    typeof deleteWatchlist === "string" && deleteList();
  }, [deleteWatchlist]);

  const triggerDeleteWatchlist = (watchlistId: string) => {
    setDeleteWatchlist(watchlistId);
  };

  return (
    <>
      {watchlists &&
        watchlists.message.map((i, k) => (
          <Watchlist
            key={k}
            user={user}
            watchlistId={i.watchlist_id}
            watchlistName={i.name}
            deleteWatchlist={triggerDeleteWatchlist}
          />
        ))}
    </>
  );
};

export default AvailableWatchlists;
