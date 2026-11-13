import { ingredients } from '@/data/ingredients';
import { recettes } from '@/data/recettes';
import type { LigneIngredient, Recette } from '@/types';

export const listerRecettes = (): Recette[] => recettes;

export const obtenirRecette = (slug: string): Recette | undefined =>
  recettes.find((r) => r.slug === slug || r.id === slug);

export const tempsTotal = (recette: Recette): number =>
  recette.tempsPreparation + recette.tempsCuisson;

const arrondirUtile = (q: number, unite: string): number => {
  const entiere = /gousse|pièce|pincée|feuille/i.test(unite) || unite === '';
  if (entiere) return Math.round(q * 2) / 2;
  if (q >= 20) return Math.round(q);
  return Math.round(q * 10) / 10;
};

export const calculerQuantites = (recette: Recette, portions: number): LigneIngredient[] => {
  const ratio = portions / recette.portionsOrigine;
  return recette.ingredients.map((l) => ({
    ...l,
    quantite: arrondirUtile(l.quantite * ratio, l.unite),
  }));
};

const versKgOuPiece = (quantite: number, unite: string): { kg?: number; pieces?: number; litres?: number; bottes?: number; sachets?: number } => {
  const u = unite.toLowerCase();
  if (u === 'kg') return { kg: quantite };
  if (u === 'g') return { kg: quantite / 1000 };
  if (u === 'l' || u === 'litre' || u === 'litres') return { litres: quantite };
  if (u === 'ml') return { litres: quantite / 1000 };
  if (u.includes('botte')) return { bottes: quantite };
  if (u.includes('sachet')) return { sachets: quantite };
  if (u.includes('c. à soupe') || u.includes('cas')) return { litres: (quantite * 15) / 1000 };
  if (u.includes('c. à café') || u.includes('cac')) return { litres: (quantite * 5) / 1000 };
  return { pieces: quantite };
};

export const coutIndicatif = (recette: Recette, portions: number): number => {
  const lignes = calculerQuantites(recette, portions);
  let total = 0;
  for (const l of lignes) {
    const ing = ingredients.find((i) => i.id === l.ingredientId);
    if (!ing) continue;
    const conv = versKgOuPiece(l.quantite, l.unite);
    const p = ing.prixIndicatif;
    if (p.unite === 'kg' && conv.kg) total += conv.kg * p.valeur;
    else if (p.unite === 'litre' && conv.litres) total += conv.litres * p.valeur;
    else if (p.unite === 'botte' && conv.bottes) total += conv.bottes * p.valeur;
    else if (p.unite === 'sachet' && conv.sachets) total += conv.sachets * p.valeur;
    else if (p.unite === 'pièce' && conv.pieces) total += conv.pieces * p.valeur;
    else if (conv.pieces) total += conv.pieces * (p.valeur / 10);
  }
  return Math.round(total / 50) * 50;
};

export const listeDeCourses = (recette: Recette, portions: number) => {
  const lignes = calculerQuantites(recette, portions);
  return lignes.map((l) => {
    const ing = ingredients.find((i) => i.id === l.ingredientId);
    return {
      ...l,
      nom: ing?.nom.francais ?? l.ingredientId,
      nomMg: ing?.nom.malagasy,
    };
  });
};
