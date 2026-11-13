import { traductions } from '@/data/traductions';
import { usePreferences } from '@/stores/preferences';

export const useT = () => {
  const langue = usePreferences((s) => s.langue);
  return (cle: string, vars?: Record<string, string | number>) => {
    const pack = traductions[langue] ?? traductions.fr;
    let raw = pack[cle] ?? traductions.fr[cle];
    const fallback = !pack[cle] && langue !== 'fr';
    if (!raw) return cle;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        raw = raw.replace(`{${k}}`, String(v));
      }
    }
    return fallback ? `${raw}` : raw;
  };
};

export const useTraductionEnCours = (cle: string) => {
  const langue = usePreferences((s) => s.langue);
  if (langue === 'fr') return false;
  return !(traductions[langue]?.[cle]);
};
