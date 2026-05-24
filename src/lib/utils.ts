/**
 * Calculate score for a mock test attempt.
 * +3 for correct, -1 for wrong, 0 for unattempted.
 */
export function calculateScore(
  answers: Record<string, string>,
  correctAnswers: Record<string, string>
): { score: number; correct: number; wrong: number; unattempted: number } {
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;

  const totalQuestions = Object.keys(correctAnswers).length;

  for (const questionId of Object.keys(correctAnswers)) {
    const userAnswer = answers[questionId];
    if (!userAnswer || userAnswer === "") {
      unattempted++;
    } else if (userAnswer === correctAnswers[questionId]) {
      correct++;
    } else {
      wrong++;
    }
  }

  const score = correct * 3 - wrong * 1;

  return { score, correct, wrong, unattempted };
}
