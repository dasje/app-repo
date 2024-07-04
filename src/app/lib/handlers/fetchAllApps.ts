import {
  fetchAppsBody,
  ResErrorMessageType,
  ResSuccessMessageType,
  ResType,
} from "../messageSchemas/resErrorType";

export const allAppsHandler = async (fetchAppsBody: fetchAppsBody) => {
  console.log("Handling fetch all apps request");
  console.log(JSON.stringify(fetchAppsBody));

  try {
    const resAllApps = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/applications",
      {
        method: "POST",
        body: JSON.stringify(fetchAppsBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!resAllApps.ok) {
      console.log("Error caught in fetchAllApps");
      const errorUserAppsData = await resAllApps.json();
      if (
        Array.isArray(errorUserAppsData.errors) &&
        errorUserAppsData.errors.length > 0
      ) {
        errorUserAppsData.errors.forEach((error: any) => {
          console.log(error.message);
          return {
            msg: "error",
            data: [],
          };
        });
      }
      return {
        msg: "error",
        data: [],
      };
    }
    return { msg: "success", data: await resAllApps.json() };
  } catch (error: any) {
    console.log("Catcging an error", error);
    return { msg: "error", data: [] };
  }
};
