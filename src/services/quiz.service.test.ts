import { describe, expect, it } from 'vitest';
import type { Quiz } from '@/types';
import { calculerResultat } from './quiz.service';

const quiz: Quiz = {
  id: 'q',
  slug: 'q',
  titre: 't',
  description: '',
  theme: '',
  niveau: 'facile',
  dureeMinutes: 5,
  questions: [
    { id: 'a', enonce: 'e', choix: ['1', '2'], indexBonne: 0, explication: 'x', aRelire: true },
    { id: 'b', enonce: 'e', choix: ['1', '2'], indexBonne: 1, explication: 'x', aRelire: true },
  ],
};

describe('quiz.service', () => {
  it('calcule score et pourcentage', () => {
    const r = calculerResultat(quiz, { a: 0, b: 0 });
    expect(r.bonnes).toBe(1);
    expect(r.total).toBe(2);
    expect(r.pourcentage).toBe(50);
  });
});
