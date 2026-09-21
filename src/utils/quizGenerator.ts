import { CharacterItem, QuizQuestion } from '../types';
import { ALL_HIRAGANA_CHARACTERS } from '../data/hiraganaData';

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateQuizQuestions(
  pool: CharacterItem[],
  mode: 'char-to-romaji' | 'romaji-to-char' | 'random-quiz',
  questionCount = 10
): QuizQuestion[] {
  if (pool.length === 0) return [];

  const questions: QuizQuestion[] = [];
  const distractorPool = pool.length >= 4 ? pool : ALL_HIRAGANA_CHARACTERS;

  // Ensure variety in questions
  const repeatedPool = [...pool];
  while (repeatedPool.length < questionCount) {
    repeatedPool.push(...pool);
  }
  const selectedChars = shuffleArray(repeatedPool).slice(0, questionCount);

  selectedChars.forEach((item, index) => {
    let qType: 'char-to-romaji' | 'romaji-to-char';
    if (mode === 'char-to-romaji') {
      qType = 'char-to-romaji';
    } else if (mode === 'romaji-to-char') {
      qType = 'romaji-to-char';
    } else {
      qType = Math.random() > 0.5 ? 'char-to-romaji' : 'romaji-to-char';
    }

    if (qType === 'char-to-romaji') {
      // Question is the Character, options are Romaji
      const correctAnswer = item.romaji;
      const otherRomajis = Array.from(
        new Set(distractorPool.filter((c) => c.romaji !== item.romaji).map((c) => c.romaji))
      );
      const distractors = shuffleArray(otherRomajis).slice(0, 3);
      const options = shuffleArray([correctAnswer, ...distractors]);

      questions.push({
        id: `q-${index}-${Date.now()}-${item.romaji}`,
        type: 'char-to-romaji',
        prompt: item.character,
        subPrompt: 'Pilih romaji yang tepat untuk karakter ini:',
        correctAnswer,
        options,
        characterItem: item,
      });
    } else {
      // Question is the Romaji, options are Characters
      const correctAnswer = item.character;
      const otherChars = Array.from(
        new Set(distractorPool.filter((c) => c.character !== item.character).map((c) => c.character))
      );
      const distractors = shuffleArray(otherChars).slice(0, 3);
      const options = shuffleArray([correctAnswer, ...distractors]);

      questions.push({
        id: `q-${index}-${Date.now()}-${item.character}`,
        type: 'romaji-to-char',
        prompt: item.romaji,
        subPrompt: 'Pilih karakter Hiragana yang tepat untuk bunyi ini:',
        correctAnswer,
        options,
        characterItem: item,
      });
    }
  });

  return questions;
}
