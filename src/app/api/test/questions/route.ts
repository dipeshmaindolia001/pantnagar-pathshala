import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, questions } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const mockNumber = searchParams.get("mockNumber");
    const groupName = searchParams.get("groupName");

    if (!mockNumber || !groupName) {
      return NextResponse.json(
        { error: "mockNumber and groupName are required" },
        { status: 400 }
      );
    }

    // Check user has approved access
    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    let isApproved = false;
    if (groupName === "PCB") {
      isApproved = user[0].pcbStatus === "approved";
    } else if (groupName === "PCM") {
      isApproved = user[0].pcmStatus === "approved";
    } else if (groupName === "Biology") {
      isApproved = user[0].bioStatus === "approved";
    } else if (groupName === "Chemistry") {
      isApproved = user[0].chemStatus === "approved";
    } else if (groupName === "Physics") {
      isApproved = user[0].phyStatus === "approved";
    }

    if (!isApproved) {
      return NextResponse.json(
        { error: `Payment not approved for ${groupName} Mock tests. Please complete payment first.` },
        { status: 403 }
      );
    }

    // Fetch questions
    const questionList = await db
      .select()
      .from(questions)
      .where(
        and(
          eq(questions.mockNumber, parseInt(mockNumber)),
          eq(questions.groupName, groupName)
        )
      );

    // Strip correctOption to prevent cheating
    const safeQuestions = questionList.map(
      ({ correctOption, ...rest }) => rest
    );

    return NextResponse.json(safeQuestions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
