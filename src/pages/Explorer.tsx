import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Seo } from '@/components/ui/Seo';
import { Island } from '@/components/ui/Island';
import { Button } from '@/components/ui/Button';
import { BudgetRange } from '@/components/ui/BudgetRange';
import { EmptyState } from '@/components/ui/EmptyState';
import { FoodCard } from '@/components/cards/FoodCard';
import { DishArt } from '@/components/dish/DishArt';
import { Prix } from '@/components/dish/Prix';
import { CarteMadagascar } from '@/components/map/CarteMadagascar';
import { categories } from '@/data/categories';
import { regions } from '@/data/regions';
import { ingredients } from '@/data/ingredients';
import { dictionnaire } from '@/data/dictionnaire';
import { contenusCulturels } from '@/data/contenusCulturels';
import { galerie } from '@/data/galerie';
import { faq } from '@/data/faq';
import { articles } from '@/data/articles';
import { auteurs } from '@/data/auteurs';
import { etablissements } from '@/data/etablissements';
import { evenements } from '@/data/evenements';
import { parcours } from '@/data/parcours';
import { quiz } from '@/data/quiz';
import { listerPlats, obtenirPlat, platsParCategorie, platsParIngredient, platsParRegion } from '@/services/plats.service';
import { listerRecettes } from '@/services/recettes.service';
import { prixPortion } from '@/services/prix.service';
import { genererMenu, remplacerElement } from '@/services/menu.service';
import { calculerResultat } from '@/services/quiz.service';
import { useFavoris } from '@/stores/favoris';
import { useProgression } from '@/stores/progression';
import { useUi } from '@/stores/ui';
import { joursDepuisAujourdhui, formaterDateFr } from '@/utils/dates';
import { formatAriary } from '@/utils/formatAriary';
import type { CriteresMenu, Plat, TypeRepas } from '@/types';
import { plageDePrix } from '@/services/prix.service';

const H = ({ title, children }: { title: string; children: string }) => (
  <RouteHeading title={title} description={children} />
);

const CONTACT_EMAIL = 'andyrasoanaico43@gmail.com';

const defaultRouteCover = {
  path: '/categories',
  image: '/images/table-malagasy.jpg',
  alt: 'Plusieurs plats traditionnels malagasy servis autour d’une table',
  credit: 'IrmaA2, CC BY-SA 4.0',
  source: 'https://commons.wikimedia.org/wiki/File:Malagasy_foods.jpg',
  position: 'center 58%',
};

const routeCovers = [
  defaultRouteCover,
  {
    path: '/regions',
    image: '/images/rice-fields.jpg',
    alt: 'Rizières en terrasses dans le paysage malagasy',
    credit: 'Antony Stanley, CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rice_Paddys,_Madagascar_(3953822014).jpg',
    position: 'center 54%',
  },
  {
    path: '/carte-gastronomique',
    image: '/images/carte-relief-madagascar.png',
    alt: 'Carte en relief des forêts sèches de Madagascar',
    credit: 'Z3lvs, CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Madagascar_Dry_Deciduous_Forests_Ecoregion_-_Relief_Map_Angle.png',
    position: 'center 46%',
  },
  {
    path: '/culture',
    image: '/images/rova-antananarivo.jpg',
    alt: 'Escalier et architecture traditionnelle au Rova d’Antananarivo',
    credit: 'Nekenasoa, CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rova_Antananarivo_interior_steps.jpg',
    position: 'center 52%',
  },
  {
    path: '/galerie',
    image: '/images/marche-analakely.jpg',
    alt: 'Étal de fruits et légumes au marché d’Analakely, à Antananarivo',
    credit: 'Rudolph Furtado, CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Fruits_and_vegetables_in_Analakely_market_in_Antananarivo.jpg',
    position: 'center 54%',
  },
  {
    path: '/ingredients',
    image: '/images/manioc-madagascar.jpg',
    alt: 'Préparation du manioc, ingrédient courant de la cuisine malagasy',
    credit: 'Olivdediego, CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Jeune_fille_au_manioc.JPG',
    position: 'center 50%',
  },
  {
    path: '/dictionnaire',
    image: '/images/vendeuse-gateaux.jpg',
    alt: 'Vendeuse de gâteaux et de douceurs à Madagascar',
    credit: 'Rado Nathaniela, CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Cake_seller.jpg',
    position: 'center 48%',
  },
  {
    path: '/parcours',
    image: '/images/avenue-baobabs.jpg',
    alt: 'Avenue des baobabs au lever du soleil, près de Morondava',
    credit: 'Paolo Crosetto, CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Avenue_of_the_baobabs_at_sunrise_blue_and_gold_madagascar.jpg',
    position: 'center 58%',
  },
  {
    path: '/blog',
    image: '/images/romazava.jpg',
    alt: 'Romazava, plat traditionnel malagasy servi avec du riz',
    credit: 'Crisufix, CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Plat_Romazava.jpg',
    position: 'center 54%',
  },
  {
    path: '/evenements',
    image: '/images/bread-vendor.jpg',
    alt: 'Vendeuse de pain à Madagascar au petit matin',
    credit: 'Aggiebaggie, CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Madagascar_lady_selling_bread_at_dawn.jpg',
    position: 'center 46%',
  },
  {
    path: '/etablissements',
    image: '/images/kakapizon-antananarivo.jpg',
    alt: 'Vendeuse de kakapizon et de frites à Antananarivo',
    credit: 'Salym Fayad, CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Kakapizon_and_chips_food_vendor_in_Antananarivo_Madagascar.jpg',
    position: 'center 48%',
  },
  {
    path: '/generateur-menu',
    image: '/images/table-malagasy.jpg',
    alt: 'Plusieurs plats et accompagnements de la cuisine malagasy',
    credit: 'IrmaA2, CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Malagasy_foods.jpg',
    position: 'center 75%',
  },
  {
    path: '/quiz',
    image: '/images/kobandravina.jpg',
    alt: 'Kobandravina, douceur traditionnelle vendue à Antananarivo',
    credit: 'Salym Fayad, CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Kobandravina_dessert_snack_food_Antananarivo_Madagascar.jpg',
    position: 'center 50%',
  },
  {
    path: '/plat-mystere',
    image: '/images/table-malagasy.jpg',
    alt: 'Assortiment de plats traditionnels malagasy',
    credit: 'IrmaA2, CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Malagasy_foods.jpg',
    position: 'center 44%',
  },
  {
    path: '/comparateur',
    image: '/images/rice-fields.jpg',
    alt: 'Rizières de Madagascar, paysage façonné par la culture du riz',
    credit: 'Antony Stanley, CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rice_Paddys,_Madagascar_(3953822014).jpg',
    position: 'center 72%',
  },
  {
    path: '/favoris',
    image: '/images/romazava.jpg',
    alt: 'Romazava, une spécialité de la cuisine malagasy',
    credit: 'Crisufix, CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Plat_Romazava.jpg',
    position: 'center 38%',
  },
  {
    path: '/a-propos',
    image: '/images/baobabs-morondava.jpg',
    alt: 'Silhouettes de baobabs dans l’ouest de Madagascar',
    credit: 'Bernard Gagnon, CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Adansonia_grandidieri04.jpg',
    position: 'center 62%',
  },
  {
    path: '/contact',
    image: '/images/marche-analakely.jpg',
    alt: 'Marché d’Analakely au cœur d’Antananarivo',
    credit: 'Rudolph Furtado, CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Fruits_and_vegetables_in_Analakely_market_in_Antananarivo.jpg',
    position: 'center 32%',
  },
  {
    path: '/faq',
    image: '/images/avenue-baobabs.jpg',
    alt: 'Avenue des baobabs dans la lumière du matin à Madagascar',
    credit: 'Paolo Crosetto, CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Avenue_of_the_baobabs_at_sunrise_blue_and_gold_madagascar.jpg',
    position: 'center 38%',
  },
  {
    path: '/mentions-legales',
    image: '/images/carte-relief-madagascar.png',
    alt: 'Carte topographique et écologique de Madagascar',
    credit: 'Z3lvs, CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Madagascar_Dry_Deciduous_Forests_Ecoregion_-_Relief_Map_Angle.png',
    position: 'center 60%',
  },
  {
    path: '/confidentialite',
    image: '/images/rice-fields.jpg',
    alt: 'Rizières malagasy sous un ciel lumineux',
    credit: 'Antony Stanley, CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rice_Paddys,_Madagascar_(3953822014).jpg',
    position: 'center 30%',
  },
];

