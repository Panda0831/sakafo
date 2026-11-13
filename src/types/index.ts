export type Langue = 'fr' | 'mg' | 'en';
export type Theme = 'clair' | 'sombre' | 'systeme';
export type StatutDonnees = 'verifie' | 'demonstration' | 'partiel';
export type Unite = 'portion' | 'pièce' | 'brochette' | 'verre' | 'tasse' | 'sachet';
export type TypePlat =
  | 'plat'
  | 'accompagnement'
  | 'snack'
  | 'petit-dejeuner'
  | 'dessert'
  | 'boisson';
export type ModePreparation =
  | 'mijoté'
  | 'grillé'
  | 'frit'
  | 'bouilli'
  | 'cru'
  | 'séché ou fumé'
  | 'sauté';
export type Difficulte = 'facile' | 'moyen' | 'difficile';
export type FamilleIngredient =
  | 'legumes'
  | 'viandes'
  | 'poissons-fruits-de-mer'
  | 'cereales-feculents'
  | 'epices-aromates'
  | 'fruits'
  | 'produits-transformes'
  | 'autres';
export type ZoneIllustrative =
  | 'Hauts Plateaux'
  | 'Est'
  | 'Nord-Est'
  | 'Nord'
  | 'Nord-Ouest'
  | 'Ouest'
  | 'Sud-Ouest'
  | 'Sud'
  | 'Sud-Est';
export type ArchetypeVisuel =
  | 'bol-ragout'
  | 'bol-soupe'
  | 'bol-porridge'
  | 'assiette-riz'
  | 'assiette-viande'
  | 'assiette-poisson'
  | 'assiette-mer'
  | 'brochettes'
  | 'beignets'
  | 'galette'
  | 'paquet-feuille'
  | 'tubercules'
  | 'salade'
  | 'ramequin-sauce'
  | 'tranche-gateau'
  | 'verre'
  | 'tasse'
  | 'coupe';
export type TypeGalerie =
  | 'plat'
  | 'ingredient'
  | 'etape'
  | 'ustensile'
  | 'table'
  | 'evenement';
export type RoleMenu = 'entree' | 'plat' | 'accompagnement' | 'dessert' | 'boisson';
export type TypeFavori = 'plat' | 'recette' | 'article' | 'ingredient';
export type TypeRepas = 'petit-dejeuner' | 'dejeuner' | 'diner' | 'gouter';

export interface PrixIndicatif {
  valeur: number;
  devise: 'MGA';
  unite: Unite;
  quantitePortion: number;
  estFictif: true;
}

export interface NomLocalise {
  malagasy: string;
  francais?: string;
  anglais?: string;
}

export interface PalettePlat {
  assiette: string;
  base: string;
  accent1: string;
  accent2: string;
  ombre: string;
}

export interface PhotoPlat {
  src: string;
  alt: string;
  source?: string;
  credit: string;
  license?: string;
  licenseUrl?: string;
  illustrative?: boolean;
}

export interface Nutrition {
  calories?: number;
  proteines?: number;
  glucides?: number;
  lipides?: number;
  source?: string;
  estIndicatif: true;
}

export interface SourceRef {
  titre: string;
  url?: string;
  organisme?: string;
  aVerifier: true;
}

export interface Plat {
  id: string;
  slug: string;
  nom: NomLocalise;
  nomMalagasyIncertain?: boolean;
  aRelire?: boolean;
  description: string;
  phraseAccroche: string;
  histoire?: string;
  categorieIds: string[];
  regionIds: string[];
  ingredientIds: string[];
  typePlat: TypePlat;
  modePreparation?: ModePreparation;
  archetype: ArchetypeVisuel;
  palette: PalettePlat;
  photo?: PhotoPlat;
  galerie: string[];
  tempsPreparation?: number;
  tempsCuisson?: number;
  difficulte?: Difficulte;
  chaud: boolean;
  contientAlcool?: boolean;
  nutrition?: Nutrition;
  prixIndicatif: PrixIndicatif;
  popularite: number;
  note?: number;
  noteEstFictive: true;
  tags: string[];
  estVedette: boolean;
  estNouveau?: boolean;
  statutDonnees: StatutDonnees;
  sources?: SourceRef[];
}

export interface Categorie {
  id: string;
  slug: string;
  nom: string;
  description: string;
  couleur: string;
  archetypeExemples: [ArchetypeVisuel, ArchetypeVisuel, ArchetypeVisuel];
}

export interface Region {
  id: string;
  slug: string;
  nom: string;
  cheflieu: string;
  zoneIllustrative: ZoneIllustrative;
  lat: number;
  lon: number;
  produitsLocaux: string[];
  platIds: string[];
  ingredientIds: string[];
  recetteIds: string[];
  articleIds: string[];
  description: string;
  statutDonnees: 'partiel';
}

export interface Ingredient {
  id: string;
  slug: string;
  nom: { malagasy?: string; francais: string };
  autresNoms?: string[];
  famille: FamilleIngredient;
  description: string;
  usages: string[];
  origine?: string;
  saison?: string;
  conservation?: string;
  prixIndicatif: {
    valeur: number;
    devise: 'MGA';
    unite: 'kg' | 'botte' | 'pièce' | 'litre' | 'sachet';
    estFictif: true;
  };
  aRelire?: boolean;
  statutDonnees: 'demonstration' | 'partiel';
}

