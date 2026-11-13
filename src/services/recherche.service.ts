import { articles } from '@/data/articles';
import { etablissements } from '@/data/etablissements';
import { ingredients } from '@/data/ingredients';
import { plats } from '@/data/plats';
import { recettes } from '@/data/recettes';
import { regions } from '@/data/regions';
import { normaliserRecherche } from '@/utils/slug';
import { prixPortion } from './prix.service';

export type TypeRecherche = 'plat' | 'recette' | 'region' | 'ingredient' | 'article' | 'etablissement';

export interface ResultatRecherche {
  type: TypeRecherche;
  id: string;
  slug: string;
  titre: string;
  sousTitre?: string;
  score: number;
  prixAr?: number;
}

const scoreTexte = (terme: string, champs: { texte: string; poids: number }[]): number => {
  let s = 0;
  for (const c of champs) {
    const t = normaliserRecherche(c.texte);
    if (t === terme) s += c.poids * 3;
    else if (t.startsWith(terme)) s += c.poids * 2;
    else if (t.includes(terme)) s += c.poids;
  }
  return s;
};

export const rechercher = (termeBrut: string, types?: TypeRecherche[]): ResultatRecherche[] => {
  const terme = normaliserRecherche(termeBrut);
  if (terme.length < 1) return [];
  const want = new Set(types ?? ['plat', 'recette', 'region', 'ingredient', 'article', 'etablissement']);
  const out: ResultatRecherche[] = [];

  if (want.has('plat')) {
    for (const p of plats) {
      const score = scoreTexte(terme, [
        { texte: p.nom.malagasy, poids: 5 },
        { texte: p.nom.francais ?? '', poids: 5 },
        { texte: p.nom.anglais ?? '', poids: 4 },
        { texte: p.ingredientIds.join(' '), poids: 3 },
        { texte: p.description, poids: 1 },
      ]);
      if (score > 0)
        out.push({
          type: 'plat',
          id: p.id,
          slug: p.slug,
          titre: p.nom.malagasy,
          sousTitre: p.nom.francais,
          score,
          prixAr: prixPortion(p),
        });
    }
  }
  if (want.has('recette')) {
    for (const r of recettes) {
      const score = scoreTexte(terme, [
        { texte: r.nom, poids: 5 },
        { texte: r.description, poids: 1 },
        { texte: r.tags.join(' '), poids: 2 },
      ]);
      if (score > 0)
        out.push({ type: 'recette', id: r.id, slug: r.slug, titre: r.nom, score });
    }
  }
  if (want.has('region')) {
    for (const r of regions) {
      const score = scoreTexte(terme, [
        { texte: r.nom, poids: 5 },
        { texte: r.cheflieu, poids: 3 },
        { texte: r.description, poids: 1 },
      ]);
      if (score > 0)
        out.push({ type: 'region', id: r.id, slug: r.slug, titre: r.nom, sousTitre: r.cheflieu, score });
    }
  }
  if (want.has('ingredient')) {
    for (const i of ingredients) {
      const score = scoreTexte(terme, [
        { texte: i.nom.francais, poids: 5 },
        { texte: i.nom.malagasy ?? '', poids: 5 },
        { texte: i.description, poids: 1 },
      ]);
      if (score > 0)
        out.push({
          type: 'ingredient',
          id: i.id,
          slug: i.slug,
          titre: i.nom.francais,
          sousTitre: i.nom.malagasy,
          score,
        });
    }
  }
  if (want.has('article')) {
    for (const a of articles) {
      const score = scoreTexte(terme, [
        { texte: a.titre, poids: 5 },
        { texte: a.resume, poids: 2 },
      ]);
      if (score > 0)
        out.push({ type: 'article', id: a.id, slug: a.slug, titre: a.titre, score });
    }
  }
  if (want.has('etablissement')) {
    for (const e of etablissements) {
      const score = scoreTexte(terme, [
        { texte: e.nom, poids: 5 },
        { texte: e.ville, poids: 3 },
        { texte: e.description, poids: 1 },
      ]);
      if (score > 0)
        out.push({ type: 'etablissement', id: e.id, slug: e.slug, titre: e.nom, sousTitre: e.ville, score });
    }
  }

  return out.sort((a, b) => b.score - a.score).slice(0, 24);
};

export const surligner = (texte: string, terme: string): string => {
  const n = normaliserRecherche(terme);
  if (!n) return texte;
  const src = texte;
  const norm = normaliserRecherche(src);
  const idx = norm.indexOf(n);
  if (idx < 0) return texte;
  return `${src.slice(0, idx)}<mark>${src.slice(idx, idx + terme.length)}</mark>${src.slice(idx + terme.length)}`;
};