const RouteHeading = ({ title, description }: { title: string; description: string }) => {
  const { pathname } = useLocation();
  const cover = routeCovers.find(({ path }) => pathname === path || pathname.startsWith(`${path}/`)) ?? defaultRouteCover;

  return (
    <>
      <Seo title={title} description={description} />
      <Island className="route-heading">
        <img
          className="route-heading__image"
          src={cover.image}
          alt={cover.alt}
          fetchPriority="high"
          style={{ objectPosition: cover.position }}
        />
        <div className="page-shell route-heading__inner">
          <p className="route-heading__kicker">Carnet culinaire · Madagascar</p>
          <div className="route-heading__content">
            <h1 className="display-l font-display">{title}</h1>
            <p>{description}</p>
          </div>
        </div>
        <a className="route-heading__credit" href={cover.source} target="_blank" rel="noreferrer">
          Photo : {cover.credit}
        </a>
      </Island>
    </>
  );
};

const couleurTexteCategorie = (couleur: string) =>
  couleur.toUpperCase() === '#232826' ? '#FDFDFB' : '#131114';

export const CategoriesListe = () => (
  <>
    <H title="Catégories">Neuf familles, tailles inégales. Les assiettes s’éventent au survol.</H>
    <Island tone="soft">
      <div className="page-shell grid md:grid-cols-4 gap-4">
        {categories.map((c, i) => (
          <Link
            key={c.id}
            to={`/categories/${c.slug}`}
            className={`rounded-xl p-6 min-h-40 ${i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            style={{ background: c.couleur, color: couleurTexteCategorie(c.couleur) }}
          >
            <h2 className="font-display text-3xl">{c.nom}</h2>
            <p className="mt-2">{platsParCategorie(c.id).length} plats</p>
            <p className="mt-2 text-sm max-w-[36ch]">{c.description}</p>
          </Link>
        ))}
      </div>
    </Island>
  </>
);

export const CategorieFiche = () => {
  const { slug = '' } = useParams();
  const c = categories.find((x) => x.slug === slug);
  if (!c) return <EmptyState message="Catégorie introuvable." to="/categories" actionLabel="Retour" />;
  const plats = platsParCategorie(c.id);
  return (
    <>
      <Seo title={c.nom} description={c.description} />
      <Island className="!bg-transparent">
        <div className="page-shell rounded-2xl p-8" style={{ background: c.couleur, color: couleurTexteCategorie(c.couleur) }}>
          <h1 className="h1 font-display">{c.nom}</h1>
          <p className="mt-3 max-w-[50ch]">{c.description}</p>
          <p className="mt-2">{plats.length} plats</p>
        </div>
      </Island>
      <Island>
        <div className="page-shell grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plats.map((p) => (
            <FoodCard key={p.id} plat={p} />
          ))}
        </div>
      </Island>
    </>
  );
};

export const RegionsListe = () => (
  <>
    <H title="Régions">Vingt-trois régions. Chef-lieux indicatifs. Une région sans plat reste vide.</H>
    <Island>
      <div className="page-shell">
        <Button to="/carte-gastronomique">Voir la carte</Button>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regions.map((r) => (
            <Link key={r.id} to={`/regions/${r.slug}`} className="rounded-[40px_56px_30px_48px] bg-elevated p-5 shadow-[var(--sh-1)]">
              <h2 className="font-display text-2xl">{r.nom}</h2>
              <p>{r.cheflieu}</p>
              <p className="text-sm mt-2">{platsParRegion(r.id).length} plats associés</p>
              {r.produitsLocaux.length === 0 ? (
                <p className="text-sm text-lagon-500 mt-2">Informations en cours de rédaction</p>
              ) : (
                <p className="mt-2">{r.produitsLocaux.join(', ')}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </Island>
  </>
);

export const RegionFiche = () => {
  const { slug = '' } = useParams();
  const r = regions.find((x) => x.slug === slug);
  if (!r) return <EmptyState message="Région introuvable." to="/regions" actionLabel="Retour" />;
  const plats = platsParRegion(r.id);
  return (
    <>
      <Seo title={r.nom} description={r.description} />
      <Island>
        <div className="page-shell">
          <h1 className="h1 font-display">{r.nom}</h1>
          <p className="mt-2">Chef-lieu indicatif : {r.cheflieu}. Zone {r.zoneIllustrative}.</p>
          <p className="mt-4 max-w-[56ch]">{r.description}</p>
          {plats.length === 0 ? (
            <p className="mt-6">Aucun plat associé pour l’instant</p>
          ) : (
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {plats.map((p) => (
                <FoodCard key={p.id} plat={p} />
              ))}
            </div>
          )}
        </div>
      </Island>
    </>
  );
};

export const CartePage = () => {
  const [id, setId] = useState<string>();
  const [mode, setMode] = useState<'carte' | 'liste'>('carte');
  const r = regions.find((x) => x.id === id);
  return (
    <>
      <H title="Carte gastronomique">Localisation illustrative. Pas de contours administratifs.</H>
      <Island>
        <div className="page-shell">
          <div className="flex gap-2 mb-6">
            <button type="button" className={`rounded-pill px-4 min-h-11 ${mode === 'carte' ? 'bg-riziere-700 text-ecume' : 'bg-riziere-100'}`} onClick={() => setMode('carte')}>Carte</button>
            <button type="button" className={`rounded-pill px-4 min-h-11 ${mode === 'liste' ? 'bg-riziere-700 text-ecume' : 'bg-riziere-100'}`} onClick={() => setMode('liste')}>Liste</button>
          </div>
          {mode === 'carte' ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <CarteMadagascar activeId={id} onSelect={setId} />
              <div className="rounded-xl bg-elevated p-6">
                {r ? (
                  <>
                    <h2 className="font-display text-3xl">{r.nom}</h2>
                    <p className="mt-2">{r.description}</p>
                    <Button className="mt-4" to={`/regions/${r.slug}`}>Ouvrir la fiche</Button>
                  </>
                ) : (
                  <p>Choisissez une région.</p>
                )}
              </div>
            </div>
          ) : (
            <ul className="grid gap-2">
              {regions.map((x) => (
                <li key={x.id}>
                  <Link to={`/regions/${x.slug}`} className="block rounded-pill bg-elevated px-4 py-3">{x.nom} — {x.cheflieu}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Island>
    </>
  );
};

export const IngredientsListe = () => (
  <>
    <H title="Ingrédients">Prix indicatifs fictifs. Noms malagasy à relire.</H>
    <Island>
      <div className="page-shell grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ingredients.map((i) => (
          <Link key={i.id} to={`/ingredients/${i.slug}`} className="rounded-circle sm:rounded-xl aspect-square sm:aspect-auto bg-elevated p-5 text-center shadow-[var(--sh-1)]">
            <h2 className="font-display text-xl">{i.nom.francais}</h2>
            {i.nom.malagasy && <p>{i.nom.malagasy}</p>}
            <p className="mt-2"><Prix valeur={i.prixIndicatif.valeur} estFictif variante="liste" /> / {i.prixIndicatif.unite}</p>
          </Link>
        ))}
      </div>
    </Island>
  </>
);

export const IngredientFiche = () => {
  const { slug = '' } = useParams();
  const i = ingredients.find((x) => x.slug === slug);
  const ajouter = useProgression((s) => s.ajouterCourse);
  const pulse = useUi((s) => s.pulsePanier);
  const toast = useUi((s) => s.toast);
  if (!i) return <EmptyState message="Ingrédient introuvable." to="/ingredients" actionLabel="Retour" />;
  const plats = platsParIngredient(i.id);
  return (
    <>
      <Seo title={i.nom.francais} description={i.description} />
      <Island>
        <div className="page-shell">
          <h1 className="h1 font-display">{i.nom.francais}</h1>
          {i.nom.malagasy && <p className="text-xl">{i.nom.malagasy} {i.aRelire ? '(à relire)' : ''}</p>}
          <p className="mt-4 max-w-[52ch]">{i.description}</p>
          <p className="mt-4">Prix indicatif fictif : {formatAriary(i.prixIndicatif.valeur)} / {i.prixIndicatif.unite}</p>
          <Button className="mt-4" onClick={() => { ajouter(i.id); pulse(); toast('Ajouté à la liste de courses'); }}>
            Ajouter à la liste de courses
          </Button>
          <h2 className="h2 font-display mt-10">Plats</h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {plats.map((p) => (
              <FoodCard key={p.id} plat={p} />
            ))}
          </div>
        </div>
      </Island>
    </>
  );
};

export const DictionnairePage = () => {
  const [q, setQ] = useState('');
  const [lettre, setLettre] = useState('A');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const items = dictionnaire.filter((d) => {
    const okQ = !q || d.terme.toLowerCase().includes(q.toLowerCase()) || d.traduction.toLowerCase().includes(q.toLowerCase());
    return okQ && d.terme.toUpperCase().startsWith(lettre);
  });
  return (
    <>
      <H title="Dictionnaire">Pas d’audio inventé. Tous les termes sont à relire.</H>
      <Island>
        <div className="page-shell">
          <input value={q} onChange={(e) => setQ(e.target.value)} className="rounded-pill bg-elevated px-4 min-h-11 w-full max-w-md" placeholder="Rechercher un terme" />
          <div className="mt-4 flex flex-wrap gap-1 sticky top-24 bg-surface/90 py-2 rounded-pill">
            {letters.map((L) => (
              <button key={L} type="button" className={`h-10 w-10 rounded-circle ${lettre === L ? 'bg-riziere-700 text-ecume' : 'bg-riziere-100'}`} onClick={() => setLettre(L)}>{L}</button>
            ))}
          </div>
          <ul className="mt-6 grid gap-2">
            {items.map((d) => (
              <li key={d.id} className="rounded-lg bg-elevated p-4">
                <p className="font-display text-2xl">{d.terme} — {d.traduction}</p>
                <p>{d.definition}</p>
                <p className="text-girofle-600 mt-1">{d.exemple}</p>
              </li>
            ))}
          </ul>
        </div>
      </Island>
    </>
  );
};

export const GaleriePage = () => (
  <>
    <H title="Galerie">Illustrations générées. Crédit : démonstration. Pas de portraits réels.</H>
    <Island>
      <div className="page-shell columns-2 md:columns-3 gap-4">
        {galerie.map((g) => (
          <figure key={g.id} className="mb-4 break-inside-avoid rounded-xl bg-elevated p-4">
            <img
              src={g.src ?? '/images/repas-malagasy-cover.webp'}
              alt={g.alt}
              loading="lazy"
              decoding="async"
              className="h-40 w-full rounded-lg object-cover"
            />
            <figcaption className="mt-2 text-sm">{g.legend}</figcaption>
            <p className="text-xs text-girofle-600">{g.alt}</p>
          </figure>
        ))}
      </div>
    </Island>
  </>
);

export const CultureListe = () => (
  <>
    <H title="Culture">Dossiers prudents, sources à vérifier. Pas de chronologie inventée.</H>
    <Island>
      <div className="page-shell grid md:grid-cols-2 gap-4">
        {contenusCulturels.map((c, i) => (
          <Link key={c.id} to={`/culture/${c.slug}`} className={`rounded-xl bg-elevated p-6 ${i === 0 ? 'md:col-span-2' : ''}`}>
            <p className="text-sm">{c.theme}</p>
            <h2 className="font-display text-3xl mt-2">{c.titre}</h2>
            <p className="mt-2 max-w-[50ch]">{c.introduction}</p>
          </Link>
        ))}
      </div>
    </Island>
  </>
);

export const CultureFiche = () => {
  const { slug = '' } = useParams();
  const c = contenusCulturels.find((x) => x.slug === slug);
  if (!c) return <EmptyState message="Dossier introuvable." to="/culture" actionLabel="Retour" />;
  return (
    <>
      <Seo title={c.titre} description={c.introduction} />
      <Island>
        <div className="page-shell">
          <h1 className="h1 font-display">{c.titre}</h1>
          <p className="mt-4 max-w-[60ch]">{c.introduction}</p>
          {c.sections.map((s) => (
            <section key={s.id} className="mt-8">
              <h2 className="h2 font-display">{s.titre}</h2>
              <div className="mt-3 max-w-[62ch]" dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          ))}
          <p className="mt-8 text-sm text-lagon-500">Sources à vérifier avant publication. Auteur : personnage de démonstration.</p>
        </div>
      </Island>
    </>
  );
};

export const ComparateurPage = () => {
  const plats = listerPlats();
  const [ids, setIds] = useState<string[]>(['plat-romazava', 'plat-ravitoto-sy-henakisoa']);
  const sel = ids.map((id) => plats.find((p) => p.id === id)).filter((p): p is Plat => Boolean(p));
  const min = Math.min(...sel.map(prixPortion));
  return (
    <>
      <H title="Comparateur">Deux ou trois plats côte à côte. Aucun n’est déclaré « meilleur ».</H>
      <Island>
        <div className="page-shell">
          <div className="grid md:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => {
              const choisi = sel[i];
              return (
              <div key={i} className="rounded-xl bg-elevated p-4">
                <select className="w-full rounded-md min-h-11 bg-riziere-100 px-3" value={ids[i] ?? ''} onChange={(e) => setIds((prev) => {
                  const n = [...prev];
                  if (e.target.value) n[i] = e.target.value;
                  else n.splice(i, 1);
                  return n.filter(Boolean);
                })}>
                  <option value="">Ajouter un plat</option>
                  {plats.map((p) => (
                    <option key={p.id} value={p.id}>{p.nom.malagasy}</option>
                  ))}
                </select>
                {choisi && (
                  <div className="mt-4">
                    <DishArt archetype={choisi.archetype} palette={choisi.palette} size={140} photo={choisi.photo} showPhotoCredit />
                    <p className="font-display text-2xl">{choisi.nom.malagasy}</p>
                    <Prix valeur={prixPortion(choisi)} estFictif variante="fiche" />
                    {prixPortion(choisi) === min && (
                      <p className="rounded-pill bg-lagon-100 px-3 py-1 mt-2 inline-block">Prix le plus bas (fictif)</p>
                    )}
                    <p className="mt-2">{choisi.description}</p>
                    <p className="mt-2">{choisi.difficulte ?? 'Non renseigné'}</p>
                  </div>
                )}
              </div>
              );
            })}
          </div>
          <Button className="mt-6" variant="contour" onClick={() => setIds([])}>Réinitialiser</Button>
        </div>
      </Island>
    </>
  );
};

export const FavorisPage = () => {
  const items = useFavoris((s) => s.items);
  const vider = useFavoris((s) => s.vider);
  const retirer = useFavoris((s) => s.retirer);
  const plats = items.map((it) => (it.type === 'plat' ? obtenirPlat(it.id) : undefined)).filter((p): p is Plat => Boolean(p));
  const total = plats.reduce((s, p) => s + prixPortion(p), 0);
  return (
    <>
      <H title="Favoris">Enregistrés sur ce navigateur, non synchronisés.</H>
      <Island>
        <div className="page-shell">
          {items.length === 0 ? (
            <EmptyState message="Aucun favori pour l’instant." to="/plats" actionLabel="Explorer les plats" />
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                {plats.map((p) => (
                  <FoodCard key={p.id} plat={p} />
                ))}
                {items.filter((i) => i.type !== 'plat').map((i) => (
                  <div key={i.id} className="rounded-lg bg-elevated p-4 flex justify-between">
                    <span>{i.type} {i.id}</span>
                    <button type="button" onClick={() => retirer(i.id, i.type)}>Retirer</button>
                  </div>
                ))}
              </div>
              <p className="mt-6">Votre table idéale (plats) : {formatAriary(total)} fictifs.</p>
              <div className="mt-4 flex gap-3">
                <Button to="/generateur-menu">Composer un menu avec mes favoris</Button>
                <Button variant="contour" onClick={vider}>Tout effacer</Button>
              </div>
            </>
          )}
        </div>
      </Island>
    </>
  );
};

export const QuizListe = () => (
  <>
    <H title="Quiz">Scores locaux. Aucun classement réel.</H>
    <Island>
      <div className="page-shell grid md:grid-cols-2 gap-4">
        {quiz.map((q) => (
          <Link key={q.id} to={`/quiz/${q.slug}`} className="rounded-2xl bg-elevated p-6">
            <h2 className="font-display text-3xl">{q.titre}</h2>
            <p className="mt-2">{q.description}</p>
            <p className="mt-2">{q.questions.length} questions · {q.dureeMinutes} min · {q.niveau}</p>
          </Link>
        ))}
      </div>
    </Island>
  </>
);

export const QuizJeu = () => {
  const { slug = '' } = useParams();
  const q = quiz.find((x) => x.slug === slug);
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [rep, setRep] = useState<Record<string, number>>({});
  if (!q) return <EmptyState message="Quiz introuvable." to="/quiz" actionLabel="Retour" />;
  const question = q.questions[i];
  if (!question) return null;
  return (
    <Island>
      <div className="page-shell">
        <Seo title={q.titre} description={q.description} />
        <p>{i + 1} / {q.questions.length}</p>
        <h1 className="h2 font-display mt-4">{question.enonce}</h1>
        <ul className="mt-6 grid gap-2">
          {question.choix.map((c, idx) => (
            <li key={c}>
              <button type="button" className={`w-full text-left rounded-lg px-4 py-3 min-h-11 ${rep[question.id] === idx ? 'bg-riziere-700 text-ecume' : 'bg-elevated'}`} onClick={() => setRep({ ...rep, [question.id]: idx })}>{c}</button>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-3">
          {i < q.questions.length - 1 ? (
            <Button onClick={() => setI(i + 1)}>Question suivante</Button>
          ) : (
            <Button onClick={() => navigate('/quiz/resultat', { state: { slug: q.slug, reponses: rep } })}>Voir le résultat</Button>
          )}
        </div>
      </div>
    </Island>
  );
};

export const QuizResultat = () => {
  const loc = useLocation() as { state?: { slug?: string; reponses?: Record<string, number> } };
  const q = quiz.find((x) => x.slug === loc.state?.slug);
  if (!q || !loc.state?.reponses)
    return <EmptyState message="Aucun résultat à afficher. Passez un quiz." to="/quiz" actionLabel="Choisir un quiz" />;
  const r = calculerResultat(q, loc.state.reponses);
  return (
    <Island>
      <div className="page-shell">
        <Seo title="Résultat du quiz" description="Score de démonstration." />
        <h1 className="h1 font-display">Résultat</h1>
        <p className="mt-4 font-display text-5xl">{r.pourcentage} %</p>
        <p>{r.bonnes} / {r.total} — badge de démonstration, pas un classement réel.</p>
        <ul className="mt-6 grid gap-3">
          {r.details.map((d) => (
            <li key={d.question.id} className="rounded-lg bg-elevated p-4">
              <p>{d.question.enonce}</p>
              <p className={d.correcte ? 'text-riziere-700' : 'text-litchi-700'}>{d.correcte ? 'Bonne réponse' : 'À revoir'}</p>
              <p className="text-sm mt-1">{d.question.explication}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-3">
          <Button to={`/quiz/${q.slug}`}>Rejouer</Button>
          <Button to="/quiz" variant="contour">Retour aux quiz</Button>
        </div>
      </div>
    </Island>
  );
};

export const GenerateurPage = () => {
  const [type, setType] = useState<TypeRepas>('dejeuner');
  const [personnes, setPersonnes] = useState(2);
  const [budget, setBudget] = useState(20000);
  const [menu, setMenu] = useState(() => genererMenu({ typeRepas: 'dejeuner', personnes: 2, budgetAr: 20000 }));
  const criteres: CriteresMenu = { typeRepas: type, personnes, budgetAr: budget };
  return (
    <>
      <H title="Générateur de menu">Les prix sont fictifs. Vérifiez toujours les allergènes.</H>
      <Island>
        <div className="page-shell">
          <div className="flex flex-wrap gap-3">
            {(['petit-dejeuner', 'dejeuner', 'diner', 'gouter'] as TypeRepas[]).map((x) => (
              <button key={x} type="button" className={`rounded-pill px-4 min-h-11 ${type === x ? 'bg-riziere-700 text-ecume' : 'bg-riziere-100'}`} onClick={() => setType(x)}>{x}</button>
            ))}
            <label className="flex items-center gap-2">Personnes
              <input type="number" min={1} max={24} value={personnes} onChange={(e) => setPersonnes(Number(e.target.value))} className="w-16 rounded-md min-h-11 px-2" />
            </label>
            <BudgetRange
              id="menu-budget"
              label="Budget du menu"
              min={2000}
              max={80000}
              step={500}
              value={budget}
              onChange={setBudget}
              className="budget-control--compact"
            />
            <Button onClick={() => setMenu(genererMenu(criteres))}>Générer un menu</Button>
          </div>
          {menu.message && <p className="mt-4 rounded-lg bg-lagon-100 p-4">{menu.message}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {menu.elements.map((e) => (
              <div key={e.role} className="rounded-xl bg-elevated p-4 w-56 text-center shadow-[var(--sh-1)]">
                <p className="text-sm">{e.role}</p>
                <DishArt archetype={e.plat.archetype} palette={e.plat.palette} size={120} photo={e.plat.photo} showPhotoCredit className="mx-auto" />
                <p className="font-display text-xl">{e.plat.nom.malagasy}</p>
                <Prix valeur={prixPortion(e.plat)} estFictif variante="carte" />
                <button type="button" className="mt-2 rounded-pill bg-riziere-100 px-3 min-h-11" onClick={() => setMenu(remplacerElement(menu, e.role, criteres))}>Remplacer</button>
              </div>
            ))}
          </div>
          <p className="mt-6 font-display text-3xl">Total pour {personnes} : {formatAriary(menu.totalPersonnes)} <span className="text-sm">fictif</span></p>
        </div>
      </Island>
    </>
  );
};

export const PlatMysterePage = () => {
  const plats = listerPlats().filter((p) => !p.contientAlcool);
  const [plat, setPlat] = useState(() => plats[Math.floor(Math.random() * plats.length)]!);
  const [indice, setIndice] = useState(0);
  const [ok, setOk] = useState(false);
  const cat = categories.find((c) => c.id === plat.categorieIds[0]);
  return (
    <>
      <H title="Plat mystère">Tirage aléatoire. Ce n’est pas un plat du jour.</H>
      <Island>
        <div className="page-shell text-center">
          <div className={`mx-auto w-64 h-64 rounded-circle overflow-hidden ${ok ? '' : 'blur-xl'}`}>
            <DishArt archetype={plat.archetype} palette={plat.palette} size={256} photo={plat.photo} showPhotoCredit />
          </div>
          <ul className="mt-6 grid gap-2 max-w-md mx-auto text-left">
            {indice >= 1 && <li className="rounded-pill bg-riziere-100 px-4 py-2">Ingrédient : {plat.ingredientIds[0]}</li>}
            {indice >= 2 && <li className="rounded-pill bg-riziere-100 px-4 py-2">Catégorie : {cat?.nom}</li>}
            {indice >= 3 && <li className="rounded-pill bg-riziere-100 px-4 py-2">Prix fictif autour de {formatAriary(prixPortion(plat))}</li>}
          </ul>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="contour" onClick={() => setIndice((v) => Math.min(3, v + 1))}>Indice suivant</Button>
            <Button onClick={() => setOk(true)}>Révéler la réponse</Button>
            <Button variant="contour" onClick={() => { setPlat(plats[Math.floor(Math.random() * plats.length)]!); setIndice(0); setOk(false); }}>Autre plat</Button>
          </div>
          {ok && (
            <div className="mt-6">
              <p className="font-display text-4xl">{plat.nom.malagasy}</p>
              <Prix valeur={prixPortion(plat)} estFictif variante="fiche" />
              <div className="mt-4"><Button to={`/plats/${plat.slug}`}>Voir le plat</Button></div>
            </div>
          )}
        </div>
      </Island>
    </>
  );
};

export const ParcoursListe = () => (
  <>
    <H title="Parcours">Parcours pédagogique, pas un itinéraire réel.</H>
    <Island>
      <div className="page-shell grid md:grid-cols-2 gap-4">
        {parcours.map((p) => (
          <Link key={p.id} to={`/parcours/${p.slug}`} className="rounded-xl bg-elevated p-6">
            <h2 className="font-display text-3xl">{p.titre}</h2>
            <p className="mt-2">{p.description}</p>
            <p className="mt-2">{p.etapes.length} étapes · {p.dureeMinutes} min · {p.niveau}</p>
          </Link>
        ))}
      </div>
    </Island>
  </>
);

export const ParcoursFiche = () => {
  const { slug = '' } = useParams();
  const p = parcours.find((x) => x.slug === slug);
  const faits = useProgression((s) => (p ? s.etapes[p.id] ?? [] : []));
  const marquer = useProgression((s) => s.marquer);
  const reset = useProgression((s) => s.reinitialiser);
  if (!p) return <EmptyState message="Parcours introuvable." to="/parcours" actionLabel="Retour" />;
  return (
    <Island>
      <div className="page-shell">
        <Seo title={p.titre} description={p.description} />
        <h1 className="h1 font-display">{p.titre}</h1>
        <p className="mt-2">{p.description}</p>
        <ol className="mt-8 grid gap-3">
          {p.etapes.map((e, i) => (
            <li key={e.id} className="rounded-lg bg-elevated p-4 flex justify-between items-center">
              <div>
                <p className="font-display text-xl">{i + 1}. {e.titre}</p>
                <p>{e.description}</p>
              </div>
              <button type="button" className={`rounded-circle h-12 w-12 ${faits.includes(e.id) ? 'bg-ylang-400' : 'bg-riziere-100'}`} onClick={() => marquer(p.id, e.id)} aria-label="Marquer comme terminée">
                {faits.includes(e.id) ? 'OK' : ''}
              </button>
            </li>
          ))}
        </ol>
        <Button className="mt-6" variant="contour" onClick={() => reset(p.id)}>Réinitialiser</Button>
      </div>
    </Island>
  );
};

export const EtablissementsListe = () => (
  <>
    <H title="Établissements">Tous fictifs. Aucune réservation réelle.</H>
    <Island>
      <div className="page-shell grid md:grid-cols-2 gap-4">
        {etablissements.map((e) => (
          <Link key={e.id} to={`/etablissements/${e.slug}`} className="rounded-xl bg-elevated p-5">
            <p className="rounded-pill bg-lagon-100 text-lagon-500 px-3 py-1 inline-block text-sm">Établissement fictif</p>
            <h2 className="font-display text-2xl mt-2">{e.nom}</h2>
            <p>{e.ville}</p>
            <p className="mt-2">{e.description}</p>
          </Link>
        ))}
      </div>
    </Island>
  </>
);

export const EtablissementFiche = () => {
  const { slug = '' } = useParams();
  const e = etablissements.find((x) => x.slug === slug);
  const toast = useUi((s) => s.toast);
  if (!e) return <EmptyState message="Établissement introuvable." to="/etablissements" actionLabel="Retour" />;
  return (
    <Island>
      <div className="page-shell">
        <Seo title={e.nom} description={e.description} />
        <p className="rounded-pill bg-lagon-100 px-3 py-1 inline-block">Établissement fictif de démonstration</p>
        <h1 className="h1 font-display mt-4">{e.nom}</h1>
        <p className="mt-2">{e.description}</p>
        <p className="mt-2">{e.adresse}</p>
        <p className="mt-1">Coordonnées à confirmer directement auprès de l’établissement.</p>
        <p>Horaires fictifs : {e.horaires}. Note fictive {e.note}/5.</p>
        <h2 className="h2 font-display mt-8">Carte</h2>
        <ul className="mt-4 grid gap-2">
          {e.prixCarte.map((l) => {
            const p = obtenirPlat(l.platId);
            return (
              <li key={l.platId} className="flex justify-between rounded-pill bg-elevated px-4 py-3">
                <span>{p?.nom.malagasy ?? l.platId}</span>
                <Prix valeur={l.valeur} estFictif variante="liste" />
              </li>
            );
          })}
        </ul>
        <Button className="mt-6" onClick={() => toast('Aucune réservation réelle n’a été transmise.')}>Simuler une réservation</Button>
      </div>
    </Island>
  );
};

const EvenementsBloc = ({ list, titre }: { list: typeof evenements; titre: string }) => (
  <>
    <h2 className="h2 font-display mt-8">{titre}</h2>
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      {list.map((e) => (
        <Link key={e.id} to={`/evenements/${e.slug}`} className="rounded-xl bg-elevated p-5 flex gap-4">
          <span className="h-16 w-16 rounded-circle bg-riziere-100 grid place-items-center text-center text-sm">{formaterDateFr(joursDepuisAujourdhui(e.joursDepuisAujourdhui)).slice(0, 6)}</span>
          <span>
            <span className="font-display text-xl block">{e.titre}</span>
            <span>{e.lieu}</span>
          </span>
        </Link>
      ))}
    </div>
  </>
);

export const EvenementsListe = () => {
  const avenir = evenements.filter((e) => e.joursDepuisAujourdhui >= 0);
  const passes = evenements.filter((e) => e.joursDepuisAujourdhui < 0);
  return (
    <>
      <H title="Événements">Dates relatives à aujourd’hui. Tout est fictif.</H>
      <Island>
        <div className="page-shell">
          <EvenementsBloc list={avenir} titre="À venir" />
          <EvenementsBloc list={passes} titre="Passés" />
        </div>
      </Island>
    </>
  );
};

export const EvenementFiche = () => {
  const { slug = '' } = useParams();
  const e = evenements.find((x) => x.slug === slug);
  const toast = useUi((s) => s.toast);
  if (!e) return <EmptyState message="Événement introuvable." to="/evenements" actionLabel="Retour" />;
  return (
    <Island>
      <div className="page-shell">
        <Seo title={e.titre} description={e.description} />
        <h1 className="h1 font-display">{e.titre}</h1>
        <p className="mt-2">{e.description}</p>
        <p className="mt-2">{formaterDateFr(joursDepuisAujourdhui(e.joursDepuisAujourdhui))} · {e.heure} · {e.lieu}</p>
        <p>{e.gratuit ? 'Gratuit' : formatAriary(e.tarifAr ?? 0)} (fictif)</p>
        <ol className="mt-6 grid gap-2">
          {e.programme.map((x) => (
            <li key={x} className="rounded-md bg-elevated px-4 py-2">{x}</li>
          ))}
        </ol>
        <Button className="mt-6" onClick={() => toast('Aucune inscription réelle n’est enregistrée.')}>Simuler une inscription</Button>
      </div>
    </Island>
  );
};

export const BlogListe = () => (
  <>
    <H title="Blog">Dates de démonstration. Auteurs fictifs.</H>
    <Island>
      <div className="page-shell grid md:grid-cols-2 gap-4">
        {articles.map((a, i) => (
          <Link key={a.id} to={`/blog/${a.slug}`} className={`rounded-xl bg-elevated p-6 ${i === 0 ? 'md:col-span-2' : ''}`}>
            <p className="text-sm">{a.categorie} · {a.minutesLecture} min</p>
            <h2 className="font-display text-3xl mt-2">{a.titre}</h2>
            <p className="mt-2">{a.resume}</p>
          </Link>
        ))}
      </div>
    </Island>
  </>
);

export const BlogFiche = () => {
  const { slug = '' } = useParams();
  const a = articles.find((x) => x.slug === slug);
  const aut = auteurs.find((x) => x.id === a?.auteurId);
  if (!a) return <EmptyState message="Article introuvable." to="/blog" actionLabel="Retour" />;
  return (
    <Island>
      <div className="page-shell">
        <Seo title={a.titre} description={a.resume} />
        <h1 className="h1 font-display">{a.titre}</h1>
        <p className="text-xl mt-2">{a.sousTitre}</p>
        <p className="mt-2 text-sm">{aut?.nom} — personnage de démonstration. {formaterDateFr(joursDepuisAujourdhui(a.joursDepuisAujourdhui))}</p>
        {a.corps.map((b, i) => (
          <div key={i} className="mt-6 max-w-[62ch]" dangerouslySetInnerHTML={{ __html: b.html }} />
        ))}
      </div>
    </Island>
  );
};

export const ContactPage = () => {
  const toast = useUi((s) => s.toast);
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string }>();
  const emailJsConfigured = Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );

  const envoyerMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending || !emailJsConfigured) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    setSending(true);
    setFeedback(undefined);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: CONTACT_EMAIL,
          from_name: String(fields.get('name')),
          reply_to: String(fields.get('sender')),
          subject: String(fields.get('subject')),
          message: String(fields.get('message')),
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      form.reset();
      setMsg('');
      setFeedback({ type: 'success', message: 'Votre message a bien été envoyé.' });
      toast('Message envoyé');
    } catch (error) {
      console.error('[contact] Échec de l’envoi EmailJS', error);
      setFeedback({
        type: 'error',
        message: 'L’envoi a échoué. Vérifiez votre connexion ou réessayez plus tard.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <H title="Contact">{`Écrivez-nous à ${CONTACT_EMAIL}.`}</H>
      <Island>
        <div className="page-shell grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex flex-col items-start gap-3">
              <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <Button variant="contour" onClick={() => { void navigator.clipboard.writeText(CONTACT_EMAIL); toast('Adresse e-mail copiée'); }}>Copier l’adresse e-mail</Button>
            </div>
            <p className="mt-6 max-w-[42ch]">Utilisez le formulaire pour nous envoyer directement votre message.</p>
          </div>
          <form className="rounded-xl bg-elevated p-6 grid gap-3" onSubmit={envoyerMessage}>
            <input name="name" required placeholder="Nom" className="rounded-md min-h-11 px-3 bg-riziere-100" />
            <input name="sender" required type="email" placeholder="E-mail" className="rounded-md min-h-11 px-3 bg-riziere-100" />
            <input name="subject" required placeholder="Sujet" className="rounded-md min-h-11 px-3 bg-riziere-100" />
            <textarea name="message" required minLength={20} maxLength={1000} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message (20 à 1 000 caractères)" className="rounded-md min-h-32 p-3 bg-riziere-100" />
            <p className="text-sm">{msg.length} / 1000</p>
            {!emailJsConfigured && (
              <p className="text-sm" role="status">
                Le formulaire sera disponible après la configuration des identifiants EmailJS dans `.env.local`.
              </p>
            )}
            {feedback && (
              <p className="text-sm" role={feedback.type === 'error' ? 'alert' : 'status'}>
                {feedback.message}
              </p>
            )}
            <button
              type="submit"
              disabled={!emailJsConfigured || sending}
              className="inline-flex min-h-11 items-center justify-center rounded-pill bg-riziere-700 px-5 font-medium text-ecume transition-colors duration-150 ease-out hover:bg-riziere-500 hover:text-riziere-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? 'Envoi en cours…' : 'Envoyer le message'}
            </button>
          </form>
        </div>
      </Island>
    </>
  );
};

export const AProposPage = () => {
  const plats = listerPlats();
  const { min, max } = plageDePrix(plats);
  return (
    <>
      <H title="À propos">Site éditorial de démonstration. Pas de partenaires inventés.</H>
      <Island>
        <div className="page-shell">
          <p className="max-w-[56ch]">Sakafo Gasy expose des plats malagasy avec des prix fictifs en Ariary. Les textes culturels sont prudents. Les noms malagasy sont à relire.</p>
          <ul className="mt-8 grid md:grid-cols-4 gap-4">
            <li className="rounded-xl bg-elevated p-5"><p className="font-display text-4xl">{plats.length}</p>plats</li>
            <li className="rounded-xl bg-elevated p-5"><p className="font-display text-4xl">{regions.length}</p>régions</li>
            <li className="rounded-xl bg-elevated p-5"><p className="font-display text-4xl">{listerRecettes().length}</p>recettes</li>
            <li className="rounded-xl bg-elevated p-5"><p className="font-display text-4xl">{formatAriary(min)} – {formatAriary(max)}</p>prix fictifs</li>
          </ul>
          <p className="text-sm mt-4">Chiffres calculés à partir des données de démonstration.</p>
        </div>
      </Island>
    </>
  );
};

export const FaqPage = () => {
  const themes = [...new Set(faq.map((f) => f.theme))];
  const [th, setTh] = useState<string>();
  const [q, setQ] = useState('');
  const items = faq.filter((f) => (!th || f.theme === th) && (!q || f.question.toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <H title="FAQ">Réponses alignées sur le fonctionnement réel de la démo.</H>
      <Island>
        <div className="page-shell">
          <input value={q} onChange={(e) => setQ(e.target.value)} className="rounded-pill min-h-11 px-4 bg-elevated w-full max-w-lg" placeholder="Rechercher" />
          <div className="flex flex-wrap gap-2 mt-4">
            {themes.map((x) => (
              <button key={x} type="button" className={`rounded-pill px-3 min-h-11 ${th === x ? 'bg-riziere-700 text-ecume' : 'bg-riziere-100'}`} onClick={() => setTh(x)}>{x}</button>
            ))}
          </div>
          <div className="mt-6 grid gap-2">
            {items.map((f) => (
              <details key={f.id} className="rounded-lg bg-elevated p-4">
                <summary className="font-display text-xl">{f.question}</summary>
                <p className="mt-2 max-w-[60ch]">{f.reponse}</p>
              </details>
            ))}
          </div>
        </div>
      </Island>
    </>
  );
};

export const MentionsPage = () => (
  <Island>
    <div className="page-shell max-w-[60ch]">
      <Seo title="Mentions légales" description="Champs à renseigner avant publication." />
      <h1 className="h1 font-display">Mentions légales</h1>
      <p className="mt-4">Éditeur : Rasoanaivo Andriantsoa Andy.</p>
      <p>Hébergeur : À renseigner avant publication.</p>
      <p>Contact : <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </div>
  </Island>
);

export const ConfidentialitePage = () => (
  <Island>
    <div className="page-shell max-w-[60ch]">
      <Seo title="Confidentialité" description="Traitements locaux du navigateur." />
      <h1 className="h1 font-display">Confidentialité</h1>
      <p className="mt-4">Ce site enregistre dans le navigateur : favoris, thème, langue, préférences, historique de recherche, progression des parcours et liste de courses. Préfixe sakafo:v1:. Aucun outil d’analyse n’est intégré. Les polices sont auto-hébergées.</p>
    </div>
  </Island>
);

export const NotFound = () => (
  <Island className="text-center">
    <Seo title="Page introuvable" description="Cette adresse n’existe pas sur Sakafo Gasy." />
    <div className="page-shell py-16">
      <div className="mx-auto h-40 w-40 rounded-circle bg-riziere-100" aria-hidden="true" />
      <h1 className="h1 font-display mt-8">Page introuvable</h1>
      <p className="mt-3">Cette adresse n’existe pas. Revenez à la table.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Button to="/">Retour à l’accueil</Button>
        <Button to="/plats" variant="contour">Plats</Button>
      </div>
    </div>
  </Island>
);
