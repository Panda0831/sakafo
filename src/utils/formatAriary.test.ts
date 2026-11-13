import { describe, expect, it } from 'vitest';
import { ariaPrix, formatAriary } from './formatAriary';

describe('formatAriary', () => {
  it('place Ar après une espace insécable', () => {
    expect(formatAriary(300)).toBe('300\u00A0Ar');
    expect(formatAriary(14500)).toContain('\u00A0Ar');
    expect(formatAriary(14500)).not.toContain('€');
    expect(formatAriary(14500)).not.toContain('$');
  });
  it('annonce ariary pour le lecteur d’écran', () => {
    expect(ariaPrix(14500)).toBe('14\u202f500 ariary');
  });
});
