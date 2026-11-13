import { plats } from '@/data/plats';
import type { CriteresMenu, ElementMenu, MenuGenere, Plat, RoleMenu, TypePlat } from '@/types';
import { prixPortion } from './prix.service';

const roleVersType = (role: RoleMenu, typeRepas: CriteresMenu['typeRepas']): TypePlat[] => {
  if (role === 'entree') return ['snack', 'accompagnement'];
  if (role === 'plat') {
    if (typeRepas === 'petit-dejeuner') return ['petit-dejeuner', 'snack'];
    if (typeRepas === 'gouter') return ['dessert', 'snack'];
    return ['plat'];
  }
  if (role === 'accompagnement') return ['accompagnement'];
  if (role === 'dessert') return ['dessert', 'snack'];
  return ['boisson'];
};

const exclure = (p: Plat, c: CriteresMenu): boolean => {
  const ids = p.ingredientIds.join(' ');
  if (c.sansViande && (ids.includes('zebu') || ids.includes('porc') || ids.includes('poulet') || p.categorieIds.includes('cat-viandes')))
    return true;
  if (c.sansPorc && (ids.includes('porc') || p.slug.includes('henakisoa') || p.slug.includes('kisoa')))
    return true;
  if (c.sansPoisson && (p.categorieIds.includes('cat-poissons') || p.categorieIds.includes('cat-fruits-de-mer')))
    return true;
  if (c.sansArachide && (ids.includes('arachide') || ids.includes('voanjo') || p.slug.includes('koba') || p.slug.includes('lakroa')))
    return true;
  if (c.ingredientsEvites?.some((id) => p.ingredientIds.includes(id))) return true;
  if (c.regionId && c.regionId.length > 0 && p.regionIds.length > 0 && !p.regionIds.includes(c.regionId))
    return false;
  if (p.contientAlcool && (c.typeRepas === 'petit-dejeuner' || c.typeRepas === 'gouter')) return true;
  return false;
};

const tirer = (candidats: Plat[], deja: Set<string>): Plat | undefined => {
  const pool = candidats.filter((p) => !deja.has(p.id));
  if (!pool.length) return candidats[0];
  return pool[Math.floor(Math.random() * pool.length)];
};

const rolesPour = (type: CriteresMenu['typeRepas']): RoleMenu[] => {
  if (type === 'petit-dejeuner') return ['plat', 'boisson'];
  if (type === 'gouter') return ['dessert', 'boisson'];
  return ['entree', 'plat', 'accompagnement', 'dessert', 'boisson'];
};

export const genererMenu = (criteres: CriteresMenu): MenuGenere => {
  const roles = rolesPour(criteres.typeRepas);
  const deja = new Set<string>();
  const elements: ElementMenu[] = [];
  const manquants: RoleMenu[] = [];

  for (const role of roles) {
    const types = roleVersType(role, criteres.typeRepas);
    let pool = plats.filter((p) => types.includes(p.typePlat) && !exclure(p, criteres));
    if (criteres.budgetAr) {
      const reste = criteres.budgetAr - elements.reduce((s, e) => s + prixPortion(e.plat), 0);
      const sousBudget = pool.filter((p) => prixPortion(p) <= reste);
      if (sousBudget.length) pool = sousBudget;
    }
    if (criteres.regionId) {
      const loc = pool.filter((p) => p.regionIds.includes(criteres.regionId!) || p.regionIds.length === 0);
      if (loc.length) pool = loc;
    }
    const choisi = tirer(pool, deja);
    if (!choisi) {
      manquants.push(role);
      continue;
    }
    deja.add(choisi.id);
    elements.push({ role, plat: choisi });
  }

  const totalPortion = elements.reduce((s, e) => s + prixPortion(e.plat), 0);
  let message: string | undefined;
  if (manquants.length) {
    message = `Aucun plat ne convient pour : ${manquants.join(', ')}. Assouplissez une préférence alimentaire ou le budget.`;
  } else if (criteres.budgetAr && totalPortion * criteres.personnes > criteres.budgetAr) {
    message = 'Le total dépasse le budget indiqué. Augmentez le budget ou retirez un service.';
  }

  return {
    elements,
    totalPortion,
    totalPersonnes: totalPortion * criteres.personnes,
    message,
  };
};

export const remplacerElement = (menu: MenuGenere, role: RoleMenu, criteres: CriteresMenu): MenuGenere => {
  const sans = {
    ...menu,
    elements: menu.elements.filter((e) => e.role !== role),
  };
  const partiel = genererMenu(criteres);
  const neuf = partiel.elements.find((e) => e.role === role);
  const elements = menu.elements.map((e) => (e.role === role && neuf ? neuf : e));
  const totalPortion = elements.reduce((s, e) => s + prixPortion(e.plat), 0);
  return {
    elements,
    totalPortion,
    totalPersonnes: totalPortion * criteres.personnes,
    message: sans.message,
  };
};
