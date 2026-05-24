'use client';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<string, string>;
  onJumpTo: (index: number) => void;
}

export default function QuestionPalette({
  totalQuestions,
  currentQuestion,
  answers,
  onJumpTo,
}: QuestionPaletteProps) {
  const answeredCount = Object.values(answers).filter((v) => v !== '').length;

  const getButtonClass = (index: number): string => {
    if (index === currentQuestion) return 'q-current';
    if (answers[index] && answers[index] !== '') return 'q-answered';
    return 'q-not-visited';
  };

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 shadow-md">
      <h4 className="text-sm font-bold font-heading text-primary-900 mb-3">
        Question Palette
      </h4>

      {/* Summary */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
          Answered: {answeredCount} / {totalQuestions}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onJumpTo(i)}
            className={`w-full aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-150 hover:scale-105 ${getButtonClass(i)}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap gap-3 text-[10px] font-semibold">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm q-answered" /> Answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm q-not-visited" /> Not Visited
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm q-current" /> Current
        </span>
      </div>
    </div>
  );
}
