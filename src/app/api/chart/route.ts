import { db } from "@/db";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user = await currentProfile(); // Get the authenticated user's session
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch all documents for the authenticated user
    const documents = await db.file.findMany({
      where: {
        fileId: user.userId, // Filter by authenticated user
      },
      select: {
        createdAt: true,
      },
    });

    // Group documents by month and year
    const monthlyData = documents.reduce((acc, file) => {
      const date = new Date(file.createdAt);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", {
        month: "long",
      });

      const key = `${month} ${year}`;

      if (!acc[key]) {
        acc[key] = { count: 0 };
      }
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, { count: number }>);

    // Format the grouped data for the response
    const formattedData = Object.keys(monthlyData).map((key) => ({
      month: key,
      documents: monthlyData[key].count,
    }));

    return new NextResponse(JSON.stringify(formattedData), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching documents data:", error);
    return new NextResponse("Failed to fetch documents data", { status: 500 });
  }
};
