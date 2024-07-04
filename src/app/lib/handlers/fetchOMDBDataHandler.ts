import {
  findByNameSchema,
  findMediaByNameSchema,
} from "../schemas/watchlist-schemas/omdb-message-schemas";

export const fetchOMDBDataHandler = async (titleReq: findByNameSchema) => {
  try {
    let { mediaName } = findMediaByNameSchema.parse(titleReq);
    mediaName = mediaName.split(" ").join("+");
    const resMedia = await fetch(
      `http://www.omdbapi.com/?t=${mediaName}&apikey=${process.env.OMDB_API_KEY}`
    );
    if (!resMedia.ok) {
      console.log("Error caught in fetchOMDBDataHandler");
      const errorUserAppsData = await resMedia.json();
      if (
        Array.isArray(errorUserAppsData.errors) &&
        errorUserAppsData.errors.length > 0
      ) {
        errorUserAppsData.errors.forEach((error: any) => {
          console.log(error.message);
          return {
            msg: "error",
            data: {},
          };
        });
      }
      return {
        msg: resMedia.statusText,
        data: {},
      };
    }
    return { msg: "success", data: await resMedia.json() };
  } catch (error: any) {
    console.log("Catching an error", error);
    return { msg: "error", data: {} };
  }
};

// const y = async () => {
//   const x = await fetchOMDBDataHandler({ mediaName: "Computer Ghosts" });
//   console.log(x);
// };
// y();

// const x = async () => {
//   const resAllApps = await fetch(
//     `http://www.omdbapi.com/?t=computer+ghosts&apikey=323206b9`
//   );

//   if (resAllApps.ok) {
//     console.log(await resAllApps.json());
//   }
// };

// x();
