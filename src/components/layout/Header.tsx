import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Compass, Heart, MagnifyingGlass, Moon, Sun, List, X } from '@phosphor-icons/react';
import { Logo } from './Logo';
import { useFavoris } from '@/stores/favoris';
import { usePreferences } from '@/stores/preferences';
import { useUi } from '@/stores/ui';
import { useTheme } from '@/hooks/useTheme';
import { spring } from '@/motion/tokens';
import type { Langue } from '@/types';

const liens = [
  { to: '/', label: 'Accueil' },
  { to: '/plats', label: 'Plats' },
  { to: '/recettes', label: 'Recettes' },
  { to: '/regions', label: 'Régions' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/culture', label: 'Culture' },
  { to: '/blog', label: 'Blog' },
];

const explorer = [
  { to: '/categories', label: 'Catégories' },
  { to: '/ingredients', label: 'Ingrédients' },
  { to: '/dictionnaire', label: 'Dictionnaire' },
  { to: '/comparateur', label: 'Comparateur' },
  { to: '/carte-gastronomique', label: 'Carte gastronomique' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/generateur-menu', label: 'Générateur de menu' },
  { to: '/plat-mystere', label: 'Plat mystère' },
  { to: '/parcours', label: 'Parcours' },
  { to: '/etablissements', label: 'Établissements' },
  { to: '/evenements', label: 'Événements' },
  { to: '/faq', label: 'FAQ' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

export const Header = () => {
  useTheme();
  const [expl, setExpl] = useState(false);
  const nFav = useFavoris((s) => s.items.length);
  const theme = usePreferences((s) => s.theme);
  const setTheme = usePreferences((s) => s.setTheme);
  const langue = usePreferences((s) => s.langue);
  const setLangue = usePreferences((s) => s.setLangue);
  const ouvrirRecherche = useUi((s) => s.ouvrirRecherche);
  const menuOuvert = useUi((s) => s.menuOuvert);
  const ouvrirMenu = useUi((s) => s.ouvrirMenu);
  useEffect(() => {
    if (!menuOuvert) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') ouvrirMenu(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOuvert, ouvrirMenu]);

  useEffect(() => {
    if (!expl) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpl(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expl]);

  const dark = theme === 'sombre' || (theme === 'systeme' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <>
      <motion.header
        className="site-header fixed top-3 inset-x-3 z-30 rounded-pill bg-elevated/95 shadow-[var(--sh-2)] backdrop-blur-md"
        animate={{ y: 0, scale: 1 }}
        transition={spring.ui}
      >
        <div className="page-shell flex items-center gap-2 px-3">
          <Logo />
          <nav className="hidden xl:flex flex-1 items-center justify-center gap-1" aria-label="Principal">
            {liens.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                  className={({ isActive }) =>
                    `site-navlink relative min-h-11 px-3 grid place-items-center rounded-pill ${isActive ? 'is-active text-riziere-900' : 'text-girofle-600'}`
                }
              >
                {({ isActive }) => (
                  <>
                      {isActive && <motion.span layoutId="navpill" className="site-nav-indicator absolute inset-x-3 bottom-1 h-0.5 rounded-pill bg-litchi-500" transition={spring.ui} />}
                    <span className="relative">{l.label}</span>
                  </>
                )}
              </NavLink>
            ))}
            <div
              className="site-explorer-trigger relative"
              onMouseEnter={() => setExpl(true)}
              onMouseLeave={() => setExpl(false)}
            >
              <button
                type="button"
                className="site-navlink min-h-11 px-3 rounded-pill flex items-center gap-1"
                aria-expanded={expl}
                aria-controls="explorer-menu"
                onClick={() => setExpl(true)}
              >
                <Compass size={18} weight="bold" /> Explorer
              </button>
              <AnimatePresence>
                {expl && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={spring.soft}
                    id="explorer-menu"
                    className="site-explorer-menu absolute right-0 top-full mt-2 w-[min(72vw,480px)] rounded-lg bg-elevated p-3 shadow-[var(--sh-3)] grid grid-cols-2 gap-1"
                  >
                    <p className="site-explorer-heading col-span-full px-3 pt-2 pb-1">Parcourir la table</p>
                    {explorer.map((e) => (
                      <NavLink key={e.to} to={e.to} onClick={() => setExpl(false)} className="site-explorer-link rounded-md px-3 py-2 min-h-11 hover:bg-riziere-100">
                        {e.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <button type="button" className="grid h-11 w-11 place-items-center rounded-circle" aria-label="Rechercher" onClick={() => ouvrirRecherche(true)}>
              <MagnifyingGlass size={20} weight="bold" />
            </button>
            <NavLink to="/favoris" className="relative grid h-11 w-11 place-items-center rounded-circle" aria-label="Favoris">
              <Heart size={20} weight="bold" />
              {nFav > 0 && (
                <span className="absolute top-1 right-1 min-w-5 h-5 rounded-circle bg-litchi-500 text-perle text-xs grid place-items-center">
                  {nFav}
                </span>
              )}
            </NavLink>
            <select
              aria-label="Langue"
              value={langue}
              onChange={(e) => setLangue(e.target.value as Langue)}
              className="hidden sm:block rounded-pill bg-riziere-100 px-3 min-h-11"
            >
              <option value="fr">FR</option>
              <option value="mg">MG</option>
              <option value="en">EN</option>
            </select>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-circle"
              aria-label="Basculer le thème"
              onClick={() => setTheme(dark ? 'clair' : 'sombre')}
            >
              {dark ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
            </button>
            <button
              type="button"
              className="xl:hidden grid h-11 w-11 place-items-center rounded-circle"
              aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOuvert}
              aria-controls="mobile-navigation"
              onClick={() => ouvrirMenu(!menuOuvert)}
            >
              {menuOuvert ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {menuOuvert && (
          <motion.div
            id="mobile-navigation"
            className="site-mobile-menu fixed inset-x-3 bottom-3 top-20 z-20 rounded-2xl bg-elevated p-6 overflow-auto xl:hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={spring.sheet}
          >
            <p className="site-mobile-menu__title">Explorez la table malagasy</p>
            <nav className="site-mobile-menu__nav grid gap-1 font-display">
              {[...liens, ...explorer].map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => ouvrirMenu(false)} className="site-mobile-menu__link min-h-11">
                  <span>{l.label}</span>
                  <span aria-hidden="true">↗</span>
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
