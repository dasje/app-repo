import { Button, Card, CardFooter, Divider } from "@nextui-org/react";
import AppDashboardCard from "../AppDashboardCard";
import { ResDataType } from "@/app/lib/messageSchemas/resErrorType";
import { AppTable } from "@/app/database/types";
import { UserType } from "@/app/lib/handlers/getUser";

interface AppDashboardInterface {
  appsRes: AppTable[];
  // | ResDataType<string, string>
  // | ResDataType<string, Promise<AppTable[]>>;
  user: UserType;
}
const AppDashboard = async ({ appsRes, user }: AppDashboardInterface) => {
  console.log(appsRes, user);
  // TODO: Make apps overspill and scrollable on x-axis
  return (
    <>
      <div className="font-bold text-3xl text-center">
        <div className="self-center tracking-wide font-bold text-lg p-4">
          Add an app
        </div>
        <Divider />
        <div className="grid ">
          {appsRes &&
            Array.isArray(appsRes) &&
            appsRes.length > 0 &&
            appsRes.map((i: AppTable, k) => (
              <div key={k} className="col-span-1">
                <div className="tracking-wide font-semibold text-lg">
                  {i.app_name}
                </div>
                <AppDashboardCard
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

export default AppDashboard;
