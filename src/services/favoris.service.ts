import type { TypeFavori } from '@/types';

export interface FavoriItem {
  id: string;
  type: TypeFavori;
  ajouteLe: number;
}

export const ajouterFavori = (liste: FavoriItem[], id: string, type: TypeFavori): FavoriItem[] => {
  if (liste.some((f) => f.id === id && f.type === type)) return liste;
  return [...liste, { id, type, ajouteLe: Date.now() }];
};

export const retirerFavori = (liste: FavoriItem[], id: string, type: TypeFavori): FavoriItem[] =>
  liste.filter((f) => !(f.id === id && f.type === type));

export const estFavori = (liste: FavoriItem[], id: string, type: TypeFavori): boolean =>
  liste.some((f) => f.id === id && f.type === type);

export const nettoyerFavoris = (
  liste: FavoriItem[],
  existe: (id: string, type: TypeFavori) => boolean,
): FavoriItem[] => liste.filter((f) => existe(f.id, f.type));

export const trierFavoris = (liste: FavoriItem[], mode: 'date' | 'alpha', nomDe: (f: FavoriItem) => string) => {
  const copie = [...liste];
  if (mode === 'date') copie.sort((a, b) => b.ajouteLe - a.ajouteLe);
  else copie.sort((a, b) => nomDe(a).localeCompare(nomDe(b), 'fr'));
  return copie;
};
