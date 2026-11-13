import { ariaPrix, formatAriary } from '@/utils/formatAriary';
import { cn } from '@/utils/cn';
import type { Unite } from '@/types';

const unites: Record<Unite, string> = {
  portion: 'la portion',
  pièce: 'la pièce',
  brochette: 'la brochette',
  verre: 'le verre',
  tasse: 'la tasse',
  sachet: 'le sachet',
};

export const Prix = ({
  valeur,
  unite,
  estFictif,
  variante = 'carte',
}: {
  valeur: number;
  unite?: Unite;
  estFictif: true;
  variante?: 'carte' | 'fiche' | 'liste' | 'total' | 'sticker';
}) => {
  const label = ariaPrix(valeur);
  const cls = {
    carte: 'inline-flex items-baseline gap-1 rounded-pill bg-ylang-400 text-girofle-900 px-3 py-1 font-display tabular-nums shadow-[var(--sh-1)]',
    fiche: 'inline-flex items-baseline gap-1 rounded-pill bg-ylang-400 text-girofle-900 px-4 py-2 font-display text-3xl tabular-nums',
    liste: 'font-display tabular-nums text-girofle-900 bg-ylang-100 rounded-pill px-2 py-0.5',
    total: 'inline-flex items-baseline gap-2 rounded-pill bg-ylang-400 text-girofle-900 px-4 py-2 font-display text-2xl tabular-nums',
    sticker:
      'inline-flex items-baseline gap-1 rounded-lg bg-ylang-400 text-girofle-900 px-4 py-2 font-display text-xl tabular-nums shadow-[var(--sh-2)] rotate-6',
  }[variante];

  return (
    <span className={cn(cls)} title={estFictif ? 'Prix fictif de démonstration' : undefined} aria-label={label}>
      {formatAriary(valeur).replace('\u00A0Ar', '')}
      <span className="text-[0.65em] font-sans font-semibold">Ar</span>
      {unite && variante !== 'sticker' && <span className="ml-1 text-[0.7em] font-sans font-normal opacity-80">{unites[unite]}</span>}
      {(variante === 'fiche' || variante === 'total') && (
        <span className="ml-2 rounded-pill bg-lagon-100 text-lagon-500 px-2 py-0.5 text-[0.7rem] font-sans">fictif</span>
      )}
    </span>
  );
};
