import type { Temoignage } from '@/types';

export const temoignages = [
  {
    id: 'tem-soa',
    prenom: 'Soa',
    texte:
      'Je feuillette le catalogue pour retrouver les noms des plats de chez moi. Les prix sont clairement marqués comme fictifs, ce qui m’évite toute confusion. Témoignage fictif.',
    statutDonnees: 'demonstration',
  },
  {
    id: 'tem-mamy',
    prenom: 'Mamy',
    texte:
      'Le mode cuisine m’aide à suivre les étapes du romazava sans quitter l’écran. Rien n’est envoyé à un serveur. Témoignage fictif.',
    statutDonnees: 'demonstration',
  },
  {
    id: 'tem-rivo',
    prenom: 'Rivo',
    texte:
      'La carte des régions reste illustrative : je clique une zone, je lis ce qui est documenté, et j’accepte les pages encore vides. Témoignage fictif.',
    statutDonnees: 'demonstration',
  },
  {
    id: 'tem-niry',
    prenom: 'Niry',
    texte:
      'J’enregistre mes plats favoris dans le navigateur. Ils restent sur cet appareil, ce qui me convient pour une démo. Témoignage fictif.',
    statutDonnees: 'demonstration',
  },
  {
    id: 'tem-haja',
    prenom: 'Haja',
    texte:
      'Le générateur de menu calcule un total en Ariary. Je vérifie toujours les allergènes de mon côté. Témoignage fictif.',
    statutDonnees: 'demonstration',
  },
  {
    id: 'tem-voahirana',
    prenom: 'Voahirana',
    texte:
      'Les noms malagasy portent une mention à relire : c’est honnête pour un site encore en démonstration. Témoignage fictif.',
    statutDonnees: 'demonstration',
  },
] as const satisfies readonly Temoignage[];
