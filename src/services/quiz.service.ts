import type { Quiz } from '@/types';

export const calculerResultat = (quiz: Quiz, reponses: Record<string, number>) => {
  const details = quiz.questions.map((q) => {
    const choisie = reponses[q.id];
    const correcte = choisie === q.indexBonne;
    return {
      question: q,
      choisie,
      correcte,
    };
  });
  const bonnes = details.filter((d) => d.correcte).length;
  const total = quiz.questions.length;
  const pourcentage = total === 0 ? 0 : Math.round((bonnes / total) * 100);
  return { bonnes, total, pourcentage, details };
};
