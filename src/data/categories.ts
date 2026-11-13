import type { Categorie } from '@/types';

export const categories = [
  {
    id: 'cat-plats-traditionnels',
    slug: 'plats-traditionnels',
    nom: 'Plats traditionnels',
    description:
      'Ragoûts, soupes et préparations souvent servies au quotidien, autour du riz. Les associations régionales restent indicatives.',
    couleur: '#E8EACC',
    archetypeExemples: ['bol-ragout', 'bol-soupe', 'assiette-riz'],
  },
  {
    id: 'cat-viandes',
    slug: 'viandes',
    nom: 'Viandes',
    description:
      'Préparation du zébu, du porc et du poulet, mijotés, sautés, grillés ou séchés, selon les habitudes de table.',
    couleur: '#232826',
    archetypeExemples: ['assiette-viande', 'bol-ragout', 'brochettes'],
  },
  {
    id: 'cat-poissons',
    slug: 'poissons',
    nom: 'Poissons',
    description:
      'Poissons d’eau douce ou de lagon, souvent accompagnés de riz et, sur le littoral, de lait de coco.',
    couleur: '#FDFDFB',
    archetypeExemples: ['assiette-poisson', 'bol-ragout', 'assiette-riz'],
  },
  {
    id: 'cat-fruits-de-mer',
    slug: 'fruits-de-mer',
    nom: 'Fruits de mer',
    description:
      'Crabes, crevettes, langoustes et calamars, surtout associés aux régions côtières dans cette démonstration.',
    couleur: '#E8EACC',
    archetypeExemples: ['assiette-mer', 'assiette-poisson', 'ramequin-sauce'],
  },
  {
    id: 'cat-accompagnements',
    slug: 'accompagnements',
    nom: 'Accompagnements',
    description:
      'Riz, salades, tubercules, haricots et sauces pimentées qui complètent le plat principal.',
    couleur: '#8C9C7C',
    archetypeExemples: ['assiette-riz', 'salade', 'tubercules'],
  },
  {
    id: 'cat-street-food',
    slug: 'street-food',
    nom: 'Street food',
    description:
      'Beignets, galettes, brochettes et gâteaux souvent vendus au marché ou au bord de la route.',
    couleur: '#FDFDFB',
    archetypeExemples: ['beignets', 'galette', 'brochettes'],
  },
  {
    id: 'cat-petit-dejeuner',
    slug: 'petit-dejeuner',
    nom: 'Petit-déjeuner',
    description:
      'Galettes de riz, bouillie et café, tels qu’on les croise souvent le matin au marché.',
    couleur: '#E8EACC',
    archetypeExemples: ['galette', 'bol-porridge', 'tasse'],
  },
  {
    id: 'cat-desserts',
    slug: 'desserts',
    nom: 'Desserts',
    description:
      'Gâteaux de banane, nougatine, glaces et fruits, présentés ici à titre indicatif.',
    couleur: '#8C9C7C',
    archetypeExemples: ['paquet-feuille', 'tranche-gateau', 'coupe'],
  },
  {
    id: 'cat-boissons',
    slug: 'boissons',
    nom: 'Boissons',
    description:
      'Eaux de riz grillé, jus de fruits, café, thé et, pour les adultes, un rhum arrangé de démonstration.',
    couleur: '#FDFDFB',
    archetypeExemples: ['verre', 'tasse', 'coupe'],
  },
] satisfies Categorie[];
