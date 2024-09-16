/* eslint-disable react-hooks/exhaustive-deps */
"use server";
import { getUser } from "@/app/lib/handlers/auth_handlers/getUser";
import LoginOrSignUpBanner from "@/app/login/loginComponents/LoginOrSignUpBanner";
import DummyPage from "../watchlist/components/DummyPage";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";
import Landing from "./components/Landing";

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
        <>
          <div className="self-center font-bold text-3xl text-center">
            Welcome {user.name} to Expenses App!
          </div>
          <div className="md:flex items-center justify-center">
            <div className="m-6 md:m-0 rounded justify-center bg-white flex md:items-start">
              <Landing />
            </div>
          </div>
        </>
      )}
    </>
  );
}
