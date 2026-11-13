import type { Evenement } from '@/types';

const ev = (
  slug: string,
  titre: string,
  description: string,
  type: string,
  regionId: string,
  lieu: string,
  jours: number,
  programme: string[],
  tarifAr?: number,
): Evenement => ({
  id: `eve-${slug}`,
  slug,
  titre,
  description,
  type,
  regionId,
  lieu,
  joursDepuisAujourdhui: jours,
  heure: '10:00',
  programme,
  intervenants: ['Personnage fictif A', 'Personnage fictif B'],
  tarifAr,
  gratuit: tarifAr === undefined,
  statutDonnees: 'demonstration',
});

export const evenements: Evenement[] = [
  ev('marche-gourmand', 'Marché gourmand de la Grande Île', 'Événement fictif : stands de démonstration, prix fictifs.', 'marché', 'reg-analamanga', '12 rue de la Démo, Antananarivo (adresse fictive)', 12, ['Ouverture', 'Dégustations simulées', 'Clôture'], 5000),
  ev('atelier-romazava', 'Atelier romazava en famille', 'Atelier fictif, aucune inscription réelle.', 'atelier', 'reg-analamanga', '12 rue de la Démo, Antananarivo (adresse fictive)', 20, ['Présentation', 'Cuisson', 'Dégustation simulée'], 15000),
  ev('salon-vanille', 'Salon de la vanille (démo)', 'Salon fictif à Sambava.', 'salon', 'reg-sava', '12 rue de la Démo, Sambava (adresse fictive)', 35, ['Stands', 'Table ronde fictive'], 8000),
  ev('fete-riz', 'Fête du riz (démo)', 'Fête fictive autour du riz.', 'fête', 'reg-alaotra-mangoro', '12 rue de la Démo, Ambatondrazaka (adresse fictive)', 48, ['Parcours pédagogique', 'Ateliers'], undefined),
  ev('soiree-kitoza', 'Soirée kitoza et brochettes', 'Soirée fictive passée.', 'soirée', 'reg-atsinanana', '12 rue de la Démo, Toamasina (adresse fictive)', -10, ['Grillades simulées', 'Musique de démonstration'], 12000),
  ev('festival-litchi', 'Festival du litchi (démo)', 'Festival fictif hors saison réelle.', 'festival', 'reg-atsinanana', '12 rue de la Démo, Toamasina (adresse fictive)', -40, ['Marché', 'Jus'], 3000),
  ev('cours-koba', 'Cours de cuisine : koba et mokary', 'Cours fictif.', 'cours', 'reg-vakinankaratra', '12 rue de la Démo, Antsirabe (adresse fictive)', -20, ['Koba', 'Mokary'], 10000),
  ev('rencontre-cuisiniers', 'Rencontre des cuisiniers (démo)', 'Rencontre fictive, pas de partenaires réels.', 'rencontre', 'reg-boeny', '12 rue de la Démo, Mahajanga (adresse fictive)', -5, ['Présentations', 'Table ronde'], undefined),
];
