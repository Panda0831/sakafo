import { describe, expect, it } from 'vitest';
import type { Plat } from '@/types';
import { prixPortion, repasComplet, tranche } from './prix.service';

const stub = (over: Partial<Plat> & Pick<Plat, 'id' | 'typePlat' | 'prixIndicatif'>): Plat =>
  ({
    slug: over.id,
    nom: { malagasy: over.id },
    description: '',
    phraseAccroche: '',
    categorieIds: [],
    regionIds: [],
    ingredientIds: [],
    archetype: 'bol-ragout',
    palette: { assiette: '#fff', base: '#000', accent1: '#000', accent2: '#000', ombre: '#000' },
    galerie: [],
    chaud: false,
    popularite: 1,
    noteEstFictive: true,
    tags: [],
    estVedette: false,
    statutDonnees: 'demonstration',
    ...over,
  }) as Plat;

describe('prix.service', () => {
  it('calcule le prix d’une portion de référence', () => {
    const p = stub({
      id: 'mofo',
      typePlat: 'snack',
      prixIndicatif: { valeur: 300, devise: 'MGA', unite: 'pièce', quantitePortion: 3, estFictif: true },
    });
    expect(prixPortion(p)).toBe(900);
  });

  it('classe les tranches', () => {
    expect(tranche(500)).toBe('petits-prix');
    expect(tranche(7000)).toBe('repas-simple');
    expect(tranche(15000)).toBe('table-soignee');
    expect(tranche(40000)).toBe('grande-table');
  });

  it('compose un repas complet au plus bas prix', () => {
    const r = repasComplet([
      stub({
        id: 'p',
        typePlat: 'plat',
        prixIndicatif: { valeur: 14500, devise: 'MGA', unite: 'portion', quantitePortion: 1, estFictif: true },
      }),
      stub({
        id: 'a',
        typePlat: 'accompagnement',
        prixIndicatif: { valeur: 2000, devise: 'MGA', unite: 'portion', quantitePortion: 1, estFictif: true },
      }),
      stub({
        id: 'b',
        typePlat: 'boisson',
        prixIndicatif: { valeur: 500, devise: 'MGA', unite: 'verre', quantitePortion: 1, estFictif: true },
      }),
    ]);
    expect(r.total).toBe(17000);
  });
});
