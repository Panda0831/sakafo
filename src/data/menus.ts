import type { MenuSuggere } from '@/types';

export const menus = [
  {
    id: 'menu-dejeuner-dimanche',
    slug: 'dejeuner-du-dimanche',
    nom: 'Déjeuner du dimanche',
    typeRepas: 'dejeuner',
    platIds: {
      plat: 'plat-romazava',
      accompagnement: 'plat-vary-fotsy',
      dessert: 'plat-koba-akondro',
      boisson: 'plat-ranon-apango',
    },
  },
  {
    id: 'menu-petit-dejeuner-marche',
    slug: 'petit-dejeuner-du-marche',
    nom: 'Petit-déjeuner du marché',
    typeRepas: 'petit-dejeuner',
    platIds: {
      plat: 'plat-mofo-gasy',
      accompagnement: 'plat-vary-sosoa',
      boisson: 'plat-kafe-gasy',
    },
  },
  {
    id: 'menu-table-littoral',
    slug: 'table-du-littoral',
    nom: 'Table du littoral',
    typeRepas: 'diner',
    platIds: {
      entree: 'plat-lasary-voatabia',
      plat: 'plat-foza-sy-voanio',
      accompagnement: 'plat-vary-fotsy',
      dessert: 'plat-glace-noix-de-coco',
      boisson: 'plat-jus-de-litchi',
    },
  },
  {
    id: 'menu-gouter-sucre',
    slug: 'gouter-sucre',
    nom: 'Goûter sucré',
    typeRepas: 'gouter',
    platIds: {
      dessert: 'plat-mokary',
      plat: 'plat-koba-akondro',
      boisson: 'plat-jus-de-mangue',
    },
  },
] as const satisfies readonly MenuSuggere[];
