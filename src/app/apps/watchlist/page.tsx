/* eslint-disable react-hooks/exhaustive-deps */
"use server";
import { getUser } from "@/app/lib/handlers/getUser";
import AvailableWatchlists from "./components/AvailableWatchlists";
import AddWatchlist from "./components/AddWatchlist";

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

export default async function Page() {
  const user = await getUser();
  var userLists: watchlistResponse;
  await fetch(process.env.NEXT_PUBLIC_URL + "/api/watchlist/user-watchlists", {
    method: "POST",
    body: JSON.stringify({ userEmail: user.email }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status !== 200) {
      console.log("Error caught");
      userLists = { message: [] };
    } else {
      userLists = await res.json();
      console.log("Success fetching user lists", userLists);
    }
  });
  const shows = [
    {
      id: "1",
      media_name: "Star Trek 123432",
      watchlist_list_id: "001",
      watched: 1,
    },
    {
      id: "2",
      media_name: "Star Trek 87543798",
      watchlist_list_id: "001",
      watched: 0,
    },
  ];

  return (
    <>
      {!user ? (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          <div className="font-bold text-3xl text-center grid-cols-4">
            Please login or sign up.
            <div className="col-span-4 self-center"></div>
          </div>
        </div>
      ) : (
        <div>
          <AddWatchlist user={user} />
          <AvailableWatchlists user={user} watchlists={userLists} />
        </div>
      )}
    </>
  );
}
