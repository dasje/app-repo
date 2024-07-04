import { Button, Card, CardFooter, Divider } from "@nextui-org/react";
import AppDashboardCard from "../AppDashboardCard";
import { ResDataType } from "@/app/lib/messageSchemas/resErrorType";
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
  // TODO: Make apps overspill and scrollable on x-axis
  return (
    <>
      <div className="font-bold text-3xl text-center">
        <div className="self-center tracking-wide font-bold text-lg p-4">
          Your apps
        </div>
        <Divider />
        <div className="grid p-4">
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
    </>
  );
};

export default UserAppDashboard;
