import { NextResponse } from "next/server";
import { findAllApps } from "@/app/database/repositories/AppsRepository";

export async function POST() {
  try {
    const currentApps = await findAllApps();
    console.log("CA ", currentApps);

    return Response.json({ apps: currentApps });
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