export interface LigneIngredient {
  ingredientId: string;
  quantite: number;
  unite: string;
  note?: string;
}

export interface EtapeRecette {
  titre?: string;
  description: string;
  dureeMinutes?: number;
  conseil?: string;
  imageId?: string;
}

export interface Recette {
  id: string;
  slug: string;
  nom: string;
  platId?: string;
  description: string;
  portionsOrigine: number;
  tempsPreparation: number;
  tempsCuisson: number;
  difficulte: Difficulte;
  ingredients: LigneIngredient[];
  etapes: EtapeRecette[];
  ustensiles: string[];
  conseilsChef: string[];
  erreursAEviter: string[];
  suggestionsPresentation: string[];
  allergenes?: string[];
  tags: string[];
  estVedette: boolean;
  popularite: number;
  statutDonnees: 'demonstration' | 'partiel';
  aRelire?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  titre: string;
  sousTitre: string;
  resume: string;
  corps: { titre?: string; html: string }[];
  categorie: string;
  auteurId: string;
  joursDepuisAujourdhui: number;
  minutesLecture: number;
  imageId: string;
  tags: string[];
  populaireSimule: number;
  sources: SourceRef[];
  statutDonnees: 'demonstration';
}

export interface ContenuCulturel {
  id: string;
  slug: string;
  titre: string;
  theme: string;
  introduction: string;
  sections: { id: string; titre: string; html: string }[];
  imageId: string;
  auteurId: string;
  sources: SourceRef[];
  statutDonnees: 'demonstration' | 'partiel';
}

export interface VisuelGalerie {
  id: string;
  type: TypeGalerie;
  legend: string;
  alt: string;
  src?: string;
  platId?: string;
  regionId?: string;
  categorieId?: string;
  archetype: ArchetypeVisuel | 'ustensile' | 'scene';
  crop: 'detail' | 'large' | 'rond';
  palette?: PalettePlat;
}

export interface Etablissement {
  id: string;
  slug: string;
  nom: string;
  ville: string;
  regionId: string;
  description: string;
  specialites: string[];
  platIds: string[];
  prixCarte: { platId: string; valeur: number }[];
  adresse: string;
  telephone: string;
  email: string;
  horaires: string;
  note: number;
  noteEstFictive: true;
  reseaux: { nom: string; url: string }[];
  lat: number;
  lon: number;
  statutDonnees: 'demonstration';
}

export interface Evenement {
  id: string;
  slug: string;
  titre: string;
  description: string;
  type: string;
  regionId: string;
  lieu: string;
  joursDepuisAujourdhui: number;
  heure: string;
  programme: string[];
  intervenants: string[];
  tarifAr?: number;
  gratuit?: boolean;
  statutDonnees: 'demonstration';
}

export interface TermeDictionnaire {
  id: string;
  terme: string;
  traduction: string;
  definition: string;
  exemple: string;
  categorie: string;
  platIds?: string[];
  ingredientIds?: string[];
  recetteIds?: string[];
  aRelire: true;
}

export interface QuestionQuiz {
  id: string;
  enonce: string;
  choix: string[];
  indexBonne: number;
  explication: string;
  aRelire: true;
}

export interface Quiz {
  id: string;
  slug: string;
  titre: string;
  description: string;
  theme: string;
  niveau: 'facile' | 'moyen' | 'difficile';
  dureeMinutes: number;
  questions: QuestionQuiz[];
}

export interface EtapeParcours {
  id: string;
  titre: string;
  description: string;
  platId?: string;
  ingredientId?: string;
  regionId?: string;
  recetteId?: string;
}

export interface Parcours {
  id: string;
  slug: string;
  titre: string;
  description: string;
  dureeMinutes: number;
  niveau: string;
  etapes: EtapeParcours[];
}

export interface MenuSuggere {
  id: string;
  slug: string;
  nom: string;
  typeRepas: TypeRepas;
  platIds: Partial<Record<RoleMenu, string>>;
}

export interface Temoignage {
  id: string;
  prenom: string;
  texte: string;
  statutDonnees: 'demonstration';
}

export interface Auteur {
  id: string;
  nom: string;
  bio: string;
  estFictif: true;
}

export interface FaqItem {
  id: string;
  theme: string;
  question: string;
  reponse: string;
}

export interface FiltresPlats {
  q?: string;
  cat?: string[];
  region?: string[];
  ing?: string[];
  type?: TypePlat[];
  mode?: ModePreparation[];
  diff?: Difficulte[];
  pmin?: number;
  pmax?: number;
  pop?: number;
  vedette?: boolean;
  tri?: string;
  vue?: 'cartes' | 'carte-menu';
  page?: number;
}

export interface CriteresMenu {
  typeRepas: TypeRepas;
  personnes: number;
  sansViande?: boolean;
  sansPorc?: boolean;
  sansPoisson?: boolean;
  sansArachide?: boolean;
  ingredientsEvites?: string[];
  budgetAr?: number;
  regionId?: string;
}

export interface ElementMenu {
  role: RoleMenu;
  plat: Plat;
}

export interface MenuGenere {
  elements: ElementMenu[];
  totalPortion: number;
  totalPersonnes: number;
  message?: string;
}
