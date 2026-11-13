const nf = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

export const formatAriary = (valeur: number): string =>
  `${nf.format(Math.round(valeur))}\u00A0Ar`;

export const ariaPrix = (valeur: number): string =>
  `${nf.format(Math.round(valeur))} ariary`;

export const formatNombreFr = (valeur: number, maxFrac = 1): string =>
  new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: maxFrac,
    minimumFractionDigits: 0,
  }).format(valeur);
