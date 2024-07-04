import { Divider } from "@nextui-org/react";
import { AppTable } from "@/app/database/types";
import { UserType } from "@/app/lib/handlers/getUser";
import UserAppDashboardCard from "../UserAppDashboardCard";

interface UserAppDashboardInterface {
  appsRes: AppTable[];
  user: UserType;
}
const UserAppDashboard = async ({
  appsRes,
  user,
}: UserAppDashboardInterface) => {
  return (
    <>
      <div className="font-bold text-3xl text-center">
        <div className="self-center tracking-wide font-bold text-lg p-4">
          Your apps
        </div>
        <Divider />
        <div className="container min-w-screen max-h-60 md:max-h-80 overflow-y-hidden overflow-y-scroll scrolling-auto scrolling-touch">
          <div className="grid grid-cols-1 md:grid-cols-6">
            {appsRes &&
              Array.isArray(appsRes) &&
              appsRes.length > 0 &&
              appsRes.map((i: AppTable, k) => (
                <div key={k} className="col-span-1">
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
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAppDashboard;
