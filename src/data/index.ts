import { articles } from './articles';
import { auteurs } from './auteurs';
import { categories } from './categories';
import { contenusCulturels } from './contenusCulturels';
import { dictionnaire } from './dictionnaire';
import { etablissements } from './etablissements';
import { evenements } from './evenements';
import { faq } from './faq';
import { galerie } from './galerie';
import { ingredients } from './ingredients';
import { menus } from './menus';
import { parcours } from './parcours';
import { plats } from './plats';
import { quiz } from './quiz';
import { recettes } from './recettes';
import { regions } from './regions';
import { temoignages } from './temoignages';

const uniques = (vals: string[], label: string, erreurs: string[]) => {
  const seen = new Set<string>();
  for (const v of vals) {
    if (seen.has(v)) erreurs.push(`${label} dupliqué : ${v}`);
    seen.add(v);
  }
};

export const validerDonnees = (): string[] => {
  const erreurs: string[] = [];
  uniques(
    plats.map((p) => p.slug),
    'slug plat',
    erreurs,
  );
  uniques(
    recettes.map((p) => p.slug),
    'slug recette',
    erreurs,
  );
  const catIds = new Set<string>(categories.map((c) => c.id));
  const regIds = new Set<string>(regions.map((c) => c.id));
  const ingIds = new Set<string>(ingredients.map((c) => c.id));
  const platIds = new Set<string>(plats.map((c) => c.id));
  for (const p of plats) {
    if (!p.photo) erreurs.push(`photo manquante ${p.id}`);
    else {
      if (!p.photo.src.startsWith('/images/plats/')) erreurs.push(`photo non locale ${p.id}`);
      if (
        !p.photo.alt.trim() ||
        !p.photo.credit.trim() ||
        Boolean(p.photo.source) !== Boolean(p.photo.license) ||
        Boolean(p.photo.source) !== Boolean(p.photo.licenseUrl)
      )
        erreurs.push(`crédit photo incomplet ${p.id}`);
    }
    for (const id of p.categorieIds) if (!catIds.has(id)) erreurs.push(`catégorie inconnue ${id} sur ${p.id}`);
    for (const id of p.regionIds) if (!regIds.has(id)) erreurs.push(`région inconnue ${id} sur ${p.id}`);
    for (const id of p.ingredientIds) if (!ingIds.has(id)) erreurs.push(`ingrédient inconnu ${id} sur ${p.id}`);
    if (!p.prixIndicatif.estFictif) erreurs.push(`prix non fictif ${p.id}`);
    const v = p.prixIndicatif.valeur;
    const ok = v >= 1000 ? v % 100 === 0 : v % 50 === 0;
    if (!ok) erreurs.push(`prix non multiple ${p.id}`);
    if (p.prixIndicatif.quantitePortion < 1) erreurs.push(`portion < 1 ${p.id}`);
  }
  for (const r of recettes) {
    if (r.platId && !platIds.has(r.platId)) erreurs.push(`plat inconnu ${r.platId} sur ${r.id}`);
    for (const l of r.ingredients) if (!ingIds.has(l.ingredientId)) erreurs.push(`ingr. ${l.ingredientId} sur ${r.id}`);
  }
  for (const q of quiz) {
    for (const question of q.questions) {
      if (question.indexBonne < 0 || question.indexBonne >= question.choix.length)
        erreurs.push(`bonne réponse hors choix ${question.id}`);
    }
  }
  return erreurs;
};

if (import.meta.env?.DEV) {
  const e = validerDonnees();
  if (e.length) console.error('[sakafo] cohérence', e);
}

export {
  articles,
  auteurs,
  categories,
  contenusCulturels,
  dictionnaire,
  etablissements,
  evenements,
  faq,
  galerie,
  ingredients,
  menus,
  parcours,
  plats,
  quiz,
  recettes,
  regions,
  temoignages,
};
