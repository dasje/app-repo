import { findValidPasswordReset } from "@/app/database/repositories/PasswordResetRepository";

type Params = {
  request_code: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const requestCode = context.params.request_code;
  console.log("Fetching request code: ", requestCode);
  var items;
  try {
    items = await findValidPasswordReset(requestCode);
  } catch (error: any) {
    console.log("Error in find-password-request route.");
    if (error.code === "ER_TOO_MANY_USER_CONNECTIONS") {
      console.log("Too many connections error.");
      return Response.json(
        {
          message: error.message,
        },
        { status: 503 }
      );
    }
    console.log(error);
    return Response.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
  if (!items) {
    console.log("No valid result found in find-password-request route.");
    return Response.json({ status: 204 });
  }
  console.log("Success in find-password-request route", items);
  return Response.json(items, { status: 200 });
}
