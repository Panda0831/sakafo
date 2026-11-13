import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/ui/Seo';
import { EmptyState } from '@/components/ui/EmptyState';
import { calculerQuantites, obtenirRecette } from '@/services/recettes.service';
import { formatNombreFr } from '@/utils/formatAriary';

export const Cuisine = () => {
  const { slug = '' } = useParams();
  const recette = obtenirRecette(slug);
  const [i, setI] = useState(0);
  const [sec, setSec] = useState(0);
  const [run, setRun] = useState(false);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => setSec((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [run]);

  useEffect(() => {
    if (!lock || !('wakeLock' in navigator)) return;
    let w: WakeLockSentinel | undefined;
    void navigator.wakeLock.request('screen').then((x) => {
      w = x;
    }).catch(() => undefined);
    return () => {
      void w?.release();
    };
  }, [lock]);

  if (!recette) return <EmptyState message="Recette introuvable." to="/recettes" actionLabel="Quitter" />;
  const etape = recette.etapes[i];
  if (!etape) return <EmptyState message="Aucune étape." to={`/recettes/${recette.slug}`} actionLabel="Quitter" />;
  const lignes = calculerQuantites(recette, recette.portionsOrigine);

  return (
    <div className="cook-mode min-h-screen bg-brume p-6">
      <Seo title={`Cuisine : ${recette.nom}`} description="Mode cuisine, une étape à la fois." />
      <header className="cook-mode__top flex justify-between items-center">
        <Link to={`/recettes/${recette.slug}`} className="cook-mode__exit rounded-pill bg-elevated px-4 min-h-11 grid place-items-center">
          Quitter le mode cuisine
        </Link>
        <p className="cook-mode__counter" aria-live="polite">
          <strong>{String(i + 1).padStart(2, '0')}</strong>
          <span>/ {String(recette.etapes.length).padStart(2, '0')}</span>
        </p>
      </header>
      <div
        className="cook-mode__progress mt-4 overflow-hidden"
        role="progressbar"
        aria-label="Progression de la recette"
        aria-valuemin={0}
        aria-valuemax={recette.etapes.length}
        aria-valuenow={i + 1}
      >
        <div className="cook-mode__progress-bar" style={{ transform: `scaleX(${(i + 1) / recette.etapes.length})` }} />
      </div>
      <main className="cook-mode__step">
        <p className="cook-mode__recipe">{recette.nom}</p>
        <p className="cook-mode__step-label">Étape {String(i + 1).padStart(2, '0')}</p>
        <h1 className="display-l font-display mt-3">{etape.titre}</h1>
        <p className="cook-mode__description text-2xl mt-6 max-w-[28ch]">{etape.description}</p>
      </main>
      <div className="cook-mode__actions mt-10 flex flex-wrap gap-3">
        <button type="button" className="rounded-pill bg-elevated px-5 min-h-11" disabled={i === 0} onClick={() => setI((v) => v - 1)}>
          Précédent
        </button>
        <button type="button" className="rounded-pill bg-riziere-700 text-ecume px-5 min-h-11" disabled={i >= recette.etapes.length - 1} onClick={() => setI((v) => v + 1)}>
          Suivant
        </button>
        {etape.dureeMinutes && (
          <button
            type="button"
            className="rounded-pill bg-ylang-400 px-5 min-h-11"
            onClick={() => {
              setSec(etape.dureeMinutes! * 60);
              setRun(true);
            }}
          >
            Lancer {etape.dureeMinutes} min
          </button>
        )}
        <button type="button" className="rounded-pill bg-elevated px-5 min-h-11" onClick={() => setRun(false)}>Pause</button>
        <button type="button" className="rounded-pill bg-elevated px-5 min-h-11" onClick={() => { setRun(false); setSec(0); }}>Réinitialiser</button>
        <button type="button" className="rounded-pill bg-elevated px-5 min-h-11" onClick={() => setLock((v) => !v)}>
          {lock ? 'Ne plus garder l’écran allumé' : 'Garder l’écran allumé'}
        </button>
      </div>
      {sec > 0 && <p className="cook-mode__timer font-display text-5xl mt-6" role="timer">{Math.floor(sec / 60)}:{String(sec % 60).padStart(2, '0')}</p>}
      <details className="cook-mode__ingredients mt-10 rounded-xl bg-elevated p-5">
        <summary>Ingrédients</summary>
        <ul className="mt-3 grid gap-1">
          {lignes.map((l) => (
            <li key={l.ingredientId}>{l.ingredientId} · {formatNombreFr(l.quantite)} {l.unite}</li>
          ))}
        </ul>
      </details>
    </div>
  );
};
