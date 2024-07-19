/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import AppDashboard from "../components/layoutComponents/AppDashboard";
import { getUser, UserType } from "../lib/handlers/auth_handlers/getUser";
import { AppTable } from "../database/types";
import UserAppDashboard from "../components/layoutComponents/UserAppDashboard";
import { useEffect, useState } from "react";
import ChooseLoginSignup from "../login/loginComponents/ChooseLoginSignup";
import useSWR from "swr";
import { fetcher } from "../lib/handlers/swrFetcher";
import Loading from "./loading";

export default function Page() {
  const [user, setUser] = useState<UserType>();
  const [fetchingUser, setFetchingUser] = useState<boolean>(true);

  useEffect(() => {
    const findUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      setFetchingUser(false);
    };
    findUser();
  }, []);

  const [userApps, setUserApps] = useState<AppTable[]>([]);
  const [appsRes, setApps] = useState<AppTable[]>();
  const [triggerRefreshUserApps, setTriggerRefreshUserApps] =
    useState<boolean>(false);

  const {
    data: userAppsData,
    error: userAppsError,
    isLoading: userAppsIsLoading,
  } = useSWR(
    () =>
      triggerRefreshUserApps || true
        ? `${process.env.NEXT_PUBLIC_URL}/api/user-applications/` + user.email
        : null,
    fetcher,
    {
      // refreshInterval: 500,
    }
  );

  const {
    data: allAppsData,
    error: allAppsError,
    isLoading: allAppsIsLoading,
  } = useSWR(
    triggerRefreshUserApps || true
      ? `${process.env.NEXT_PUBLIC_URL}/api/applications`
      : null,
    fetcher,
    {
      // refreshInterval: 500,
    }
  );

  useEffect(() => {
    console.log("HEHE", allAppsData);
    allAppsData && setApps(allAppsData);
  }, [allAppsData]);

  useEffect(() => {
    allAppsError && console.log(allAppsError);
  }, [allAppsError]);

  useEffect(() => {
    if (allAppsData && userAppsData) {
      let userApps = [];
      Array.isArray(userAppsData) &&
        userAppsData.forEach((item) => {
          allAppsData.forEach((appItem) => {
            if (item.app_id === appItem.id) {
              userApps.push(appItem);
              appsRes &&
                setApps(
                  appsRes.filter((i) => {
                    i.id !== appItem.id;
                  })
                );
            }
          });
        });
      setUserApps(userApps);
    }
  }, [userAppsData]);

  return (
    <>
      {fetchingUser && <Loading />}
      {!fetchingUser && user && (
        <>
          <div className="m-6 rounded bg-white flex flex-grow justify-center">
            <div className="font-bold text-3xl text-center grid-cols-4">
              <div className="col-span-4 self-center">Welcome {user.name}!</div>
              {userAppsIsLoading && <Loading />}
              {userAppsData && (
                <UserAppDashboard appsRes={userApps && userApps} user={user} />
              )}
            </div>
          </div>
          {/* <Divider /> */}
          <div className="m-6 rounded bg-white flex flex-grow justify-center">
            {allAppsIsLoading && <Loading />}
            {allAppsError && <div>Error fetching applications</div>}
            {appsRes && (
              <AppDashboard
                appsRes={appsRes}
                user={user}
                triggerUserAppRefresh={setTriggerRefreshUserApps}
              />
            )}
          </div>
        </>
      )}
      {!fetchingUser && !user && (
        <div className="m-6 rounded bg-white flex flex-grow justify-center">
          <div className="font-bold text-3xl text-center grid-cols-4">
            <ChooseLoginSignup textToDisplay="Please log in or sign up to access applications." />
            <div className="col-span-4 self-center"></div>
          </div>
        </div>
      )}
    </>
  );
}
