import { Divider, Spinner } from "@nextui-org/react";
import { AppTable } from "@/app/database/types";
import { UserType } from "@/app/lib/handlers/getUser";
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
      <div className="font-bold text-3xl text-center columns-1 md:columns-2 container min-w-screen">
        <div className="colums-1">
          <div className="self-center tracking-wide font-bold text-lg p-4">
            Your apps
          </div>
          <Divider />
          <div className="max-h-80 overflow-y-hidden overflow-y-scroll scrolling-auto scrolling-touch">
            <AppBoxWrapper>
              {appsRes && appsRes.length > 0 ? (
                Array.isArray(appsRes) &&
                appsRes.length > 0 &&
                appsRes.map((i: AppTable, k) => (
                  <Suspense
                    key={k}
                    fallback={
                      <div className="place-items-center">
                        <Spinner label="Loading..." color="default" size="lg" />
                      </div>
                    }
                  >
                    <div className="col-span-1">
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
            </AppBoxWrapper>
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className=" col-span-1">
          <div className="self-center tracking-wide font-bold text-lg p-4">
            Your friends
          </div>
          <Divider />
          <div className="max-h-80 md:max-h-80 overflow-x-scroll scrolling-auto scrolling-touch">
            <FriendsList user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAppDashboard;
