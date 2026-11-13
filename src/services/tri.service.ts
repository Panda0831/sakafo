import type { Plat } from '@/types';
import { prixPortion } from './prix.service';

export type CleTri = 'nom-az' | 'nom-za' | 'popularite' | 'note' | 'prix-asc' | 'prix-desc';

const nom = (p: Plat) => p.nom.malagasy || p.nom.francais || p.slug;

export const trierPlats = (plats: Plat[], cle: CleTri = 'popularite'): Plat[] => {
  const copie = [...plats];
  copie.sort((a, b) => {
    switch (cle) {
      case 'nom-az':
        return nom(a).localeCompare(nom(b), 'fr');
      case 'nom-za':
        return nom(b).localeCompare(nom(a), 'fr');
      case 'note':
        return (b.note ?? 0) - (a.note ?? 0);
      case 'prix-asc':
        return prixPortion(a) - prixPortion(b);
      case 'prix-desc':
        return prixPortion(b) - prixPortion(a);
      default:
        return b.popularite - a.popularite;
    }
  });
  return copie;
};
