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
      process.env.REACT_APP_URL + "/api/applications",
      {
        method: "POST",
        body: JSON.stringify(fetchAppsBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!resAllApps.ok) {
      const errorUserAppsData = await resAllApps.json();
      if (
        Array.isArray(errorUserAppsData.errors) &&
        errorUserAppsData.errors.length > 0
      ) {
        errorUserAppsData.errors.forEach((error: any) => {
          console.log(error.message);
          return {
            message: {
              msg: "error",
              data: [],
            },
            status: 500,
          } as ResType;
        });
      }
      return {
        message: {
          msg: "error",
          data: [],
        },
        status: 500,
      } as ResType;
    }
    return {
      message: { msg: "success", data: await resAllApps.json() },
      status: 200,
    } as ResType;
  } catch (error: any) {
    return {
      message: { msg: "error", data: [] },
      status: 500,
    } as ResType;
  }
};
