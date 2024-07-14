/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { UserType } from "@/app/lib/handlers/getUser";
import Watchlist from "./Watchlist";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/app/lib/handlers/swrFetcher";
import Loading from "../../loading";

interface AvailableWatchlists {
  currentUser: UserType;
}

export type watchlistResponse = {
  id: string;
  watchlist_id: string;
  user_id: string;
  name: string;
  created_at: string;
  created_by: string;
  role: "owner" | "friend";
}[];

const AvailableWatchlists = ({ currentUser }: AvailableWatchlists) => {
  const [watchlists, setWatchlists] = useState<watchlistResponse>();
  const [deleteWatchlist, setDeleteWatchlist] = useState<boolean | string>(
    false
  );

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/watchlist/user-watchlists/${currentUser.email}`,
    fetcher,
    { refreshInterval: 500 }
  );

  useEffect(() => {
    data && setWatchlists(data["message"]);
  }, [data]);

  useEffect(() => {
    const deleteList = async () => {
      await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/watchlist/remove-watchlist",
        {
          method: "POST",
          body: JSON.stringify({
            userEmail: currentUser.email,
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
      {isLoading && <Loading />}
      {error && <div>{error}</div>}
      {watchlists &&
        watchlists.map((i, k) => (
          <Watchlist
            key={k}
            user={currentUser}
            watchlistId={i.watchlist_id}
            watchlistName={i.name}
            deleteWatchlist={triggerDeleteWatchlist}
            owner={i.role === "owner" ? true : false}
          />
        ))}
    </>
  );
};

export default AvailableWatchlists;
