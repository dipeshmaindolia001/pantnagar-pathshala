'use client';

import Link from 'next/link';

interface TestCardProps {
  mockNumber: number;
  status: 'not_started' | 'completed';
  score?: number;
  groupName: string;
}

export default function TestCard({ mockNumber, status, score, groupName }: TestCardProps) {
  const isSingleSubject = ['Biology', 'Chemistry', 'Physics'].includes(groupName);
  const totalQuestions = isSingleSubject ? 100 : 200;

  return (
    <div className="glass-card rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold font-heading text-primary-900">
            Mock Test {mockNumber}
          </h3>
          <p className="text-sm text-gray-500 font-body mt-0.5">{groupName}</p>
        </div>
        {status === 'completed' ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Completed
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
            Not Started
          </span>
        )}
      </div>

      {status === 'completed' && score !== undefined && (
        <div className="mb-4 p-3 rounded-xl bg-primary-50 border border-primary-100">
          <p className="text-sm text-gray-600 font-body">Score</p>
          <p className="text-2xl font-extrabold font-heading text-primary-800">
            {score}
            <span className="text-sm font-normal text-gray-500 ml-1">/ {totalQuestions}</span>
          </p>
        </div>
      )}

      {status === 'not_started' ? (
        <Link
          href={`/test/${mockNumber}?group=${groupName}`}
          className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary-700 hover:bg-primary-800 transition-colors duration-200 shadow-sm group-hover:shadow-md"
        >
          Start Test
        </Link>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/result/${mockNumber}?group=${groupName}`}
            className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-800 border-2 border-primary-700 hover:bg-primary-50 transition-colors duration-200"
          >
            View Result
          </Link>
          <Link
            href={`/test/${mockNumber}?group=${groupName}`}
            className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary-800 hover:bg-primary-900 transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            Re-take Test
          </Link>
        </div>
      )}
    </div>
  );
}
