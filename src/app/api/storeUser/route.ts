import { initialUser } from "@/lib/inital-profile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Check if user already exists or needs to be created
    const user = await initialUser();

    if (user) {
      return new NextResponse("User already exists", { status: 200 });
    } else {
      return new NextResponse(JSON.stringify(user), { status: 200 });
    }
  } catch (error) {
    console.error("Error storing user data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
