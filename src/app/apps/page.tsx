/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import AppDashboard from "../components/layoutComponents/AppDashboard";
import { getUser, UserType } from "../lib/handlers/getUser";
import { Divider } from "@nextui-org/react";
import { AppAccess, AppTable } from "../database/types";
import { allAppsHandler } from "../lib/handlers/fetchAllApps";
import { userAppsHandler } from "../lib/handlers/fetchUserApps";
import UserAppDashboard from "../components/layoutComponents/UserAppDashboard";
import { useEffect, useState } from "react";
import { ResDataType } from "../lib/schemas/res-types";

export default function Page() {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const findUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };
    findUser();
  }, []);

  const [userApps, setUserApps] = useState<AppTable[]>([]);
  const [appsRes, setApps] = useState<ResDataType<string, AppTable[]>>();
  const [triggerRefreshUserApps, setTriggerRefreshUserApps] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      let apps: ResDataType<string, AppTable[]>;
      let userApplications: ResDataType<string, AppAccess[]>;
      try {
        apps = await allAppsHandler({
          userEmail: user?.email,
        });

        userApplications = await userAppsHandler({
          userEmail: user?.email,
        });
      } finally {
        setApps(apps);
        let userApps = [];
        Array.isArray(userApplications.data.apps) &&
          userApplications.data.apps.forEach((item) => {
            apps.data.apps.forEach((appItem) => {
              if (item.app_id === appItem.id) {
                userApps.push(appItem);
                apps.data.apps.filter((i) => {
                  i.id !== appItem.id;
                });
              }
            });
          });
        setUserApps(userApps);
        console.log("User apps and all apps", userApps, appsRes);
      }
    };
    user && fetchData();
  }, [user, triggerRefreshUserApps]);

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
          {/* <Divider /> */}
          <div className="m-6 rounded bg-white flex flex-grow justify-center">
            {appsRes && (
              <AppDashboard
                appsRes={Array.isArray(appsRes.data.apps) && appsRes.data.apps}
                user={user}
                triggerUserAppRefresh={setTriggerRefreshUserApps}
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
