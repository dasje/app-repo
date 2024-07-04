/* eslint-disable react-hooks/exhaustive-deps */
"use server";

import AppDashboard from "../components/layoutComponents/AppDashboard";
import { getUser } from "../lib/handlers/getUser";
import { Divider } from "@nextui-org/react";
import { AppAccess, AppTable } from "../database/types";
import { allAppsHandler } from "../lib/handlers/fetchAllApps";
import { userAppsHandler } from "../lib/handlers/fetchUserApps";
import UserAppDashboard from "../components/layoutComponents/UserAppDashboard";
import { ResDataType, ResType } from "../lib/schemas/res-types";

export default async function Page() {
  const user = await getUser();
  let userApps: AppTable[] = [];
  let appsRes: ResDataType<string, AppTable[]>;
  let userAppsRes: ResDataType<string, AppAccess[]>;

  try {
    appsRes = await allAppsHandler({
      userEmail: user?.email,
    });

    userAppsRes = await userAppsHandler({
      userEmail: user?.email,
    });
    console.log("URR", userAppsRes);
    console.log("AR", appsRes);
  } finally {
    Array.isArray(userAppsRes.data.apps) &&
      userAppsRes.data.apps.forEach((item) => {
        appsRes.data.apps.forEach((appItem) => {
          if (item.app_id === appItem.id) {
            userApps.push(appItem);
            appsRes.data.apps.filter((i) => {
              i.id !== appItem.id;
            });
          }
        });
      });
  }

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
            <AppDashboard
              appsRes={Array.isArray(appsRes.data.apps) && appsRes.data.apps}
              user={user}
            />
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
