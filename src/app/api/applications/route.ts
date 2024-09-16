import { NextResponse } from "next/server";
import { findAllApps } from "@/app/database/repositories/AppsRepository";

export async function GET(request: Request) {
  try {
    const currentApps = await findAllApps();
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
