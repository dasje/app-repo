import { NextResponse } from "next/server";
import { findAllApps } from "@/app/database/repositories/AppsRepository";

export async function GET() {
  try {
    const currentApps = await findAllApps();
    console.log("Current apps", currentApps);
    return Response.json(currentApps);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
