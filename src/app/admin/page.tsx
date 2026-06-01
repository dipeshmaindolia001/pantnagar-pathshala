import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, resources } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";

export const dynamic = 'force-dynamic';

async function retryQuery<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error("Query failed after retries");
}

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  // Check if user is admin
  if (userId !== process.env.ADMIN_CLERK_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
        <div className="glass-card rounded-2xl p-12 text-center max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Unauthorized</h1>
          <p className="text-gray-500">
            You do not have admin access. This page is restricted.
          </p>
        </div>
      </div>
    );
  }

  try {
    // Fetch all users with retry for Neon cold starts
    const allUsers = await retryQuery(() =>
      db.select().from(users)
    );

    const pendingRequests: any[] = [];
    const approvedUsersList: any[] = [];

    for (const u of allUsers) {
      // Check PCB
      if (u.pcbStatus === "pending") {
        pendingRequests.push({
          clerkId: u.clerkId,
          name: u.name || "N/A",
          email: u.email || "N/A",
          groupAccess: "PCB",
          transactionId: u.pcbTxId || "N/A",
          createdAt: u.createdAt ? u.createdAt.toISOString() : "N/A",
        });
      } else if (u.pcbStatus === "approved") {
        approvedUsersList.push({
          clerkId: u.clerkId,
          name: u.name || "N/A",
          email: u.email || "N/A",
          groupAccess: "PCB",
          createdAt: u.createdAt ? u.createdAt.toISOString() : "N/A",
        });
      }

      // Check PCM
      if (u.pcmStatus === "pending") {
        pendingRequests.push({
          clerkId: u.clerkId,
          name: u.name || "N/A",
          email: u.email || "N/A",
          groupAccess: "PCM",
          transactionId: u.pcmTxId || "N/A",
          createdAt: u.createdAt ? u.createdAt.toISOString() : "N/A",
        });
      } else if (u.pcmStatus === "approved") {
        approvedUsersList.push({
          clerkId: u.clerkId,
          name: u.name || "N/A",
          email: u.email || "N/A",
          groupAccess: "PCM",
          createdAt: u.createdAt ? u.createdAt.toISOString() : "N/A",
        });
      }

      // Check Biology
      if (u.bioStatus === "pending") {
        pendingRequests.push({
          clerkId: u.clerkId,
          name: u.name || "N/A",
          email: u.email || "N/A",
          groupAccess: "Biology",
          transactionId: u.bioTxId || "N/A",
          createdAt: u.createdAt ? u.createdAt.toISOString() : "N/A",
        });
      } else if (u.bioStatus === "approved") {
        approvedUsersList.push({
          clerkId: u.clerkId,
          name: u.name || "N/A",
          email: u.email || "N/A",
          groupAccess: "Biology",
          createdAt: u.createdAt ? u.createdAt.toISOString() : "N/A",
        });
      }

      // Check Chemistry
      if (u.chemStatus === "pending") {
        pendingRequests.push({
          clerkId: u.clerkId,
          name: u.name || "N/A",
          email: u.email || "N/A",
          groupAccess: "Chemistry",
          transactionId: u.chemTxId || "N/A",
          createdAt: u.createdAt ? u.createdAt.toISOString() : "N/A",
        });
      } else if (u.chemStatus === "approved") {
        approvedUsersList.push({
          clerkId: u.clerkId,
          name: u.name || "N/A",
          email: u.email || "N/A",
          groupAccess: "Chemistry",
          createdAt: u.createdAt ? u.createdAt.toISOString() : "N/A",
        });
      }

      // Check Physics
      if (u.phyStatus === "pending") {
        pendingRequests.push({
          clerkId: u.clerkId,
          name: u.name || "N/A",
          email: u.email || "N/A",
          groupAccess: "Physics",
          transactionId: u.phyTxId || "N/A",
          createdAt: u.createdAt ? u.createdAt.toISOString() : "N/A",
        });
      } else if (u.phyStatus === "approved") {
        approvedUsersList.push({
          clerkId: u.clerkId,
          name: u.name || "N/A",
          email: u.email || "N/A",
          groupAccess: "Physics",
          createdAt: u.createdAt ? u.createdAt.toISOString() : "N/A",
        });
      }
    }

    // Fetch resources with retry
    const allResources = await retryQuery(() =>
      db.select().from(resources).orderBy(desc(resources.createdAt))
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold">🛡️ Admin Panel</h1>
            <p className="text-green-200 mt-1">
              Manage payment approvals and user access
            </p>
            <div className="flex gap-4 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/20 text-yellow-200 rounded-full text-sm font-medium">
                ⏳ {pendingRequests.length} Pending
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-sm font-medium">
                ✅ {approvedUsersList.length} Approved
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 -mt-6">
          <AdminPanel
            pendingUsers={pendingRequests}
            approvedUsers={approvedUsersList}
            resources={allResources.map((r) => ({
              id: r.id,
              title: r.title,
              url: r.url,
              createdAt: r.createdAt ? r.createdAt.toISOString() : "N/A",
            }))}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Admin page DB error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50">
        <div className="glass-card rounded-2xl p-12 text-center max-w-lg shadow-xl">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Database Temporarily Unavailable
          </h1>
          <p className="text-gray-500 mb-6">
            The database is waking up from sleep mode. This usually takes a few seconds on the free tier.
          </p>
          <a
            href="/admin"
            className="inline-block px-8 py-3 rounded-xl text-base font-bold text-white bg-green-700 hover:bg-green-800 transition-colors duration-200 shadow-md"
          >
            🔄 Try Again
          </a>
        </div>
      </div>
    );
  }
}
