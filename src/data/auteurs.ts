import type { Auteur } from '@/types';

export const auteurs = [
  {
    id: 'aut-haja',
    nom: 'Haja Rasoanaivo',
    bio: 'Personnage de démonstration. Rédaction générale sur la table malagasy, sans prétendre à une enquête de terrain.',
    estFictif: true as const,
  },
  {
    id: 'aut-lalao',
    nom: 'Lalao Randrianarisoa',
    bio: 'Personnage de démonstration. Textes de cuisine familiale et de recettes indicatives.',
    estFictif: true as const,
  },
  {
    id: 'aut-nivo',
    nom: 'Nivo Andriamihaja',
    bio: 'Personnage de démonstration. Notes sur les produits du terroir, à relire avant publication.',
    estFictif: true as const,
  },
  {
    id: 'aut-fara',
    nom: 'Fara Rakoto',
    bio: 'Personnage de démonstration. Street food, marchés et petits déjeuners, contenus fictifs.',
    estFictif: true as const,
  },
] as const satisfies readonly Auteur[];
