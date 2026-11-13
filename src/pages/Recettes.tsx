import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Seo } from '@/components/ui/Seo';
import { Island } from '@/components/ui/Island';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { FavoriteButton } from '@/components/dish/FavoriteButton';
import { Prix } from '@/components/dish/Prix';
import { DishArt } from '@/components/dish/DishArt';
import { calculerQuantites, coutIndicatif, listerRecettes, obtenirRecette, tempsTotal } from '@/services/recettes.service';
import { obtenirPlat } from '@/services/plats.service';
import { formatNombreFr } from '@/utils/formatAriary';
import { useUi } from '@/stores/ui';

export const RecettesListe = () => {
  const recettes = listerRecettes();
  return (
    <>
      <Seo title="Recettes" description="Recettes indicatives, portions recalculables, coût fictif en Ariary." />
      <Island>
        <div className="page-shell">
          <h1 className="h1 font-display">Recettes</h1>
          <p className="mt-2">Indicatives. Les quantités se recalculent. Le coût est fictif.</p>
          <div className="recipe-grid mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recettes.map((r) => {
              const plat = r.platId ? obtenirPlat(r.platId) : undefined;
              return (
                <Link key={r.id} to={`/recettes/${r.slug}`} className="recipe-card rounded-lg bg-elevated p-4 shadow-[var(--sh-1)]">
                  <div className="recipe-card__art">
                    {plat && (
                      <DishArt
                        archetype={plat.archetype}
                        palette={plat.palette}
                        size={210}
                        photo={plat.photo}
                        showPhotoCredit
                        fillContainer
                      />
                    )}
                  </div>
                  <p className="recipe-card__meta">{tempsTotal(r)} min <span aria-hidden="true">/</span> {r.difficulte}</p>
                  <h2 className="font-display text-2xl mt-2">{r.nom}</h2>
                  <p className="text-girofle-600 mt-2">{r.portionsOrigine} portions</p>
                </Link>
              );
            })}
          </div>
        </div>
      </Island>
    </>
  );
};

export const RecetteFiche = () => {
  const { slug = '' } = useParams();
  const recette = obtenirRecette(slug);
  const [portions, setPortions] = useState(recette?.portionsOrigine ?? 4);
  const toast = useUi((s) => s.toast);
  if (!recette)
    return (
      <Island>
        <EmptyState message="Recette introuvable." to="/recettes" actionLabel="Retour aux recettes" />
      </Island>
    );
  const plat = recette.platId ? obtenirPlat(recette.platId) : undefined;
  const lignes = calculerQuantites(recette, portions);
  const cout = coutIndicatif(recette, portions);

  return (
    <>
      <Seo title={recette.nom} description={recette.description} />
      <Island>
        <div className="page-shell grid lg:grid-cols-[minmax(0,0.9fr)_1.1fr] gap-8">
          <aside className="rounded-xl bg-elevated p-5 shadow-[var(--sh-1)] lg:sticky lg:top-28 self-start">
            <h2 className="font-display text-2xl">Ingrédients</h2>
            <div className="mt-3 flex items-center gap-3">
              <button type="button" className="h-11 w-11 rounded-circle bg-riziere-100" onClick={() => setPortions((p) => Math.max(1, p - 1))}>−</button>
              <span className="font-display text-2xl">{portions}</span>
              <button type="button" className="h-11 w-11 rounded-circle bg-riziere-100" onClick={() => setPortions((p) => Math.min(24, p + 1))}>+</button>
              <button type="button" className="rounded-pill px-3 min-h-11 bg-riziere-100" onClick={() => setPortions(recette.portionsOrigine)}>
                Portions d’origine
              </button>
            </div>
            <ul className="mt-4 grid gap-2">
              {lignes.map((l) => (
                <li key={l.ingredientId} className="flex justify-between rounded-md bg-riziere-100 px-3 py-2">
                  <span>{l.ingredientId}</span>
                  <span>{formatNombreFr(l.quantite)} {l.unite}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">Coût indicatif : <Prix valeur={cout} estFictif variante="liste" /></p>
            <Button
              className="mt-4"
              variant="contour"
              onClick={() => {
                const txt = lignes.map((l) => `${l.ingredientId} ${formatNombreFr(l.quantite)} ${l.unite}`).join('\n');
                void navigator.clipboard.writeText(txt);
                toast('Liste de courses copiée');
              }}
            >
              Générer la liste de courses
            </Button>
          </aside>
          <div>
            {plat && <DishArt archetype={plat.archetype} palette={plat.palette} size={240} photo={plat.photo} showPhotoCredit />}
            <div className="flex items-center gap-3 mt-4">
              <h1 className="h1 font-display">{recette.nom}</h1>
              <FavoriteButton id={recette.id} type="recette" />
            </div>
            <p className="mt-2">{recette.description}</p>
            <p className="mt-2 text-girofle-600">Préparation {recette.tempsPreparation} min · Cuisson {recette.tempsCuisson} min · Total {tempsTotal(recette)} min · {recette.difficulte}</p>
            <div className="mt-6">
              <Button to={`/recettes/${recette.slug}/cuisine`}>Ouvrir le mode cuisine</Button>
            </div>
            <ol className="mt-8 grid gap-4">
              {recette.etapes.map((e, i) => (
                <li key={e.titre ?? i} className="rounded-lg bg-elevated p-5">
                  <p className="font-display text-xl">{i + 1}. {e.titre}</p>
                  <p className="mt-2">{e.description}</p>
                  {e.dureeMinutes && <p className="text-sm mt-1">{e.dureeMinutes} min</p>}
                  {e.conseil && <p className="text-girofle-600 mt-1">{e.conseil}</p>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Island>
    </>
  );
};
