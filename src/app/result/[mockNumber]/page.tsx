import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { attempts, questions } from "@/db/schema";
import { eq, and, gte } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ResultPageProps {
  params: Promise<{ mockNumber: string }>;
  searchParams: Promise<{ group?: string }>;
}

export default async function ResultPage({ params, searchParams }: ResultPageProps) {
  const { mockNumber: mockNumberStr } = await params;
  const mockNumber = parseInt(mockNumberStr);
  
  const { group: groupName } = await searchParams;
  const group = groupName || "PCB";

  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  // Get the user's attempt for this mock and group
  const userAttempts = await db
    .select()
    .from(attempts)
    .where(
      and(
        eq(attempts.clerkId, userId),
        eq(attempts.mockNumber, mockNumber),
        eq(attempts.groupName, group)
      )
    );

  const attempt = userAttempts[0];

  if (!attempt) {
    redirect("/dashboard");
  }

  // Get questions for review
  const questionList = await db
    .select()
    .from(questions)
    .where(
      and(
        eq(questions.mockNumber, mockNumber),
        eq(questions.groupName, attempt.groupName)
      )
    );

  // Calculate rank
  const allAttempts = await db
    .select()
    .from(attempts)
    .where(
      and(
        eq(attempts.mockNumber, mockNumber),
        eq(attempts.groupName, attempt.groupName)
      )
    );

  const totalAttempts = allAttempts.length;
  const betterOrEqual = allAttempts.filter(
    (a) => (a.score ?? 0) >= (attempt.score ?? 0)
  ).length;

  const userAnswers = (attempt.answers as Record<string, string>) || {};
  const score = attempt.score ?? 0;

  const totalQuestions = questionList.length;
  const maxScore = totalQuestions * 3;
  const greenThreshold = maxScore * (400 / 600);
  const yellowThreshold = maxScore * (200 / 600);

  // Calculate stats
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;

  questionList.forEach((q) => {
    const userAnswer = userAnswers[q.id.toString()];
    if (!userAnswer || userAnswer === "") {
      unattempted++;
    } else if (userAnswer === q.correctOption) {
      correct++;
    } else {
      wrong++;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Score Hero Section */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Mock Test {mockNumber} — Results
          </h1>
          <p className="text-green-200 text-lg">
            {attempt.groupName} Group • Submitted on{" "}
            {attempt.submittedAt
              ? new Date(attempt.submittedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        {/* Score Card */}
        <div className="glass-card rounded-2xl p-8 shadow-xl mb-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Your Score</p>
            <div className="flex items-baseline justify-center gap-2">
              <span
                className={`text-6xl md:text-7xl font-black ${
                  score >= greenThreshold
                    ? "text-green-600"
                    : score >= yellowThreshold
                    ? "text-yellow-600"
                    : "text-red-500"
                }`}
              >
                {score}
              </span>
              <span className="text-2xl text-gray-400 font-light">/ {maxScore}</span>
            </div>
            <div className="mt-3 w-full max-w-md mx-auto bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  score >= greenThreshold
                    ? "bg-green-500"
                    : score >= yellowThreshold
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${Math.max(0, (score / maxScore) * 100)}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
              <p className="text-3xl font-bold text-green-600">{correct}</p>
              <p className="text-sm text-green-700 mt-1">✅ Correct</p>
              <p className="text-xs text-green-500">+{correct * 3} marks</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
              <p className="text-3xl font-bold text-red-600">{wrong}</p>
              <p className="text-sm text-red-700 mt-1">❌ Wrong</p>
              <p className="text-xs text-red-500">-{wrong} marks</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <p className="text-3xl font-bold text-gray-500">{unattempted}</p>
              <p className="text-sm text-gray-600 mt-1">⬜ Unattempted</p>
              <p className="text-xs text-gray-400">0 marks</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
              <p className="text-3xl font-bold text-amber-600">
                {betterOrEqual} / {totalAttempts}
              </p>
              <p className="text-sm text-amber-700 mt-1">🏆 Your Rank</p>
              <p className="text-xs text-amber-500">
                {totalAttempts === 1
                  ? "First attempt!"
                  : `Out of ${totalAttempts} students`}
              </p>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📝 Question Review
          </h2>

          <div className="space-y-4">
            {questionList.map((q, index) => {
              const userAnswer = userAnswers[q.id.toString()];
              const isCorrect = userAnswer === q.correctOption;
              const isUnattempted = !userAnswer || userAnswer === "";

              return (
                <div
                  key={q.id}
                  className={`glass-card rounded-xl p-6 border-l-4 ${
                    isUnattempted
                      ? "border-l-gray-300"
                      : isCorrect
                      ? "border-l-green-500"
                      : "border-l-red-500"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 ${
                        isUnattempted
                          ? "bg-gray-200 text-gray-600"
                          : isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {q.questionText}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-11">
                    {(["A", "B", "C", "D"] as const).map((opt) => {
                      const optionText =
                        opt === "A"
                          ? q.optionA
                          : opt === "B"
                          ? q.optionB
                          : opt === "C"
                          ? q.optionC
                          : q.optionD;

                      const isUserAnswer = userAnswer === opt;
                      const isCorrectAnswer = q.correctOption === opt;

                      let bgClass = "bg-white border-gray-200";
                      let textClass = "text-gray-700";
                      let icon = "";

                      if (isCorrectAnswer) {
                        bgClass = "bg-green-50 border-green-400";
                        textClass = "text-green-800";
                        icon = " ✅";
                      }
                      if (isUserAnswer && !isCorrect) {
                        bgClass = "bg-red-50 border-red-400";
                        textClass = "text-red-800";
                        icon = " ❌";
                      }

                      return (
                        <div
                          key={opt}
                          className={`flex items-center gap-2 p-3 rounded-lg border ${bgClass} ${textClass}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              isCorrectAnswer
                                ? "bg-green-500 text-white"
                                : isUserAnswer
                                ? "bg-red-500 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {opt}
                          </span>
                          <span className="text-sm">{optionText}{icon}</span>
                        </div>
                      );
                    })}
                  </div>

                  {isUnattempted && (
                    <p className="ml-11 mt-2 text-sm text-gray-400 italic">
                      Not attempted — Correct answer: {q.correctOption}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="text-center pb-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
