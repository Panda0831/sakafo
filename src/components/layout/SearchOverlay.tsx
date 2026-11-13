import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { useUi } from '@/stores/ui';
import { rechercher } from '@/services/recherche.service';
import { formatAriary } from '@/utils/formatAriary';
import { spring } from '@/motion/tokens';
import { useT } from '@/hooks/useT';

export const SearchOverlay = () => {
  const ouverte = useUi((s) => s.rechercheOuverte);
  const fermer = useUi((s) => s.ouvrirRecherche);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const t = useT();
  const resultats = useMemo(() => rechercher(q), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        fermer(!ouverte);
      }
      if (e.key === 'Escape') fermer(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fermer, ouverte]);

  const aller = (type: string, slug: string) => {
    const map: Record<string, string> = {
      plat: `/plats/${slug}`,
      recette: `/recettes/${slug}`,
      region: `/regions/${slug}`,
      ingredient: `/ingredients/${slug}`,
      article: `/blog/${slug}`,
      etablissement: `/etablissements/${slug}`,
    };
    fermer(false);
    setQ('');
    navigate(map[type] ?? '/');
  };

  return (
    <AnimatePresence>
      {ouverte && (
        <motion.div
          className="fixed inset-0 z-40 grid place-items-start bg-riziere-900/40 p-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => fermer(false)}
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-label="Recherche"
            initial={{ y: 20, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={spring.sheet}
            className="w-full max-w-2xl rounded-xl bg-elevated p-4 shadow-[var(--sh-3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-field flex items-center gap-2 rounded-pill bg-riziere-100 px-4">
              <MagnifyingGlass size={20} weight="bold" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('rechercher')}
                className="search-field__input min-h-12 w-full bg-transparent text-base"
              />
              {q && (
                <button type="button" className="min-h-11 min-w-11" aria-label="Effacer" onClick={() => setQ('')}>
                  <X size={18} weight="bold" />
                </button>
              )}
            </div>
            <ul className="mt-3 max-h-[50vh] overflow-auto space-y-1">
              {q && resultats.length === 0 && <li className="p-4 text-girofle-600">Aucun résultat. Essayez un nom de plat ou un ingrédient.</li>}
              {resultats.map((r) => (
                <li key={`${r.type}-${r.id}`}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left hover:bg-riziere-100 min-h-11"
                    onClick={() => aller(r.type, r.slug)}
                  >
                    <span>
                      <span className="rounded-pill bg-riziere-100 px-2 py-0.5 text-sm mr-2">{r.type}</span>
                      {r.titre}
                      {r.sousTitre && <span className="text-girofle-600"> — {r.sousTitre}</span>}
                    </span>
                    {r.prixAr !== undefined && <span className="font-display">{formatAriary(r.prixAr)}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
