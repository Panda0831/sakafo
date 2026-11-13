import { DishArt } from "@/components/dish/DishArt";
import { FavoriteButton } from "@/components/dish/FavoriteButton";
import { Prix } from "@/components/dish/Prix";
import { categories } from "@/data/categories";
import { regions } from "@/data/regions";
import { useMotionPrefs } from "@/hooks/useMotionPrefs";
import { fadeUp } from "@/motion/variants";
import { prixPortion } from "@/services/prix.service";
import type { Plat } from "@/types";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";

export const FoodCard = ({ plat, large }: { plat: Plat; large?: boolean }) => {
    const { reduce } = useMotionPrefs();
    const cat = categories.find(c => c.id === plat.categorieIds[0]);
    const reg = regions.find(r => r.id === plat.regionIds[0]);
    return (
        <AnimatePresence>
            <motion.article
                className={cn(
                    "food-card card relative bg-elevated p-3 shadow-[var(--sh-1)] rounded-lg",
                    large && "food-card--large md:flex md:gap-6",
                )}
                initial={fadeUp.hidden}
                animate={fadeUp.show}
            >
                <Link
                    to={`/plats/${plat.slug}`}
                    className="absolute inset-0 z-1 rounded-lg"
                    aria-label={`Voir le plat ${plat.nom.malagasy}`}
                />
                <div
                    className={cn(
                        "food-card__art relative overflow-hidden bg-riziere-100",
                        plat.photo && "food-card__art--photo",
                        large ? "md:w-1/2 rounded-[calc(var(--r-lg)-12px)]" : "rounded-[calc(var(--r-lg)-12px)]",
                    )}
                >
                    {plat.photo ? (
                        <figure className="food-card__photo">
                            <img
                                src={plat.photo.src}
                                alt={plat.photo.alt}
                                loading={large ? "eager" : "lazy"}
                                fetchPriority={large ? "high" : "auto"}
                                decoding="async"
                            />
                            <figcaption className="food-card__credit">
                                {plat.photo.source ? (
                                    <a
                                        href={plat.photo.source}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`Source de la photo : ${plat.photo.credit}`}
                                    >
                                        {plat.photo.credit}
                                    </a>
                                ) : (
                                    <span>{plat.photo.credit}</span>
                                )}
                                {plat.photo.license && (
                                    <>
                                        <span aria-hidden="true"> · </span>
                                        {plat.photo.licenseUrl ? (
                                            <a href={plat.photo.licenseUrl} target="_blank" rel="noreferrer">
                                                {plat.photo.license}
                                            </a>
                                        ) : (
                                            <span>{plat.photo.license}</span>
                                        )}
                                    </>
                                )}
                                {plat.photo.illustrative && <span> · Photo illustrative</span>}
                            </figcaption>
                        </figure>
                    ) : (
                        <DishArt
                            archetype={plat.archetype}
                            palette={plat.palette}
                            chaud={plat.chaud}
                            animated={plat.chaud && !reduce}
                            size={large ? 300 : 220}
                            className="food-card__plate mx-auto"
                        />
                    )}
                    <div className="absolute top-2 right-2 z-2">
                        <FavoriteButton id={plat.id} type="plat" />
                    </div>
                    {plat.estVedette && (
                        <span className="absolute top-2 left-2 z-2 rounded-pill bg-litchi-500 text-perle px-3 py-1 text-sm">
                            Vedette
                        </span>
                    )}
                </div>
                <div className="food-card__content relative z-2 pointer-events-none p-3 space-y-2">
                    <div className="food-card__title-row">
                        <h3 className="font-display text-2xl text-girofle-900">{plat.nom.malagasy}</h3>
                        <span className="food-card__price">
                            <Prix
                                valeur={prixPortion(plat)}
                                unite={plat.prixIndicatif.unite}
                                estFictif
                                variante="carte"
                            />
                        </span>
                    </div>
                    {plat.nom.francais && <p className="text-girofle-600">{plat.nom.francais}</p>}
                    <div className="flex flex-wrap gap-2">
                        {cat && <span className="rounded-pill bg-riziere-100 px-3 py-1 text-sm">{cat.nom}</span>}
                        {reg ? (
                            <span className="rounded-pill bg-lagon-100 px-3 py-1 text-sm">{reg.nom}</span>
                        ) : (
                            <span className="rounded-pill bg-lagon-100 px-3 py-1 text-sm">
                                Origine régionale non renseignée
                            </span>
                        )}
                    </div>
                    {plat.note !== undefined && (
                        <p className="text-sm text-girofle-600">Note fictive {plat.note.toFixed(1)} / 5</p>
                    )}
                </div>
            </motion.article>
        </AnimatePresence>
    );
};
