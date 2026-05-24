import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, attempts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import TestCard from "@/components/TestCard";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Query user from DB
  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  let user = userResult[0] ?? null;

  // Sync user record from Clerk if it doesn't exist yet
  if (!user) {
    const clerkUser = await currentUser();
    if (clerkUser) {
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      const name = clerkUser.fullName || clerkUser.firstName || "Student";
      
      const [newUser] = await db
        .insert(users)
        .values({
          clerkId: userId,
          email,
          name,
        })
        .returning();
      user = newUser;
    }
  }

  const pcbStatus = user?.pcbStatus || "none";
  const pcmStatus = user?.pcmStatus || "none";
  const bioStatus = user?.bioStatus || "none";
  const chemStatus = user?.chemStatus || "none";
  const phyStatus = user?.phyStatus || "none";

  const pcbTxId = user?.pcbTxId;
  const pcmTxId = user?.pcmTxId;
  const bioTxId = user?.bioTxId;
  const chemTxId = user?.chemTxId;
  const phyTxId = user?.phyTxId;

  // Query attempts for this user
  const userAttempts = await db
    .select()
    .from(attempts)
    .where(eq(attempts.clerkId, userId));

  // Build a map of "groupName-mockNumber" -> attempt score
  const attemptMap: Record<string, { score: number }> = {};
  for (const attempt of userAttempts) {
    const key = `${attempt.groupName}-${attempt.mockNumber}`;
    attemptMap[key] = { score: attempt.score ?? 0 };
  }

  const whatsappGroupUrl = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || "https://chat.whatsapp.com/JHbH1f9simv6jYbl9nJWHw";

  const hasAnyPending = pcbStatus === "pending" || pcmStatus === "pending" || bioStatus === "pending" || chemStatus === "pending" || phyStatus === "pending";
  const hasAnyApproved = pcbStatus === "approved" || pcmStatus === "approved" || bioStatus === "approved" || chemStatus === "approved" || phyStatus === "approved";

  // CASE 1: All 5 packages are "none" (not bought or pending)
  if (
    pcbStatus === "none" &&
    pcmStatus === "none" &&
    bioStatus === "none" &&
    chemStatus === "none" &&
    phyStatus === "none"
  ) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center shadow-xl animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center text-4xl">
              🎓
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary-900 mb-4">
              Welcome to Pantnagar Entrance Prep!
            </h2>
            <p className="text-gray-600 font-body text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Unlock our exam-standard mock test packages tailored to your preparation needs. Choose from our stream-based combined packages or targeted single-subject mock tests to get started.
            </p>

            {/* Combined stream packages */}
            <div className="mb-10 text-left">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                Combined Stream Packages (3 Mocks • 3 Hours • 200 Questions)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-150 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary-50 rounded-bl-full opacity-35" />
                  <h4 className="font-extrabold text-lg text-primary-900 mb-1">PCB Group</h4>
                  <p className="text-xs text-gray-500 mb-4 font-body">Physics, Chemistry, Biology</p>
                  <div className="text-2xl font-bold text-saffron-600 mb-4">₹150</div>
                  <Link
                    href="/pay?group=PCB"
                    className="block w-full py-2.5 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-center text-xs font-bold transition-all shadow-sm"
                  >
                    Buy PCB Package
                  </Link>
                </div>

                <div className="p-6 bg-white border border-gray-150 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-saffron-50 rounded-bl-full opacity-35" />
                  <h4 className="font-extrabold text-lg text-primary-900 mb-1">PCM Group</h4>
                  <p className="text-xs text-gray-500 mb-4 font-body">Physics, Chemistry, Mathematics</p>
                  <div className="text-2xl font-bold text-saffron-600 mb-4">₹150</div>
                  <Link
                    href="/pay?group=PCM"
                    className="block w-full py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-center text-xs font-bold transition-all shadow-sm"
                  >
                    Buy PCM Package
                  </Link>
                </div>
              </div>
            </div>

            {/* Single subject packages */}
            <div className="text-left">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                Targeted Single Subject Packages (5 Mocks • 1.5 Hours • 100 Questions)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 bg-white border border-gray-150 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full opacity-30" />
                  <h4 className="font-extrabold text-base text-primary-900 mb-1">🌿 Biology</h4>
                  <p className="text-[11px] text-gray-500 mb-3 font-body">5 Biology Mock Tests</p>
                  <div className="text-xl font-bold text-saffron-600 mb-3">₹100</div>
                  <Link
                    href="/pay?group=Biology"
                    className="block w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-center text-xs font-bold transition-all shadow-sm"
                  >
                    Buy Biology
                  </Link>
                </div>

                <div className="p-5 bg-white border border-gray-150 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full opacity-30" />
                  <h4 className="font-extrabold text-base text-primary-900 mb-1">🧪 Chemistry</h4>
                  <p className="text-[11px] text-gray-500 mb-3 font-body">5 Chemistry Mock Tests</p>
                  <div className="text-xl font-bold text-saffron-600 mb-3">₹100</div>
                  <Link
                    href="/pay?group=Chemistry"
                    className="block w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-center text-xs font-bold transition-all shadow-sm"
                  >
                    Buy Chemistry
                  </Link>
                </div>

                <div className="p-5 bg-white border border-gray-150 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-full opacity-30" />
                  <h4 className="font-extrabold text-base text-primary-900 mb-1">⚡ Physics</h4>
                  <p className="text-[11px] text-gray-500 mb-3 font-body">5 Physics Mock Tests</p>
                  <div className="text-xl font-bold text-saffron-600 mb-3">₹100</div>
                  <Link
                    href="/pay?group=Physics"
                    className="block w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-center text-xs font-bold transition-all shadow-sm"
                  >
                    Buy Physics
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CASE 2: At least one package is pending and ZERO are approved
  if (!hasAnyApproved) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="glass-card rounded-2xl p-8 text-center shadow-xl animate-fade-in-up">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-saffron-100 flex items-center justify-center text-3xl">
              ⏳
            </div>
            <h2 className="text-xl font-bold font-heading text-primary-900 mb-2">
              Awaiting Payment Approval
            </h2>
            <p className="text-gray-600 font-body text-sm mb-6 leading-relaxed">
              Your payment request is under review. The admin will verify your transaction ID and unlock your mock tests within a few hours.
            </p>

            <div className="space-y-3 mb-6">
              {pcbStatus === "pending" && (
                <div className="flex items-center justify-between p-3.5 bg-saffron-50 border border-saffron-200 rounded-xl">
                  <span className="text-sm font-bold text-saffron-800">🔬 PCB Mock Tests</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-saffron-200 text-saffron-800 animate-pulse">Pending</span>
                </div>
              )}
              {pcmStatus === "pending" && (
                <div className="flex items-center justify-between p-3.5 bg-saffron-50 border border-saffron-200 rounded-xl">
                  <span className="text-sm font-bold text-saffron-800">📐 PCM Mock Tests</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-saffron-200 text-saffron-800 animate-pulse">Pending</span>
                </div>
              )}
              {bioStatus === "pending" && (
                <div className="flex items-center justify-between p-3.5 bg-saffron-50 border border-saffron-200 rounded-xl">
                  <span className="text-sm font-bold text-saffron-800">🌿 Biology Subject Mocks</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-saffron-200 text-saffron-800 animate-pulse">Pending</span>
                </div>
              )}
              {chemStatus === "pending" && (
                <div className="flex items-center justify-between p-3.5 bg-saffron-50 border border-saffron-200 rounded-xl">
                  <span className="text-sm font-bold text-saffron-800">🧪 Chemistry Subject Mocks</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-saffron-200 text-saffron-800 animate-pulse">Pending</span>
                </div>
              )}
              {phyStatus === "pending" && (
                <div className="flex items-center justify-between p-3.5 bg-saffron-50 border border-saffron-200 rounded-xl">
                  <span className="text-sm font-bold text-saffron-800">⚡ Physics Subject Mocks</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-saffron-200 text-saffron-800 animate-pulse">Pending</span>
                </div>
              )}
            </div>

            {/* Premium WhatsApp Chat Link */}
            <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-150 text-left">
              <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-1.5 mb-1.5">
                💬 Need Urgent Approval?
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                To request instant payment verification or resolve any transaction issues, join our official discussion support group and message the admin directly:
              </p>
              <a
                href={whatsappGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow transition-all cursor-pointer"
              >
                Join Support WhatsApp Group →
              </a>
            </div>

            {/* Buy other package options */}
            <div className="pt-4 border-t border-gray-100 text-left">
              <p className="text-xs text-gray-500 font-body mb-3">Preparing for another subject or stream?</p>
              <div className="flex flex-wrap gap-2.5">
                {pcbStatus === "none" && (
                  <Link href="/pay?group=PCB" className="text-xs text-primary-700 hover:text-primary-900 border border-primary-600 px-3 py-1.5 rounded-lg font-bold">Buy PCB (₹150)</Link>
                )}
                {pcmStatus === "none" && (
                  <Link href="/pay?group=PCM" className="text-xs text-saffron-700 hover:text-saffron-900 border border-saffron-600 px-3 py-1.5 rounded-lg font-bold">Buy PCM (₹150)</Link>
                )}
                {bioStatus === "none" && (
                  <Link href="/pay?group=Biology" className="text-xs text-emerald-700 hover:text-emerald-900 border border-emerald-600 px-3 py-1.5 rounded-lg font-bold">Buy Biology (₹100)</Link>
                )}
                {chemStatus === "none" && (
                  <Link href="/pay?group=Chemistry" className="text-xs text-purple-700 hover:text-purple-900 border border-purple-600 px-3 py-1.5 rounded-lg font-bold">Buy Chemistry (₹100)</Link>
                )}
                {phyStatus === "none" && (
                  <Link href="/pay?group=Physics" className="text-xs text-orange-700 hover:text-orange-900 border border-orange-600 px-3 py-1.5 rounded-lg font-bold">Buy Physics (₹100)</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CASE 3: At least one package is approved! Display active tests.
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-extrabold font-heading text-primary-900 mb-1">
              Welcome back, {user?.name || "Student"}! 👋
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              {pcbStatus === "approved" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-105 text-emerald-800 border border-emerald-200">
                  🔬 PCB Active
                </span>
              )}
              {pcmStatus === "approved" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-105 text-blue-800 border border-blue-200">
                  📐 PCM Active
                </span>
              )}
              {bioStatus === "approved" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                  🌿 Biology Active
                </span>
              )}
              {chemStatus === "approved" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                  🧪 Chemistry Active
                </span>
              )}
              {phyStatus === "approved" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                  ⚡ Physics Active
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
                ✓ Active Access
              </span>
            </div>
          </div>
        </div>

        {/* Info alerts: any pending package notification */}
        {hasAnyPending && (
          <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending Approvals</p>
              <div className="space-y-1 text-xs text-gray-600 font-body">
                {pcbStatus === "pending" && <p>⏳ Your **PCB Package** is currently pending admin verification.</p>}
                {pcmStatus === "pending" && <p>⏳ Your **PCM Package** is currently pending admin verification.</p>}
                {bioStatus === "pending" && <p>⏳ Your **Biology Package** is currently pending admin verification.</p>}
                {chemStatus === "pending" && <p>⏳ Your **Chemistry Package** is currently pending admin verification.</p>}
                {phyStatus === "pending" && <p>⏳ Your **Physics Package** is currently pending admin verification.</p>}
                <p className="text-[11px] text-gray-500 mt-1">Join the support WhatsApp group for rapid activation by the admin.</p>
              </div>
            </div>
            <div className="shrink-0">
              <a
                href={whatsappGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm inline-block"
              >
                Join Support Group 💬
              </a>
            </div>
          </div>
        )}

        {/* PCB Mocks Grid */}
        {pcbStatus === "approved" && (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-primary-900 border-b border-gray-150 pb-2">
              🔬 PCB Mock Papers (Physics, Chemistry, Biology)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((mockNumber, i) => {
                const attempt = attemptMap[`PCB-${mockNumber}`];
                return (
                  <div
                    key={`pcb-${mockNumber}`}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <TestCard
                      mockNumber={mockNumber}
                      status={attempt ? "completed" : "not_started"}
                      score={attempt?.score}
                      groupName="PCB"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PCM Mocks Grid */}
        {pcmStatus === "approved" && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-extrabold text-saffron-700 border-b border-gray-150 pb-2">
              📐 PCM Mock Papers (Physics, Chemistry, Mathematics)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((mockNumber, i) => {
                const attempt = attemptMap[`PCM-${mockNumber}`];
                return (
                  <div
                    key={`pcm-${mockNumber}`}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <TestCard
                      mockNumber={mockNumber}
                      status={attempt ? "completed" : "not_started"}
                      score={attempt?.score}
                      groupName="PCM"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Biology Subject Mocks Grid */}
        {bioStatus === "approved" && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-extrabold text-emerald-800 border-b border-gray-150 pb-2">
              🌿 Biology Subject Mock Papers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((mockNumber, i) => {
                const attempt = attemptMap[`Biology-${mockNumber}`];
                return (
                  <div
                    key={`bio-${mockNumber}`}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <TestCard
                      mockNumber={mockNumber}
                      status={attempt ? "completed" : "not_started"}
                      score={attempt?.score}
                      groupName="Biology"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chemistry Subject Mocks Grid */}
        {chemStatus === "approved" && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-extrabold text-purple-700 border-b border-gray-150 pb-2">
              🧪 Chemistry Subject Mock Papers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((mockNumber, i) => {
                const attempt = attemptMap[`Chemistry-${mockNumber}`];
                return (
                  <div
                    key={`chem-${mockNumber}`}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <TestCard
                      mockNumber={mockNumber}
                      status={attempt ? "completed" : "not_started"}
                      score={attempt?.score}
                      groupName="Chemistry"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Physics Subject Mocks Grid */}
        {phyStatus === "approved" && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-extrabold text-orange-755 border-b border-gray-150 pb-2">
              ⚡ Physics Subject Mock Papers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((mockNumber, i) => {
                const attempt = attemptMap[`Physics-${mockNumber}`];
                return (
                  <div
                    key={`phy-${mockNumber}`}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <TestCard
                      mockNumber={mockNumber}
                      status={attempt ? "completed" : "not_started"}
                      score={attempt?.score}
                      groupName="Physics"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Buy other package options */}
        {(pcbStatus === "none" || pcmStatus === "none" || bioStatus === "none" || chemStatus === "none" || phyStatus === "none") && (
          <div className="glass-card rounded-2xl p-6 shadow-sm border border-gray-200 animate-fade-in-up">
            <h3 className="text-lg font-bold font-heading text-primary-900 mb-2">
              📚 Unlock More Mock Packages
            </h3>
            <p className="text-xs text-gray-500 font-body mb-4">
              Add more practice packs to perfect your scoring speed and subject mastery across other topics.
            </p>
            <div className="flex flex-wrap gap-3">
              {pcbStatus === "none" && (
                <Link
                  href="/pay?group=PCB"
                  className="px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Buy PCB (₹150)
                </Link>
              )}
              {pcmStatus === "none" && (
                <Link
                  href="/pay?group=PCM"
                  className="px-4 py-2 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Buy PCM (₹150)
                </Link>
              )}
              {bioStatus === "none" && (
                <Link
                  href="/pay?group=Biology"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Buy Biology (₹100)
                </Link>
              )}
              {chemStatus === "none" && (
                <Link
                  href="/pay?group=Chemistry"
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Buy Chemistry (₹100)
                </Link>
              )}
              {phyStatus === "none" && (
                <Link
                  href="/pay?group=Physics"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Buy Physics (₹100)
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Combined Stats Summary */}
        {userAttempts.length > 0 && (
          <div className="glass-card rounded-2xl p-6 shadow-md animate-fade-in-up">
            <h3 className="text-lg font-bold font-heading text-primary-900 mb-4">
              Your Performance Stats
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-primary-50 border border-primary-100 text-center">
                <p className="text-2xl font-extrabold font-heading text-primary-800">
                  {userAttempts.length}
                </p>
                <p className="text-xs text-gray-600 font-body mt-1">Tests Completed</p>
              </div>
              <div className="p-4 rounded-xl bg-saffron-50 border border-saffron-100 text-center">
                <p className="text-2xl font-extrabold font-heading text-saffron-700">
                  {Math.max(...userAttempts.map((a) => a.score ?? 0))}
                </p>
                <p className="text-xs text-gray-600 font-body mt-1">Best Score</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <p className="text-2xl font-extrabold font-heading text-gray-700">
                  {Math.round(
                    userAttempts.reduce((sum, a) => sum + (a.score ?? 0), 0) /
                      userAttempts.length
                  )}
                </p>
                <p className="text-xs text-gray-600 font-body mt-1">Average Score</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
