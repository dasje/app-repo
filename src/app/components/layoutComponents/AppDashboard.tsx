import { Divider, Spinner } from "@nextui-org/react";
import AppDashboardCard from "../AppDashboardCard";
import { AppTable } from "@/app/database/types";
import { UserType } from "@/app/lib/handlers/auth_handlers/getUser";
import { Dispatch, SetStateAction, Suspense } from "react";
import { AppBoxWrapper } from "./AppBoxWrapper";

interface AppDashboardInterface {
  appsRes: AppTable[];
  user: UserType;
  triggerUserAppRefresh: Dispatch<SetStateAction<boolean>>;
}
const AppDashboard = ({
  appsRes,
  user,
  triggerUserAppRefresh,
}: AppDashboardInterface) => {
  return (
    <>
      <div className="font-bold text-3xl text-center">
        {appsRes && appsRes.length > 0 ? (
          <>
            <div className="self-center tracking-wide font-bold text-lg p-4">
              Add an app
            </div>
            <Divider />

            <div className="container min-w-screen max-h-80 overflow-y-hidden overflow-y-scroll scrolling-auto scrolling-touch">
              <AppBoxWrapper>
                <div className="grid grid-cols-1 md:grid-cols-6">
                  {appsRes &&
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
                        <div className="col-span-1">
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
                            triggerUserAppResfresh={triggerUserAppRefresh}
                          />
                        </div>
                      </Suspense>
                    ))}
                </div>
              </AppBoxWrapper>
            </div>
          </>
        ) : appsRes.length === 0 ? (
          <></>
        ) : (
          <div className="font-bold text-3xl text-center grid-cols-4">
            <div className="self-center tracking-wide font-bold text-lg p-4">
              Add an app
            </div>
            <div className="self-center tracking-wide font-bold text-lg p-4">
              Error fetching apps: please try again shortly.
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AppDashboard;
