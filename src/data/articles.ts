import type { Article } from '@/types';

const src = (titre: string): Article['sources'][number] => ({
  titre,
  aVerifier: true,
});

const a = (
  slug: string,
  titre: string,
  sousTitre: string,
  resume: string,
  categorie: string,
  auteurId: string,
  jours: number,
  minutes: number,
  html: string,
): Article => ({
  id: `art-${slug}`,
  slug,
  titre,
  sousTitre,
  resume,
  corps: [{ html }],
  categorie,
  auteurId,
  joursDepuisAujourdhui: jours,
  minutesLecture: minutes,
  imageId: 'gal-table',
  tags: [categorie],
  populaireSimule: Math.abs(jours) + 10,
  sources: [src('À vérifier avant publication')],
  statutDonnees: 'demonstration',
});

export const articles: Article[] = [
  a('le-riz-socle', 'Le riz, socle de la table malagasy', 'Vary, kapoaka, ranon’apango', 'Le riz structure les repas. Les volumes et habitudes varient selon les maisons. Prix fictifs ailleurs sur le site.', 'gastronomie', 'aut-haja', -12, 8, '<p>Le riz est souvent au centre de la table. Cette note ne fixe pas de statistique nationale. Elle décrit des usages fréquents : vary fotsy, sosoa, ranon’apango.</p>'),
  a('romazava-national', 'Romazava : comprendre le plat national', 'Bouillon, brèdes, zébu', 'Souvent présenté comme plat national. Pas de date d’origine ici.', 'gastronomie', 'aut-lalao', -20, 7, '<p>Le romazava réunit zébu et brèdes. Les variantes existent. Les associations régionales uniques sont évitées.</p>'),
  a('ravitoto-feuilles', 'Ravitoto : pourquoi on pile les feuilles de manioc', 'Texture et cuisson longue', 'Les feuilles sont pilées puis longuement cuites, souvent avec du porc.', 'recettes', 'aut-lalao', -8, 6, '<p>Piler change la texture. La cuisson longue est nécessaire. Recette indicative dans le catalogue.</p>'),
  a('epices-grande-ile', 'Vanille, girofle, poivre sauvage : les épices de la Grande Île', 'Associations indicatives', 'SAVA et vanille, côte est et girofle : associations largement citées, à vérifier.', 'ingredients', 'aut-nivo', -30, 9, '<p>Les épices ne sont pas un décor. Les origines précises restent à relire. Le tsiperifery est distinct du poivre de table.</p>'),
  a('petit-dejeuner', 'Le petit-déjeuner malagasy : mofo gasy, vary sosoa et café', 'Le matin au marché', 'Galettes, bouillie et café sucré, tels qu’on les croise souvent.', 'recettes', 'aut-fara', -4, 5, '<p>Le mofo gasy se cuit dans des moules ronds. Le vary sosoa est une bouillie. Le café est souvent sucré.</p>'),
  a('moins-2500', 'Dix plats à moins de 2 500 Ar', 'Prix fictifs de démonstration', 'Sélection calculée sur les prix fictifs du catalogue.', 'conseils culinaires', 'aut-haja', -2, 4, '<p>Les montants sont fictifs, en Ariary. Ouvrez le catalogue avec le filtre de prix pour la liste à jour.</p>'),
  a('repas-10000', 'Composer un repas complet avec 10 000 Ar', 'Plat, accompagnement, boisson', 'Exercice sur des prix fictifs. Vérifiez toujours les allergènes.', 'conseils culinaires', 'aut-haja', -1, 5, '<p>Un repas complet combine un plat, un accompagnement et une boisson. Le générateur de menu fait le calcul. Prix fictifs.</p>'),
  a('lait-de-coco', 'Cuisiner au lait de coco : conseils et erreurs à éviter', 'Ne pas faire bouillir trop fort', 'Le lait de coco prend facilement. Feu doux.', 'recettes', 'aut-lalao', -15, 6, '<p>Ajouter le coco après la saisie. Trop de feu casse la sauce. Plats concernés : akoho, foza, makamba, trondro.</p>'),
  a('street-food', 'Street food : beignets, brochettes et gâteaux', 'Mofo, masikita, koba', 'Ce qu’on trouve souvent au bord de la route, en démonstration.', 'gastronomie', 'aut-fara', -9, 6, '<p>Les beignets se mangent chauds. Les brochettes se grillent. Le koba se coupe en tranches. Prix fictifs.</p>'),
  a('littoral', 'La cuisine du littoral : crabe, crevettes et poisson grillé', 'Coco et grillades', 'Associations côtières indicatives, localisation illustrative.', 'regions', 'aut-nivo', -18, 7, '<p>Le lait de coco revient souvent. Les emplacements sur la carte sont approximatifs.</p>'),
  a('ustensiles', 'Kapoaka et vilany : les ustensiles de la table malagasy', 'Mesure et marmite', 'Deux formes rondes, deux gestes.', 'culture', 'aut-haja', -25, 5, '<p>Le kapoaka mesure le riz. Le vilany cuit. Illustrations, pas des objets photographiés.</p>'),
  a('boissons', 'Boissons : ranon’apango, litchi, café et thé à la vanille', 'Verres et tasses', 'De l’eau de riz grillé au rhum arrangé réservé aux adultes.', 'gastronomie', 'aut-fara', -6, 5, '<p>Le ranon’apango accompagne le repas. Les jus sont de saison. Le rhum est signalé alcoolisé.</p>'),
  a('fetes-repas', 'Fêtes et repas partagés', 'Sans date inventée', 'Les repas de fête varient selon les maisons. Pas de calendrier officiel ici.', 'culture', 'aut-lalao', -40, 6, '<p>Les grandes tables existent. Cette note n’invente ni rite ni date. Voir les dossiers culture.</p>'),
  a('portrait-cuisiniere', 'Portrait (fictif) : une cuisinière de marché', 'Personnage de démonstration', 'Récit inventé, clairement marqué. Aucune personne réelle.', 'portraits', 'aut-fara', -3, 4, '<p>Mamy est un personnage de démonstration. Elle vend des mofo gasy dans un marché fictif. Ce n’est pas un reportage.</p>'),
];
