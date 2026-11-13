import type { FaqItem } from '@/types';

export const faq: FaqItem[] = [
  { id: 'f1', theme: 'à propos du site', question: 'Sakafo Gasy est-il un restaurant ?', reponse: 'Non. C’est un site vitrine de démonstration : une carte éditoriale des plats malagasy, avec des prix fictifs en Ariary.' },
  { id: 'f2', theme: 'à propos du site', question: 'Pourquoi une mention « démonstration » partout ?', reponse: 'Parce que prix, notes, avis, établissements, événements, horaires, coordonnées et auteurs sont fictifs. Les textes culturels sont prudents et à relire.' },
  { id: 'f3', theme: 'à propos du site', question: 'Le site collecte-t-il mes données ?', reponse: 'Les favoris, le thème, la langue, les préférences, l’historique de recherche et la progression des parcours restent dans votre navigateur. Aucun outil d’analyse n’est intégré dans cette version. Polices auto-hébergées.' },
  { id: 'f4', theme: 'plats et recettes', question: 'Les recettes sont-elles des dosages officiels ?', reponse: 'Non. Elles sont indicatives. Recalculez les portions, goûtez, et vérifiez les allergènes de votre côté.' },
  { id: 'f5', theme: 'plats et recettes', question: 'Pourquoi certains plats n’ont pas de nutrition ?', reponse: 'Environ un plat sur cinq n’a pas de valeurs, volontairement, pour afficher « Information non renseignée ». Les valeurs présentes sont indicatives et fictives.' },
  { id: 'f6', theme: 'plats et recettes', question: 'Le rhum arrangé peut-il entrer dans un petit-déjeuner généré ?', reponse: 'Non. Les boissons alcoolisées sont exclues du petit-déjeuner et du goûter.' },
  { id: 'f7', theme: 'origines régionales', question: 'La carte est-elle officielle ?', reponse: 'Non. Localisation illustrative, emplacements approximatifs. Pas de contours administratifs précis.' },
  { id: 'f8', theme: 'origines régionales', question: 'Pourquoi un plat n’a pas de région ?', reponse: 'On n’associe un plat à une région que si l’association est largement connue. Sinon : « Origine régionale non renseignée ». Le romazava n’est pas collé à une seule région.' },
  { id: 'f9', theme: 'données et informations', question: 'Les prix sont-ils en Ariary ?', reponse: 'Oui, exclusivement. Format : 14 500 Ar, sans décimales. Jamais d’euros ni de dollars.' },
  { id: 'f10', theme: 'données et informations', question: 'Pourquoi « à relire » sur les noms malagasy ?', reponse: 'Un locuteur doit valider avant une publication réelle. Les noms incertains portent aussi nomMalagasyIncertain.' },
  { id: 'f11', theme: 'données et informations', question: 'Y a-t-il des fichiers audio de prononciation ?', reponse: 'Non. Aucune prononciation n’est inventée. L’espace audio est vide, volontairement.' },
  { id: 'f12', theme: 'favoris et navigation', question: 'Où sont mes favoris ?', reponse: 'Dans ce navigateur, clé sakafo:v1:. Ils ne se synchronisent pas entre appareils.' },
  { id: 'f13', theme: 'favoris et navigation', question: 'Comment ouvrir la recherche ?', reponse: 'Bouton loupe du header, ou Ctrl/Cmd + K. Accents et apostrophes sont ignorés.' },
  { id: 'f14', theme: 'favoris et navigation', question: 'Comment réduire les animations ?', reponse: 'Le site suit prefers-reduced-motion. Vous pouvez aussi forcer la réduction dans les préférences du header.' },
  { id: 'f15', theme: 'contact', question: 'Comment envoyer un message ?', reponse: 'Le formulaire ouvre votre application de messagerie avec le message préparé. Vous pouvez le relire avant de l’envoyer.' },
  { id: 'f16', theme: 'contact', question: 'Le numéro WhatsApp est-il réel ?', reponse: 'Non. Numéro de test : +261 00 000 00 00, clairement indiqué.' },
  { id: 'f17', theme: 'contact', question: 'Puis-je réserver une table ?', reponse: 'Les établissements sont fictifs. Une « réservation » n’est pas transmise.' },
  { id: 'f18', theme: 'à propos du site', question: 'Qui a écrit les textes culturels ?', reponse: 'Des auteurs fictifs, marqués personnages de démonstration. Sources à vérifier avant publication.' },
];
