import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allUsers = await db.user.findMany();
    return new NextResponse(JSON.stringify(allUsers), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
