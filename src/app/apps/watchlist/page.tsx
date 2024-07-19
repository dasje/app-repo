/* eslint-disable react-hooks/exhaustive-deps */
"use server";
import { getUser } from "@/app/lib/handlers/auth_handlers/getUser";
import AvailableWatchlists from "./components/AvailableWatchlists";
import AddWatchlist from "./components/AddWatchlist";
import ChooseLoginSignup from "@/app/login/loginComponents/ChooseLoginSignup";

export default async function Page() {
  const user = await getUser();

  return (
    <>
      {!user ? (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          <div className="font-bold text-3xl text-center grid-cols-4">
            <ChooseLoginSignup textToDisplay="Please log in or sign up to access the Watchlistography application." />
            <div className="col-span-4 self-center"></div>
          </div>
        </div>
      ) : (
        <div>
          <AddWatchlist user={user} />
          {user && <AvailableWatchlists currentUser={user} />}
        </div>
      )}
    </>
  );
}
