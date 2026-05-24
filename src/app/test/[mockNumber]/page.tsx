'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';
import QuestionPalette from '@/components/QuestionPalette';
import Timer from '@/components/Timer';

interface Question {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface UserData {
  clerkId: string;
  groupAccess: string;
  paymentStatus: string;
}

export default function TestPage({
  params,
  searchParams,
}: {
  params: Promise<{ mockNumber: string }>;
  searchParams: Promise<{ group?: string }>;
}) {
  const { mockNumber } = use(params);
  const { group } = use(searchParams);
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [groupName, setGroupName] = useState(group || 'PCB');

  const isSingleSubject = ['Biology', 'Chemistry', 'Physics'].includes(groupName);
  const durationSeconds = isSingleSubject ? 5400 : 10800;

  // Fetch user info and questions on mount
  useEffect(() => {
    async function loadTest() {
      try {
        const stream = group || 'PCB';
        setGroupName(stream);

        // 1. Get user info
        const userRes = await fetch('/api/user');
        if (!userRes.ok) {
          router.push('/dashboard');
          return;
        }
        const userData: any = await userRes.json();

        let isApproved = false;
        if (stream === 'PCB') {
          isApproved = userData.pcbStatus === 'approved';
        } else if (stream === 'PCM') {
          isApproved = userData.pcmStatus === 'approved';
        } else if (stream === 'Biology') {
          isApproved = userData.bioStatus === 'approved';
        } else if (stream === 'Chemistry') {
          isApproved = userData.chemStatus === 'approved';
        } else if (stream === 'Physics') {
          isApproved = userData.phyStatus === 'approved';
        }

        if (!isApproved) {
          router.push('/dashboard');
          return;
        }

        // 2. Fetch questions
        const qRes = await fetch(
          `/api/test/questions?mockNumber=${mockNumber}&groupName=${stream}`
        );
        if (!qRes.ok) {
          const data = await qRes.json();
          if (qRes.status === 403) {
            router.push('/dashboard');
            return;
          }
          throw new Error(data.error || 'Failed to load questions');
        }

        const questionList: Question[] = await qRes.json();
        setQuestions(questionList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load test');
      } finally {
        setLoading(false);
      }
    }

    loadTest();
  }, [mockNumber, router]);

  const handleSubmit = useCallback(async () => {
    if (submitted || submitting) return;

    setSubmitting(true);
    try {
      // Build answers keyed by question ID
      const answersByQuestionId: Record<string, string> = {};
      questions.forEach((q, index) => {
        const ans = answers[index.toString()];
        if (ans && ans !== '') {
          answersByQuestionId[q.id.toString()] = ans;
        }
      });

      const res = await fetch('/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mockNumber: parseInt(mockNumber),
          groupName: groupName,
          answers: answersByQuestionId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
      // Clear timer storage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('pantnagar_timer_remaining');
        sessionStorage.removeItem('pantnagar_timer_ts');
      }
      router.push(`/result/${mockNumber}?group=${groupName}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
      setSubmitting(false);
    }
  }, [submitted, submitting, questions, answers, mockNumber, router]);

  const handleTimeUp = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const handleSelectOption = (option: string) => {
    setAnswers((prev) => {
      const current = prev[currentQuestionIndex.toString()];
      // If clicking already selected option, or passing '', clear it
      if (option === '' || current === option) {
        const next = { ...prev };
        delete next[currentQuestionIndex.toString()];
        return next;
      }
      return {
        ...prev,
        [currentQuestionIndex.toString()]: option,
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-body">Loading your test...</p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-2xl p-8 text-center shadow-lg max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">
            Error Loading Test
          </h2>
          <p className="text-gray-600 font-body mb-4">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-primary-700 hover:bg-primary-800 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-2xl p-8 text-center shadow-lg max-w-md">
          <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">
            No Questions Found
          </h2>
          <p className="text-gray-600 font-body mb-4">
            This mock test doesn&apos;t have any questions yet. Please try again later.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-primary-700 hover:bg-primary-800 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm sm:text-base font-bold font-heading text-primary-900">
              Mock Test {mockNumber}
            </h2>
            <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
              {groupName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Timer durationSeconds={durationSeconds} onTimeUp={handleTimeUp} groupName={groupName} mockNumber={mockNumber} />
            <button
              onClick={() => {
                const answeredCount = Object.values(answers).filter((v) => v !== '').length;
                const confirmMsg = `You have answered ${answeredCount} out of ${questions.length} questions.\n\nAre you sure you want to submit?`;
                if (window.confirm(confirmMsg)) {
                  handleSubmit();
                }
              }}
              disabled={submitting}
              className="px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-colors duration-200 shadow-md"
            >
              {submitting ? 'Submitting...' : 'Submit Test'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-body">
            {error}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Question Area */}
          <div className="flex-1">
            <QuestionCard
              questionNumber={currentQuestionIndex + 1}
              questionText={currentQuestion.questionText}
              options={{
                A: currentQuestion.optionA,
                B: currentQuestion.optionB,
                C: currentQuestion.optionC,
                D: currentQuestion.optionD,
              }}
              selectedOption={answers[currentQuestionIndex.toString()] || null}
              onSelectOption={handleSelectOption}
            />

            {/* Prev/Next Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-700 border-2 border-primary-200 hover:bg-primary-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-500 font-body">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(questions.length - 1, prev + 1)
                  )
                }
                disabled={currentQuestionIndex === questions.length - 1}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary-700 hover:bg-primary-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Question Palette Sidebar */}
          <div className="lg:w-72 xl:w-80 shrink-0">
            <div className="lg:sticky lg:top-36">
              <QuestionPalette
                totalQuestions={questions.length}
                currentQuestion={currentQuestionIndex}
                answers={answers}
                onJumpTo={setCurrentQuestionIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
