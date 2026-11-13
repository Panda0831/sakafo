import type { ContenuCulturel } from '@/types';

const c = (
  slug: string,
  titre: string,
  theme: string,
  introduction: string,
  html: string,
): ContenuCulturel => ({
  id: `cul-${slug}`,
  slug,
  titre,
  theme,
  introduction,
  sections: [
    { id: 's1', titre: 'Repères', html },
    { id: 's2', titre: 'Limites de cette fiche', html: '<p>Texte prudent, sans date ni statistique inventée. Sources à vérifier avant publication.</p>' },
  ],
  imageId: 'gal-table',
  auteurId: 'aut-haja',
  sources: [{ titre: 'À vérifier avant publication', aVerifier: true }],
  statutDonnees: 'partiel',
});

export const contenusCulturels: ContenuCulturel[] = [
  c('histoire-cuisine', 'Histoire de la cuisine', 'histoire de la cuisine', 'La cuisine malagasy s’est formée au fil des échanges et des habitudes locales. Cette fiche ne fixe pas de chronologie.', '<p>Les plats du catalogue sont présentés comme on les rencontre souvent aujourd’hui, sans origine datée.</p>'),
  c('place-du-riz', 'Place du riz dans l’alimentation', 'place du riz', 'Le riz structure beaucoup de repas. Les quantités varient selon les maisons.', '<p>Vary fotsy, sosoa, ranon’apango : trois gestes autour du même grain.</p>'),
  c('traditions-repas', 'Traditions des repas', 'traditions des repas', 'Les horaires et la composition d’un repas ne sont pas uniformes.', '<p>On décrit des usages fréquents : riz au centre, accompagnement, sakay à part. Rien n’est présenté comme une règle unique.</p>'),
  c('cuisine-familiale', 'Cuisine familiale', 'cuisine familiale', 'La transmission se fait souvent à la maison, par la pratique.', '<p>Les recettes du site sont indicatives. Les doses réelles dépendent de chaque vilany.</p>'),
  c('produits-terroir', 'Produits du terroir', 'produits du terroir', 'Vanille, girofle, litchi, riz : associations régionales largement citées, à relire.', '<p>Une région sans produit documenté reste vide. On n’invente pas.</p>'),
  c('techniques', 'Techniques de préparation', 'techniques', 'Mijoter, griller, piler, fumer : gestes distincts.', '<p>Le ravitoto se pile. Le kitoza se fume ou se sèche. Le mofo se cuit dans un moule rond.</p>'),
  c('ustensiles', 'Ustensiles traditionnels', 'ustensiles traditionnels', 'Kapoaka et vilany reviennent souvent.', '<p>Illustrations vectorielles, pas des photos d’objets muséaux.</p>'),
  c('cuisine-regions', 'Cuisine des régions', 'cuisine des régions', 'Le littoral et les Hauts Plateaux ne cuisinent pas toujours les mêmes sauces.', '<p>Les liens plat-région du site sont limités aux associations largement connues.</p>'),
  c('fetes', 'Fêtes et occasions particulières', 'fêtes', 'Les repas de fête existent. Aucun calendrier officiel n’est inventé ici.', '<p>Voir aussi l’article correspondant, rédigé avec la même prudence.</p>'),
  c('transmission', 'Transmission des savoir-faire', 'transmission', 'On apprend en regardant cuire, plus qu’en lisant.', '<p>Le mode cuisine du site est un outil pédagogique, pas un substitut à une transmission réelle.</p>'),
];
