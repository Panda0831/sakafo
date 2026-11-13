import { plats } from '@/data/plats';
import type { FiltresPlats, Plat } from '@/types';
import { prixPortion } from './prix.service';
import { type CleTri, trierPlats } from './tri.service';
import { normaliserRecherche } from '@/utils/slug';

export const listerPlats = (): Plat[] => plats;

export const obtenirPlat = (slug: string): Plat | undefined =>
  plats.find((p) => p.slug === slug || p.id === slug);

export const platsParCategorie = (categorieId: string): Plat[] =>
  plats.filter((p) => p.categorieIds.includes(categorieId));

export const platsParRegion = (regionId: string): Plat[] =>
  plats.filter((p) => p.regionIds.includes(regionId));

export const platsParIngredient = (ingredientId: string): Plat[] =>
  plats.filter((p) => p.ingredientIds.includes(ingredientId));

export const platsSimilaires = (id: string, n = 6): Plat[] => {
  const plat = plats.find((p) => p.id === id);
  if (!plat) return [];
  return plats
    .filter((p) => p.id !== id)
    .map((p) => {
      const score =
        p.categorieIds.filter((c) => plat.categorieIds.includes(c)).length * 3 +
        p.ingredientIds.filter((c) => plat.ingredientIds.includes(c)).length +
        (p.typePlat === plat.typePlat ? 2 : 0);
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.p);
};

export const vedettes = (): Plat[] => plats.filter((p) => p.estVedette);

export const appliquerFiltres = (source: Plat[], filtres: FiltresPlats): Plat[] => {
  let r = source;
  if (filtres.q) {
    const q = normaliserRecherche(filtres.q);
    r = r.filter((p) => {
      const blob = [
        p.nom.malagasy,
        p.nom.francais ?? '',
        p.nom.anglais ?? '',
        p.description,
        p.tags.join(' '),
        p.ingredientIds.join(' '),
      ]
        .map(normaliserRecherche)
        .join(' ');
      return blob.includes(q);
    });
  }
  if (filtres.cat?.length) r = r.filter((p) => p.categorieIds.some((c) => filtres.cat?.includes(c)));
  if (filtres.region?.length)
    r = r.filter((p) => p.regionIds.some((c) => filtres.region?.includes(c)));
  if (filtres.ing?.length)
    r = r.filter((p) => p.ingredientIds.some((c) => filtres.ing?.includes(c)));
  if (filtres.type?.length) r = r.filter((p) => filtres.type?.includes(p.typePlat));
  if (filtres.mode?.length)
    r = r.filter((p) => p.modePreparation && filtres.mode?.includes(p.modePreparation));
  if (filtres.diff?.length)
    r = r.filter((p) => p.difficulte && filtres.diff?.includes(p.difficulte));
  if (typeof filtres.pmin === 'number') r = r.filter((p) => prixPortion(p) >= filtres.pmin!);
  if (typeof filtres.pmax === 'number') r = r.filter((p) => prixPortion(p) <= filtres.pmax!);
  if (typeof filtres.pop === 'number') r = r.filter((p) => p.popularite >= filtres.pop!);
  if (filtres.vedette) r = r.filter((p) => p.estVedette);
  return trierPlats(r, (filtres.tri as CleTri | undefined) ?? 'popularite');
};
