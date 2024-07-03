import {
  ResErrorMessageType,
  ResSuccessMessageType,
  ResType,
  fetchAppsBody,
} from "../messageSchemas/resErrorType";

export const userAppsHandler = async (fetchAppsBody: fetchAppsBody) => {
  console.log("Handling fetch user apps request");
  console.log(JSON.stringify(fetchAppsBody));

  try {
    const resUserApps = await fetch(
      process.env.REACT_APP_URL + "/api/user-applications",
      {
        method: "POST",
        body: JSON.stringify(fetchAppsBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!resUserApps.ok) {
      const errorUserAppsData = await resUserApps.json();
      console.log("Error caught in fetchUserApps: ", errorUserAppsData.message);
      return {
        message: {
          msg: errorUserAppsData.message,
          data: [],
        },
        status: errorUserAppsData.status,
      } as ResType;
    }
    return {
      message: {
        msg: "success",
        data: await resUserApps.json(),
      },
      status: 200,
    } as ResType;
  } catch (error: any) {
    return {
      message: {
        msg: "error",
        data: [],
      },
      status: 500,
    } as ResType;
  }
};
