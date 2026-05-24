import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, questions, attempts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { calculateScore } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { mockNumber, groupName, answers } = await request.json();

    if (!mockNumber || !groupName || !answers) {
      return NextResponse.json(
        { error: "mockNumber, groupName and answers are required" },
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

    // Clear any existing attempt for this mock + user to allow re-attempts
    await db
      .delete(attempts)
      .where(
        and(
          eq(attempts.clerkId, userId),
          eq(attempts.mockNumber, parseInt(mockNumber)),
          eq(attempts.groupName, groupName)
        )
      );

    // Fetch correct answers from questions table
    const questionList = await db
      .select()
      .from(questions)
      .where(
        and(
          eq(questions.mockNumber, parseInt(mockNumber)),
          eq(questions.groupName, groupName)
        )
      );

    if (questionList.length === 0) {
      return NextResponse.json(
        { error: "No questions found for this mock test" },
        { status: 404 }
      );
    }

    // Build correctAnswers map: question_id -> correct_option
    const correctAnswers: Record<string, string> = {};
    for (const q of questionList) {
      correctAnswers[q.id.toString()] = q.correctOption;
    }

    // Calculate score
    const result = calculateScore(answers, correctAnswers);

    // Save attempt to database
    await db.insert(attempts).values({
      clerkId: userId,
      mockNumber: parseInt(mockNumber),
      groupName,
      answers,
      score: result.score,
    });

    return NextResponse.json({
      score: result.score,
      correct: result.correct,
      wrong: result.wrong,
      unattempted: result.unattempted,
    });
  } catch (error) {
    console.error("Error submitting test:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
