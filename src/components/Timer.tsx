'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface TimerProps {
  durationSeconds: number;
  onTimeUp: () => void;
  groupName: string;
  mockNumber: string | number;
}

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

export default function Timer({ durationSeconds, onTimeUp, groupName, mockNumber }: TimerProps) {
  const STORAGE_KEY = `pantnagar_timer_remaining_${groupName}_${mockNumber}`;
  const STORAGE_TS_KEY = `pantnagar_timer_ts_${groupName}_${mockNumber}`;

  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  const [remaining, setRemaining] = useState<number>(() => {
    if (typeof window === 'undefined') return durationSeconds;

    const savedRemaining = sessionStorage.getItem(STORAGE_KEY);
    const savedTs = sessionStorage.getItem(STORAGE_TS_KEY);

    if (savedRemaining && savedTs) {
      const elapsed = Math.floor((Date.now() - Number(savedTs)) / 1000);
      const adjusted = Math.max(0, Number(savedRemaining) - elapsed);
      return adjusted;
    }
    return durationSeconds;
  });

  // Persist to sessionStorage on every tick
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, String(remaining));
    sessionStorage.setItem(STORAGE_TS_KEY, String(Date.now()));
  }, [remaining, STORAGE_KEY, STORAGE_TS_KEY]);

  // Countdown
  useEffect(() => {
    if (remaining <= 0) {
      console.log("Timer expired! Triggering auto-submit...");
      onTimeUpRef.current();
      return;
    }

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [remaining]);

  const isWarning = remaining <= 300 && remaining > 0;
  const isUrgent = remaining <= 60 && remaining > 0;

  return (
    <div
      className={`sticky top-20 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg font-heading font-bold text-sm transition-colors duration-300 ${
        isUrgent
          ? 'bg-red-600 text-white animate-pulse'
          : isWarning
          ? 'bg-red-500 text-white'
          : 'bg-white/90 backdrop-blur-md text-primary-900 border border-gray-200'
      }`}
    >
      <svg
        className={`w-4 h-4 ${isWarning ? 'text-white' : 'text-saffron-600'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="tabular-nums tracking-wider">{formatTime(remaining)}</span>
    </div>
  );
}
