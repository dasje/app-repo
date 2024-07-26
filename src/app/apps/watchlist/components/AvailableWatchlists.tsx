/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { UserType } from "@/app/lib/handlers/auth_handlers/getUser";
import Watchlist from "./Watchlist";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/app/lib/handlers/swrFetcher";
import Loading from "../../loading";
import { watchlistResponse } from "../schemas/watchlistResponse";

interface AvailableWatchlists {
  currentUser: UserType;
  dummyList?: watchlistResponse;
  setDummyList?: Dispatch<SetStateAction<watchlistResponse>>;
}

const AvailableWatchlists = ({
  currentUser,
  dummyList,
  setDummyList,
}: AvailableWatchlists) => {
  const [watchlists, setWatchlists] = useState<watchlistResponse>(dummyList);
  const [deleteWatchlist, setDeleteWatchlist] = useState<boolean | string>(
    false
  );

  const { data, error, isLoading } = useSWR(
    currentUser.email !== "dummy"
      ? `${process.env.NEXT_PUBLIC_URL}/api/watchlist/user-watchlists/${currentUser.email}`
      : null,
    fetcher,
    { refreshInterval: 500 }
  );

  useEffect(() => {
    data && setWatchlists(data["message"]);
  }, [data]);

  useEffect(() => {
    setWatchlists(dummyList);
  }, [dummyList]);

  useEffect(() => {
    const deleteList = async () => {
      if (currentUser.email === "dummy") {
        setDummyList(dummyList.filter((i) => i.id !== deleteWatchlist));
        setDeleteWatchlist(false);
      } else {
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
      }
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
