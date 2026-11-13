import { describe, expect, it } from 'vitest';
import { validerDonnees } from './index';
import { plats } from './plats';

describe('cohérence des données', () => {
  it('ne signale aucune erreur', () => {
    expect(validerDonnees()).toEqual([]);
  });

  it('associe une photo sourcée et locale à chaque plat', () => {
    expect(plats).toHaveLength(48);
    expect(plats.every((plat) => plat.photo)).toBe(true);
    expect(new Set(plats.map((plat) => plat.photo?.src)).size).toBe(plats.length);
  });
});
