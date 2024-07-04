import { fetchAppsBody } from "../schemas/res-types";
import { allAppsHandler } from "./fetchAllApps";
import { userAppsHandler } from "./fetchUserApps";

export const availableAppsHandler = async (fetchAppsBody: fetchAppsBody) => {
  const resAllApps = await allAppsHandler(fetchAppsBody);

  if (resAllApps.msg !== "success") {
    // Handle error
    console.log("All apps error caught", resAllApps);
  }

  const resUserApps = await userAppsHandler(fetchAppsBody);

  if (resUserApps.msg !== "success") {
    // Handle error
    console.log("All apps error caught", resUserApps);
  } else {
    // Create appList from user apps.
    let userApps = [];
    Array.isArray(resUserApps.data) &&
      resUserApps.data.forEach((item) => {
        // TODO: find user apps in all apps and replace item in array with AppTable structure
      });
  }

  return resUserApps;
};
