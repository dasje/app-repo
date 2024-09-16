import { Divider, Spinner } from "@nextui-org/react";
import { AppTable } from "@/app/database/types";
import { UserType } from "@/app/lib/handlers/auth_handlers/getUser";
import UserAppDashboardCard from "../UserAppDashboardCard";
import { Suspense } from "react";
import FriendsList from "../friendsComponents/FriendsList";
import { AppBoxWrapper } from "./AppBoxWrapper";
import GhostDashboardCard from "../GhostDashboardCard";

interface UserAppDashboardInterface {
  appsRes: AppTable[];
  user: UserType;
}
const UserAppDashboard = ({ appsRes, user }: UserAppDashboardInterface) => {
  return (
    <>
      <div className="font-bold text-3xl text-center">
        <div className="container w-full md:max-w-max md:max-h-80 md:overflow-x-hidden md:overflow-y-hidden scrolling-auto scrolling-touch">
          <div className="self-center tracking-wide font-bold text-lg p-4">
            Your apps
          </div>
          <Divider />

          <div className="container md:min-w-screen md:max-h-80 overflow-x-hidden md:overflow-y-hidden scrolling-auto scrolling-touch">
            <AppBoxWrapper>
              <div className="grid grid-cols-1 md:grid-cols-6">
                {appsRes && appsRes.length > 0 ? (
                  Array.isArray(appsRes) &&
                  appsRes.length > 0 &&
                  appsRes.map((i: AppTable, k) => (
                    <Suspense
                      key={k}
                      fallback={
                        <div className="place-items-center">
                          <Spinner
                            label="Loading..."
                            color="default"
                            size="lg"
                          />
                        </div>
                      }
                    >
                      <div className="grid-cols-1">
                        <div className="tracking-wide font-semibold text-lg">
                          {i.app_name}
                        </div>
                        <UserAppDashboardCard
                          image={i.remote_image_address}
                          imageAlt={`App image for ${i.app_name}`}
                          appLink={`/apps/${i.app_prefix}`}
                          appByline={i.byline}
                          appId={i.id}
                          currentUser={user.email}
                        />
                      </div>
                    </Suspense>
                  ))
                ) : (
                  <GhostDashboardCard
                    byline="Add an app below"
                    image="https://i.postimg.cc/jdJ4x626/badger-applications.png"
                    imageAlt="Badgers building"
                  />
                )}
              </div>
            </AppBoxWrapper>
          </div>
        </div>
      </div>

      {/* <div className="container w-full md:max-w-max md:max-h-80 overflow-y-hidden scrolling-auto scrolling-touch">
        <div className="self-center tracking-wide font-bold text-lg p-4">
          Your friends
        </div>
        <Divider />
        <div className="max-h-80 md:max-h-80 overflow-x-scroll">
          <FriendsList user={user} />
        </div>
      </div> */}
      {/* </div> */}
    </>
  );
};

export default UserAppDashboard;
