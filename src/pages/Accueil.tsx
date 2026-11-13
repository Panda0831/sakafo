import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Seo } from '@/components/ui/Seo';
import { Island } from '@/components/ui/Island';
import { Button } from '@/components/ui/Button';
import { BudgetRange } from '@/components/ui/BudgetRange';
import { FoodCard } from '@/components/cards/FoodCard';
import { HeroRoue } from './accueil/HeroRoue';
import { CarteMadagascar } from '@/components/map/CarteMadagascar';
import { DishArt } from '@/components/dish/DishArt';
import { listerPlats, vedettes } from '@/services/plats.service';
import { platsDansBudget, repasComplet } from '@/services/prix.service';
import { listerRecettes, tempsTotal } from '@/services/recettes.service';
import { formatAriary } from '@/utils/formatAriary';
import { regions } from '@/data/regions';
import { articles } from '@/data/articles';
import { galerie } from '@/data/galerie';
import { contenusCulturels } from '@/data/contenusCulturels';
import { spring } from '@/motion/tokens';
import { useT } from '@/hooks/useT';
import { obtenirPlat } from '@/services/plats.service';
import { TestimonialsMarquee } from '@/components/ui/TestimonialsMarquee';

export const Accueil = () => {
  const t = useT();
  const plats = listerPlats();
  const [budget, setBudget] = useState(10000);
  const abordables = useMemo(() => platsDansBudget(plats, budget), [plats, budget]);
  const repas = repasComplet(plats);
  const [reg, setReg] = useState<string>();
  const recettes = listerRecettes().filter((r) => r.estVedette).slice(0, 3);

  return (
    <div className="home-page">
      <Seo title="Accueil" description="La carte de la gastronomie malagasy, avec des prix fictifs en Ariary." />
      <HeroRoue />
      <Island tone="dark" className="home-section home-dishes home-reveal">
        <div className="page-shell">
          <div className="home-dishes__heading">
            <div className="home-dishes__intro">
              <p className="home-dishes__kicker">Quelques incontournables</p>
              <h2 className="h2 font-display">La table, à sa façon.</h2>
              <p>{t('prixFictifs')}</p>
            </div>
            <Link to="/plats" className="home-dishes__all">
              <span>Explorer le répertoire</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="home-dishes__grid">
            {vedettes()
              .slice(0, 3)
              .map((p, i) => (
                <div key={p.id} className={`home-dishes__item ${i === 0 ? 'home-dishes__item--feature' : ''}`}>
                  <FoodCard plat={p} large={i === 0} />
                </div>
              ))}
          </div>
        </div>
      </Island>
      <Island tone="riz" className="home-section home-reveal">
        <div className="page-shell">
          <h2 className="h2 font-display">Votre budget en Ariary</h2>
          <p className="mt-2">Prix fictifs de démonstration.</p>
          <BudgetRange
            id="budget"
            label="Budget disponible"
            min={500}
            max={60000}
            step={500}
            value={budget}
            onChange={setBudget}
            className="budget-control--wide"
          />
          <p className="mt-4">
            Avec {formatAriary(budget)}, vous avez accès à <strong>{abordables.length} plats</strong>.
          </p>
          <p>Un repas complet (plat, accompagnement et boisson) à partir de {formatAriary(repas.total)}.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AnimatePresence>
              {abordables.slice(0, 12).map((p) => (
                <motion.div key={p.id} layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={spring.pop}>
                  <DishArt archetype={p.archetype} palette={p.palette} size={72} photo={p.photo} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-6">
            <Button to={`/plats?pmax=${budget}`}>Voir ces plats</Button>
          </div>
        </div>
      </Island>
      <Island className="home-section home-reveal">
        <div className="page-shell grid lg:grid-cols-2 gap-10 items-center">
          <CarteMadagascar compact activeId={reg} onSelect={setReg} />
          <div>
            <h2 className="h2 font-display">Explorer par région</h2>
            <p className="mt-2 text-girofle-600">Localisation illustrative.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {regions.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    aria-pressed={reg === r.id}
                    onMouseEnter={() => setReg(r.id)}
                    onFocus={() => setReg(r.id)}
                    onClick={() => setReg(r.id)}
                    className={`rounded-pill px-3 py-2 min-h-11 ${reg === r.id ? 'bg-riziere-700 text-ecume' : 'bg-riziere-100'}`}
                  >
                    {r.nom}
                  </button>
                </li>
              ))}
            </ul>
            {reg && (
              <Link className="mt-4 inline-block underline" to={`/regions/${regions.find((r) => r.id === reg)?.slug ?? ''}`}>
                Ouvrir la fiche
              </Link>
            )}
          </div>
        </div>
      </Island>
      <Island tone="soft" className="home-section home-reveal">
        <div className="page-shell">
          <h2 className="h2 font-display">Découvrir les recettes</h2>
          <div className="home-recipe-grid mt-8 grid md:grid-cols-3 gap-4">
            {recettes.map((r, i) => {
              const plat = r.platId ? obtenirPlat(r.platId) : undefined;
              return (
                <Link key={r.id} to={`/recettes/${r.slug}`} className={`home-editorial-link home-recipe-card shadow-[var(--sh-1)] ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  {plat && <DishArt archetype={plat.archetype} palette={plat.palette} size={420} photo={plat.photo} showPhotoCredit fillContainer className="home-recipe-card__art" />}
                  <div className="home-recipe-card__copy">
                    <h3 className="font-display text-2xl">{r.nom}</h3>
                    <p>{tempsTotal(r)} min · {r.difficulte}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Island>
      <Island tone="dark" className="home-section home-reveal">
        <div className="page-shell grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="h2 font-display">Histoire et patrimoine</h2>
            <p className="mt-4 max-w-[48ch] text-riziere-100">
              {contenusCulturels[0]?.introduction} Les textes restent prudents : pas de date inventée, pas de proverbe attribué.
            </p>
            <div className="mt-6">
              <Button to="/culture" variant="contour">
                Lire les dossiers
              </Button>
            </div>
          </div>
          <figure className="home-heritage-figure">
            <img
              src="/images/marche-analakely.jpg"
              alt="Étal de fruits et légumes au marché d’Analakely, à Antananarivo"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              Marché d’Analakely, Antananarivo —{' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:Fruits_and_vegetables_in_Analakely_market_in_Antananarivo.jpg"
                target="_blank"
                rel="noreferrer"
              >
                Rudolph Furtado, CC BY 4.0
              </a>
            </figcaption>
          </figure>
        </div>
      </Island>
      <Island className="home-section home-reveal">
        <div className="page-shell">
          <h2 className="h2 font-display">Galerie</h2>
          <div className="mt-8 columns-2 md:columns-3 gap-4">
            {galerie.slice(0, 9).map((g) => (
              <Link key={g.id} to="/galerie" className="home-editorial-link mb-4 block break-inside-avoid rounded-xl overflow-hidden bg-riziere-100 p-4">
                <p className="text-sm">{g.legend}</p>
              </Link>
            ))}
          </div>
          <Button to="/galerie" variant="contour">
            Ouvrir la galerie
          </Button>
        </div>
      </Island>
      <Island tone="riz" className="home-section home-reveal">
        <div className="page-shell">
          <h2 className="h2 font-display">Éditorial</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {articles[0] && (
              <Link to={`/blog/${articles[0].slug}`} className="home-editorial-link rounded-xl bg-elevated p-6 shadow-[var(--sh-1)]">
                <p className="text-sm">À la une</p>
                <h3 className="font-display text-3xl mt-2">{articles[0].titre}</h3>
                <p className="mt-2">{articles[0].resume}</p>
              </Link>
            )}
            <div className="grid gap-3">
              {articles.slice(1, 4).map((a) => (
                <Link key={a.id} to={`/blog/${a.slug}`} className="home-editorial-link rounded-lg bg-elevated p-4">
                  <h3 className="font-display text-xl">{a.titre}</h3>
                  <p className="text-sm text-girofle-600">{a.minutesLecture} min</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Island>
      <Island className="home-section home-reveal">
        <div className="page-shell overflow-hidden">
          <h2 className="h2 font-display">Témoignages</h2>
          <TestimonialsMarquee />
        </div>
      </Island>
      <Island tone="dark" className="home-section home-reveal text-center">
        <p className="font-display display-l">Asseyez-vous. Le riz est prêt.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/plats">{t('explorerPlats')}</Button>
          <Button to="/generateur-menu" variant="contour">
            Générer un menu
          </Button>
        </div>
      </Island>
    </div>
  );
};
