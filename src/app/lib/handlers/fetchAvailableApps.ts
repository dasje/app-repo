import {
  fetchAppsBody,
  ResErrorMessageType,
  ResSuccessMessageType,
} from "../messageSchemas/resErrorType";
import { allAppsHandler } from "./fetchAllApps";
// import { allAppsHandler } from "./fetchAllApps";
import { userAppsHandler } from "./fetchUserApps";

export const availableAppsHandler = async (fetchAppsBody: fetchAppsBody) => {
  console.log("Handling fetch apps request");
  console.log(JSON.stringify(fetchAppsBody));

  const resAllApps = await allAppsHandler(fetchAppsBody);

  if (resAllApps.status !== 200) {
    // Handle error
    console.log("All apps error caught", resAllApps.message);
  }

  const resUserApps = await userAppsHandler(fetchAppsBody);

  if (resUserApps.status !== 200) {
    // Handle error
    console.log("All apps error caught", resUserApps.message);
  } else {
    // Create appList from user apps.
    let userApps = [];
    Array.isArray(resUserApps.message.data) &&
      resUserApps.message.data.forEach((item) => {
        // TODO: find user apps in all apps and replace item in array with AppTable structure
      });
  }

  return resAllApps.message, resUserApps.message;
};
