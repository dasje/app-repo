import { fetchAppsBody } from "../schemas/res-types";

export const userAppsHandler = async (fetchAppsBody: fetchAppsBody) => {
  try {
    const resUserApps = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/user-applications",
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
      return { msg: errorUserAppsData.message, data: { apps: [] } };
    }
    return { msg: "success", data: await resUserApps.json() };
  } catch (error: any) {
    return {
      msg: "error",
      data: { apps: [] },
    };
  }
};
