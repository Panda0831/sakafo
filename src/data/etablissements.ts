import type { Etablissement } from '@/types';

const demo = {
  telephone: '+261 00 000 00 00',
  email: 'demo@exemple.invalid',
  reseaux: [{ nom: 'Instagram (démo)', url: '#' }],
  noteEstFictive: true as const,
  statutDonnees: 'demonstration' as const,
};

const e = (
  slug: string,
  nom: string,
  ville: string,
  regionId: string,
  description: string,
  specialites: string[],
  platIds: string[],
  lat: number,
  lon: number,
  note: number,
): Etablissement => ({
  id: `eta-${slug}`,
  slug,
  nom,
  ville,
  regionId,
  description,
  specialites,
  platIds,
  prixCarte: platIds.map((id, i) => ({
    platId: id,
    valeur: 1000 + i * 500,
  })),
  adresse: `12 rue de la Démo, ${ville} (adresse fictive)`,
  horaires: '11:00–14:30 et 18:00–21:30 (horaires fictifs)',
  lat,
  lon,
  note,
  ...demo,
});

export const etablissements: Etablissement[] = [
  e('table-zoma', 'La Table du Zoma', 'Antananarivo', 'reg-analamanga', 'Établissement fictif de démonstration. Carte autour du riz et des ragoûts.', ['romazava', 'ravitoto'], ['plat-romazava', 'plat-ravitoto-sy-henakisoa', 'plat-vary-fotsy', 'plat-sakay', 'plat-ranon-apango', 'plat-mofo-gasy'], -18.91, 47.52, 4.4),
  e('hotely-mamy', 'Hotely Mamy', 'Antsirabe', 'reg-vakinankaratra', 'Petit hotely fictif, plats du jour simulés.', ['vary', 'lasopy'], ['plat-lasopy', 'plat-vary-amin-anana', 'plat-vary-fotsy', 'plat-lasary-voatabia', 'plat-kafe-gasy', 'plat-mokary'], -19.87, 47.03, 4.1),
  e('baobab', 'Le Baobab Gourmand', 'Morondava', 'reg-menabe', 'Table fictive tournée vers le littoral ouest.', ['grillades'], ['plat-poisson-grille-lagon', 'plat-vary-fotsy', 'plat-lasary-karaoty', 'plat-jus-de-mangue', 'plat-glace-noix-de-coco', 'plat-masikita'], -20.28, 44.32, 4.3),
  e('mama-vanille', 'Chez Mama Vanille', 'Sambava', 'reg-sava', 'Démo autour de la vanille. Aucun lien avec un commerce réel.', ['vanille'], ['plat-langouste-grillee', 'plat-the-vanille', 'plat-gateau-vanille', 'plat-rhum-arrange', 'plat-akoho-sy-voanio', 'plat-vary-fotsy'], -14.27, 50.17, 4.5),
  e('lagon-epice', 'Le Lagon Épicé', 'Nosy Be', 'reg-diana', 'Fruits de mer fictifs, Nosy Be comme indication de zone.', ['crabe', 'crevettes'], ['plat-foza-sy-voanio', 'plat-makamba-sy-voanio', 'plat-calamars-saute', 'plat-vary-fotsy', 'plat-jus-passion', 'plat-sakay'], -13.32, 48.26, 4.6),
  e('riziere-cie', 'Rizière et Compagnie', 'Ambatondrazaka', 'reg-alaotra-mangoro', 'Démo rizicole. Pas d’exploitation réelle.', ['riz'], ['plat-vary-fotsy', 'plat-vary-sosoa', 'plat-vary-amin-anana', 'plat-ranon-apango', 'plat-mofo-gasy', 'plat-lasopy'], -17.83, 48.42, 4.0),
  e('kitoza-corner', 'Kitoza Corner', 'Toamasina', 'reg-atsinanana', 'Street food fictive du port.', ['kitoza', 'brochettes'], ['plat-kitoza', 'plat-masikita', 'plat-sambos', 'plat-mofo-anana', 'plat-jus-de-litchi', 'plat-lakroa'], -18.15, 49.41, 4.2),
  e('ancre-rouge', 'L’Ancre Rouge', 'Mahajanga', 'reg-boeny', 'Poisson et coco, établissement fictif.', ['poisson', 'coco'], ['plat-trondro-sy-voanio', 'plat-akoho-sy-voanio', 'plat-poisson-grille-lagon', 'plat-vary-fotsy', 'plat-jus-de-mangue', 'plat-mokary'], -15.72, 46.32, 4.3),
];
