'use client';

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
  options: { A: string; B: string; C: string; D: string };
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
}

const optionLabels = ['A', 'B', 'C', 'D'] as const;

export default function QuestionCard({
  questionNumber,
  questionText,
  options,
  selectedOption,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-md animate-fade-in-up">
      {/* Question header */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 mb-3">
          Question {questionNumber}
        </span>
        <p className="text-base sm:text-lg font-medium font-body text-gray-800 leading-relaxed">
          {questionText}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {optionLabels.map((label) => {
          const isSelected = selectedOption === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onSelectOption(label)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                isSelected
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <span
                className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition-colors duration-200 ${
                  isSelected
                    ? 'bg-saffron-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {label}
              </span>
              <span className="font-body text-sm sm:text-base text-gray-700">
                {options[label]}
              </span>
              {isSelected && (
                <svg className="w-5 h-5 text-primary-600 ml-auto shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Clear response */}
      {selectedOption && (
        <button
          type="button"
          onClick={() => onSelectOption('')}
          className="mt-4 px-4 py-2 text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          Clear Response
        </button>
      )}
    </div>
  );
}
