/* eslint-disable react-hooks/exhaustive-deps */
"use server";

import AppDashboard from "../components/layoutComponents/AppDashboard";
import { useEffect, useState } from "react";
import { UserType, getUser } from "../lib/handlers/getUser";
import { availableAppsHandler } from "../lib/handlers/fetchAvailableApps";
import AppDashboardCard from "../components/AppDashboardCard";
import { Divider } from "@nextui-org/react";
import { AppTable } from "../database/types";
import { allAppsHandler } from "../lib/handlers/fetchAllApps";
import { userAppsHandler } from "../lib/handlers/fetchUserApps";
import UserAppDashboard from "../components/layoutComponents/UserAppDashboard";
import { ResType } from "../lib/messageSchemas/resErrorType";

export default async function Page() {
  const user = await getUser();

  let appsRes: ResType = await allAppsHandler({
    userEmail: user?.email,
  });

  let userAppsRes: ResType = await userAppsHandler({
    userEmail: user?.email,
  });

  let userApps = [];

  userAppsRes.message.data.map((item, key) => {
    appsRes.message.data.forEach((appItem) => {
      item.id === appItem.id && userApps.push(appItem);
    });
  });

  return (
    <>
      {user && (
        <>
          <div className="m-6 rounded bg-white flex flex-grow justify-center">
            <div className="font-bold text-3xl text-center grid-cols-4">
              <div className="col-span-4 self-center">Welcome {user.name}!</div>
              <UserAppDashboard
                appsRes={Array.isArray(userApps) && userApps}
                user={user}
              />
            </div>
          </div>
          <Divider />
          <div className="m-6 rounded bg-white flex flex-grow justify-center">
            {appsRes &&
            Array.isArray(appsRes.message.data) &&
            appsRes.message.data.length === 0 ? (
              <div className="font-bold text-3xl text-center grid-cols-4">
                <div className="self-center tracking-wide font-bold text-lg p-4">
                  Add an app
                </div>
                <div className="self-center tracking-wide font-bold text-lg p-4">
                  Error fetching apps: please try again shortly.
                </div>
              </div>
            ) : (
              <AppDashboard
                appsRes={
                  Array.isArray(appsRes.message.data["apps"]) &&
                  appsRes.message.data["apps"]
                }
                user={user}
              />
            )}
          </div>
        </>
      )}
      {!user && (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          <div className="font-bold text-3xl text-center grid-cols-4">
            Please login or sign up.
            <div className="col-span-4 self-center"></div>
          </div>
        </div>
      )}
    </>
  );
}
