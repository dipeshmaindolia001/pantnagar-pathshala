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

    // Admin check
    if (userId !== process.env.ADMIN_CLERK_ID) {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const { clerkId, groupName } = await request.json();

    if (!clerkId || !groupName) {
      return NextResponse.json(
        { error: "clerkId and groupName are required" },
        { status: 400 }
      );
    }

    if (!["PCB", "PCM", "Biology", "Chemistry", "Physics"].includes(groupName)) {
      return NextResponse.json(
        { error: "Invalid groupName. Must be PCB, PCM, Biology, Chemistry, or Physics." },
        { status: 400 }
      );
    }

    // Check target user exists
    const targetUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    if (targetUser.length === 0) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 }
      );
    }

    const updates: Record<string, string> = {};
    if (groupName === "PCB") {
      updates.pcbStatus = "approved";
    } else if (groupName === "PCM") {
      updates.pcmStatus = "approved";
    } else if (groupName === "Biology") {
      updates.bioStatus = "approved";
    } else if (groupName === "Chemistry") {
      updates.chemStatus = "approved";
    } else if (groupName === "Physics") {
      updates.phyStatus = "approved";
    }

    await db
      .update(users)
      .set(updates)
      .where(eq(users.clerkId, clerkId));

    return NextResponse.json({
      message: `${groupName} access approved successfully`,
    });
  } catch (error) {
    console.error("Error approving payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
