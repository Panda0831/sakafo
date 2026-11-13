import type { Plat } from '@/types';

export const prixPortion = (plat: Plat): number =>
  plat.prixIndicatif.valeur * plat.prixIndicatif.quantitePortion;

export const totalPourPersonnes = (plat: Plat, n: number): number =>
  prixPortion(plat) * Math.max(1, n);

export type TranchePrix = 'petits-prix' | 'repas-simple' | 'table-soignee' | 'grande-table';

export const tranche = (prix: number): TranchePrix => {
  if (prix <= 2500) return 'petits-prix';
  if (prix <= 9000) return 'repas-simple';
  if (prix <= 20000) return 'table-soignee';
  return 'grande-table';
};

export const plageDePrix = (plats: Plat[]): { min: number; max: number } => {
  const vals = plats.map(prixPortion);
  return { min: Math.min(...vals), max: Math.max(...vals) };
};

export const histogramme = (plats: Plat[], pas = 2500): { debut: number; fin: number; n: number }[] => {
  const { min, max } = plageDePrix(plats);
  const debut = Math.floor(min / pas) * pas;
  const bars: { debut: number; fin: number; n: number }[] = [];
  for (let d = debut; d <= max; d += pas) {
    const fin = d + pas;
    bars.push({
      debut: d,
      fin,
      n: plats.filter((p) => {
        const v = prixPortion(p);
        return v >= d && v < fin;
      }).length,
    });
  }
  return bars;
};

export const repasComplet = (
  plats: Plat[],
): { total: number; plat?: Plat; accompagnement?: Plat; boisson?: Plat } => {
  const pick = (type: Plat['typePlat']) =>
    plats
      .filter((p) => p.typePlat === type && !p.contientAlcool)
      .sort((a, b) => prixPortion(a) - prixPortion(b))[0];
  const plat = pick('plat');
  const accompagnement = pick('accompagnement');
  const boisson = pick('boisson');
  const total =
    (plat ? prixPortion(plat) : 0) +
    (accompagnement ? prixPortion(accompagnement) : 0) +
    (boisson ? prixPortion(boisson) : 0);
  return { total, plat, accompagnement, boisson };
};

export const platsDansBudget = (plats: Plat[], budget: number): Plat[] =>
  plats.filter((p) => prixPortion(p) <= budget);
