/* eslint-disable react-hooks/exhaustive-deps */
"use server";
import { getUser } from "@/app/lib/handlers/auth_handlers/getUser";
import AvailableWatchlists from "./components/AvailableWatchlists";
import AddWatchlist from "./components/AddWatchlist";
import LoginOrSignUpBanner from "@/app/login/loginComponents/LoginOrSignUpBanner";
import DummyPage from "./components/DummyPage";

export default async function Page() {
  const user = await getUser();

  return (
    <>
      {!user ? (
        <>
          <LoginOrSignUpBanner textToDisplay="This is a demo version of this application." />
          <DummyPage />
        </>
      ) : (
        <div>
          <AddWatchlist user={user} />
          {user && <AvailableWatchlists currentUser={user} />}
        </div>
      )}
    </>
  );
}
