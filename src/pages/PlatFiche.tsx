import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/ui/Seo';
import { Island } from '@/components/ui/Island';
import { DishArt } from '@/components/dish/DishArt';
import { Prix } from '@/components/dish/Prix';
import { FavoriteButton } from '@/components/dish/FavoriteButton';
import { FoodCard } from '@/components/cards/FoodCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { obtenirPlat, platsSimilaires, listerPlats } from '@/services/plats.service';
import { totalPourPersonnes, prixPortion } from '@/services/prix.service';
import { listerRecettes } from '@/services/recettes.service';
import { categories } from '@/data/categories';
import { regions } from '@/data/regions';
import { ingredients } from '@/data/ingredients';
import { useUi } from '@/stores/ui';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';

export const PlatFiche = () => {
  const { slug = '' } = useParams();
  const plat = obtenirPlat(slug);
  const [n, setN] = useState(1);
  const [tab, setTab] = useState('Présentation');
  const toast = useUi((s) => s.toast);
  const { reduce } = useMotionPrefs();

  if (!plat)
    return (
      <Island>
        <EmptyState message="Plat introuvable. Le slug ne correspond à aucune fiche." actionLabel="Retour au catalogue" to="/plats" />
      </Island>
    );

  const recette = listerRecettes().find((r) => r.platId === plat.id);
  const cats = categories.filter((c) => plat.categorieIds.includes(c.id));
  const regs = regions.filter((r) => plat.regionIds.includes(r.id));
  const ings = ingredients.filter((i) => plat.ingredientIds.includes(i.id));
  const all = listerPlats();
  const idx = all.findIndex((p) => p.id === plat.id);
  const prev = all[idx > 0 ? idx - 1 : all.length - 1];
  const next = all[idx < all.length - 1 ? idx + 1 : 0];

  return (
    <>
      <Seo title={plat.nom.malagasy} description={plat.phraseAccroche} />
      <Island>
        <div className="page-shell grid lg:grid-cols-2 gap-10">
          <div className="dish-detail__visual">
            <DishArt archetype={plat.archetype} palette={plat.palette} size={420} chaud={plat.chaud} animated={!reduce} photo={plat.photo} loading="eager" className="mx-auto" />
            {plat.photo && (
              <p className="dish-detail__credit">
                <span>
                  Photo :{' '}
                  {plat.photo.source ? (
                    <a href={plat.photo.source} target="_blank" rel="noreferrer">{plat.photo.credit}</a>
                  ) : (
                    plat.photo.credit
                  )}
                  {plat.photo.license && (
                    <>
                      {' · '}
                      {plat.photo.licenseUrl ? (
                        <a href={plat.photo.licenseUrl} target="_blank" rel="noreferrer">{plat.photo.license}</a>
                      ) : (
                        plat.photo.license
                      )}
                    </>
                  )}
                </span>
                {plat.photo.illustrative && <span className="dish-detail__photo-note">Photo illustrative : image comparable, pas nécessairement la version malgache exacte.</span>}
              </p>
            )}
          </div>
          <div className="lg:sticky lg:top-28 self-start rounded-xl bg-elevated p-6 shadow-[var(--sh-2)]">
            {plat.nomMalagasyIncertain && <p className="text-sm text-lagon-500 mb-2">Nom malagasy non affirmé</p>}
            <h1 className="display-l font-display">{plat.nom.malagasy}</h1>
            {plat.nom.francais && <p className="text-xl text-girofle-600 mt-2">{plat.nom.francais}</p>}
            <p className="mt-4 max-w-[46ch]">{plat.phraseAccroche}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cats.map((c) => (
                <Link key={c.id} to={`/categories/${c.slug}`} className="rounded-pill bg-riziere-100 px-3 py-1">
                  {c.nom}
                </Link>
              ))}
              {regs.length === 0 && <span className="rounded-pill bg-lagon-100 px-3 py-1">Origine régionale non renseignée</span>}
              {regs.map((r) => (
                <Link key={r.id} to={`/regions/${r.slug}`} className="rounded-pill bg-lagon-100 px-3 py-1">
                  {r.nom}
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Prix valeur={prixPortion(plat)} unite={plat.prixIndicatif.unite} estFictif variante="fiche" />
              <div className="mt-3 flex items-center gap-3">
                <button type="button" className="h-11 w-11 rounded-circle bg-riziere-100" onClick={() => setN((v) => Math.max(1, v - 1))} aria-label="Moins de personnes">
                  −
                </button>
                <span className="font-display text-2xl">{n}</span>
                <button type="button" className="h-11 w-11 rounded-circle bg-riziere-100" onClick={() => setN((v) => Math.min(24, v + 1))} aria-label="Plus de personnes">
                  +
                </button>
                <span>Pour {n} personnes : {<Prix valeur={totalPourPersonnes(plat, n)} estFictif variante="liste" />}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <FavoriteButton id={plat.id} type="plat" />
              <Button variant="contour" onClick={() => { void navigator.clipboard.writeText(window.location.href); toast('Lien copié'); }}>
                Copier le lien
              </Button>
              <Button variant="contour" onClick={() => window.print()}>
                Imprimer
              </Button>
            </div>
            {plat.contientAlcool && <p className="mt-4 rounded-pill bg-litchi-500/15 text-litchi-700 px-4 py-2">Boisson alcoolisée, réservée aux adultes</p>}
          </div>
        </div>
      </Island>
      <Island tone="riz">
        <div className="page-shell">
          <div className="flex flex-wrap gap-2 mb-6">
            {['Présentation', 'Ingrédients', 'Préparation', 'Nutrition', 'Histoire'].map((name) => (
              <button key={name} type="button" className={`rounded-pill px-4 min-h-11 ${tab === name ? 'bg-riziere-700 text-ecume' : 'bg-elevated'}`} onClick={() => setTab(name)}>
                {name}
              </button>
            ))}
          </div>
          {tab === 'Présentation' && <p className="max-w-[60ch]">{plat.description}</p>}
          {tab === 'Ingrédients' && (
            <ul className="grid gap-2">
              {ings.map((i) => (
                <li key={i.id}>
                  <Link to={`/ingredients/${i.slug}`} className="rounded-pill bg-elevated px-4 py-2 inline-block">
                    {i.nom.francais} {i.nom.malagasy ? `(${i.nom.malagasy})` : ''}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {tab === 'Préparation' &&
            (recette ? (
              <div>
                <ol className="grid gap-3">
                  {recette.etapes.map((e, i) => (
                    <li key={e.titre ?? i} className="rounded-lg bg-elevated p-4">
                      <span className="font-display">{i + 1}. {e.titre}</span>
                      <p>{e.description}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-4">
                  <Button to={`/recettes/${recette.slug}/cuisine`}>Ouvrir le mode cuisine</Button>
                </div>
              </div>
            ) : (
              <p>Information non renseignée</p>
            ))}
          {tab === 'Nutrition' &&
            (plat.nutrition ? (
              <p>
                {plat.nutrition.calories ?? '—'} kcal (indicatif, fictif). Valeurs indicatives et fictives.
              </p>
            ) : (
              <p>Information non renseignée</p>
            ))}
          {tab === 'Histoire' && <p className="max-w-[60ch]">{plat.histoire ?? 'Information non renseignée'}</p>}
        </div>
      </Island>
      <Island>
        <div className="page-shell">
          <h2 className="h2 font-display">Plats similaires</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platsSimilaires(plat.id).map((p) => (
              <FoodCard key={p.id} plat={p} />
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            {prev && <Button to={`/plats/${prev.slug}`} variant="contour">{prev.nom.malagasy}</Button>}
            {next && <Button to={`/plats/${next.slug}`} variant="contour">{next.nom.malagasy}</Button>}
          </div>
        </div>
      </Island>
    </>
  );
};
