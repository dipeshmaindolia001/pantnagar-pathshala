import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { transactionId, groupName } = await request.json();

    if (!transactionId || transactionId.trim() === "") {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    if (!groupName || !["PCB", "PCM", "Biology", "Chemistry", "Physics"].includes(groupName)) {
      return NextResponse.json(
        { error: "Valid package name (PCB, PCM, Biology, Chemistry, or Physics) is required" },
        { status: 400 }
      );
    }

    const updates: Record<string, string> = {};
    if (groupName === "PCB") {
      updates.pcbStatus = "pending";
      updates.pcbTxId = transactionId.trim();
    } else if (groupName === "PCM") {
      updates.pcmStatus = "pending";
      updates.pcmTxId = transactionId.trim();
    } else if (groupName === "Biology") {
      updates.bioStatus = "pending";
      updates.bioTxId = transactionId.trim();
    } else if (groupName === "Chemistry") {
      updates.chemStatus = "pending";
      updates.chemTxId = transactionId.trim();
    } else if (groupName === "Physics") {
      updates.phyStatus = "pending";
      updates.phyTxId = transactionId.trim();
    }

    await db
      .update(users)
      .set(updates)
      .where(eq(users.clerkId, userId));

    return NextResponse.json({
      message: "Payment request submitted successfully. Awaiting admin approval.",
    });
  } catch (error) {
    console.error("Error submitting payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
