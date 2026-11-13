import { Link, useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/ui/Seo';
import { Island } from '@/components/ui/Island';
import { FoodCard } from '@/components/cards/FoodCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Prix } from '@/components/dish/Prix';
import { DishArt } from '@/components/dish/DishArt';
import { appliquerFiltres, listerPlats } from '@/services/plats.service';
import { prixPortion } from '@/services/prix.service';
import { categories } from '@/data/categories';
import { regions } from '@/data/regions';
import { usePreferences } from '@/stores/preferences';
import type { FiltresPlats } from '@/types';

export const Plats = () => {
  const [params, setParams] = useSearchParams();
  const vue = usePreferences((s) => s.vuePlats);
  const setVue = usePreferences((s) => s.setVuePlats);
  const source = listerPlats();

  const filtres: FiltresPlats = {
    q: params.get('q') ?? undefined,
    cat: params.get('cat')?.split(',').filter(Boolean),
    region: params.get('region')?.split(',').filter(Boolean),
    pmin: params.get('pmin') ? Number(params.get('pmin')) : undefined,
    pmax: params.get('pmax') ? Number(params.get('pmax')) : undefined,
    tri: params.get('tri') ?? 'popularite',
    vedette: params.get('vedette') === '1',
  };

  const resultats = appliquerFiltres(source, filtres);

  const set = (k: string, v: string) => {
    const n = new URLSearchParams(params);
    if (!v) n.delete(k);
    else n.set(k, v);
    setParams(n);
  };

  return (
    <>
      <Seo title="Plats" description="Catalogue des plats malagasy, prix fictifs en Ariary." />
      <Island className="catalog-intro">
        <div className="page-shell">
          <figure className="catalog-intro__cover">
            <img
              src="/images/repas-malagasy-cover.webp"
              alt="Buffet de présentation avec plusieurs plats servis en petites portions"
              fetchPriority="high"
            />
            <div className="catalog-intro__cover-shade" aria-hidden="true" />
            <div className="catalog-intro__cover-content">
              <div className="catalog-intro__copy">
                <p className="catalog-intro__eyebrow">Le répertoire gourmand</p>
                <h1 className="h1 font-display">Les plats</h1>
                <p className="mt-3 max-w-[52ch]">Des tables des Hautes Terres aux cuisines du littoral.</p>
              </div>
              <p className="catalog-intro__count" aria-live="polite">
                <strong>{resultats.length}</strong>
                <span>plats à découvrir</span>
              </p>
            </div>
            <figcaption>
              Photo fournie par l’utilisateur
            </figcaption>
          </figure>
          <div className="catalog-filters" aria-label="Filtres du catalogue">
            <input
              type="search"
              name="q"
              value={filtres.q ?? ''}
              onChange={(e) => set('q', e.target.value)}
              placeholder="Rechercher un plat…"
              aria-label="Rechercher un plat"
              autoComplete="off"
              className="rounded-pill bg-elevated px-4 min-h-11 shadow-[var(--sh-1)]"
            />
            <label>
              <span>Catégorie</span>
              <select name="cat" className="rounded-pill bg-elevated px-4 min-h-11" value={filtres.cat?.[0] ?? ''} onChange={(e) => set('cat', e.target.value)}>
                <option value="">Toutes</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Région</span>
              <select name="region" className="rounded-pill bg-elevated px-4 min-h-11" value={params.get('region') ?? ''} onChange={(e) => set('region', e.target.value)}>
                <option value="">Toutes</option>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nom}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Prix min.</span>
              <input name="pmin" type="number" min="0" step="500" inputMode="numeric" value={filtres.pmin ?? ''} onChange={(e) => set('pmin', e.target.value)} />
            </label>
            <label>
              <span>Prix max.</span>
              <input name="pmax" type="number" min="0" step="500" inputMode="numeric" value={filtres.pmax ?? ''} onChange={(e) => set('pmax', e.target.value)} />
            </label>
            <label>
              <span>Classer par</span>
              <select name="tri" className="rounded-pill bg-elevated px-4 min-h-11" value={filtres.tri} onChange={(e) => set('tri', e.target.value)}>
                <option value="popularite">Popularité</option>
                <option value="nom-az">Nom A à Z</option>
                <option value="nom-za">Nom Z à A</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
                <option value="note">Note</option>
              </select>
            </label>
            <div className="catalog-view-toggle" role="group" aria-label="Mode d’affichage">
              <button type="button" aria-pressed={vue === 'cartes'} className={`px-4 min-h-11 rounded-pill ${vue === 'cartes' ? 'bg-riziere-100' : ''}`} onClick={() => setVue('cartes')}>
                Cartes
              </button>
              <button type="button" aria-pressed={vue === 'carte-menu'} className={`px-4 min-h-11 rounded-pill ${vue === 'carte-menu' ? 'bg-riziere-100' : ''}`} onClick={() => setVue('carte-menu')}>
                Carte-menu
              </button>
            </div>
          </div>
        </div>
      </Island>
      <Island tone="soft" className="catalog-results">
        <div className="page-shell">
          {resultats.length === 0 ? (
            <EmptyState message="Aucun plat ne correspond. Élargissez la fourchette de prix ou retirez un filtre." actionLabel="Réinitialiser les filtres" onAction={() => setParams(new URLSearchParams())} />
          ) : vue === 'cartes' ? (
            <div className="catalog-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {resultats.map((p) => (
                <FoodCard key={p.id} plat={p} />
              ))}
            </div>
          ) : (
            <ul className="grid gap-2">
              {resultats.map((p) => (
                <li key={p.id}>
                  <Link to={`/plats/${p.slug}`} className="flex items-center gap-4 rounded-pill bg-elevated px-4 py-3 hover:-translate-y-0.5 transition-transform shadow-[var(--sh-1)]">
                    <DishArt archetype={p.archetype} palette={p.palette} size={56} photo={p.photo} />
                    <span className="font-display text-xl min-w-[8rem]">{p.nom.malagasy}</span>
                    <span className="hidden md:block truncate text-girofle-600 flex-1">{p.phraseAccroche}</span>
                    <span className="dots-price flex-1 text-girofle-600" />
                    <Prix valeur={prixPortion(p)} estFictif variante="liste" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Island>
    </>
  );
};
