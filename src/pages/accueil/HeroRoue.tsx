import { DishArt } from "@/components/dish/DishArt";
import { FavoriteButton } from "@/components/dish/FavoriteButton";
import { HeroVectorOrbits } from "@/components/dish/HeroVectorOrbits";
import { Prix } from "@/components/dish/Prix";
import { Button } from "@/components/ui/Button";
import { useMediaQuery, useMotionPrefs } from "@/hooks/useMotionPrefs";
import { useT } from "@/hooks/useT";
import { gsap, useGSAP } from "@/motion/gsapSetup";
import { spring } from "@/motion/tokens";
import { cascade } from "@/motion/variants";
import { listerPlats, vedettes } from "@/services/plats.service";
import { prixPortion } from "@/services/prix.service";
import { motion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

export const HeroRoue = () => {
    const plats = vedettes().slice(0, 3);
    const [i, setI] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const plat = plats[i] ?? vedettes()[0];
    const n = listerPlats().length;
    const t = useT();
    const { reduce } = useMotionPrefs();
    const desktop = useMediaQuery("(min-width: 960px)");
    const root = useRef<HTMLElement>(null);
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

    useGSAP(
        () => {
            if (!root.current || reduce) return;

            if (!sessionStorage.getItem("sakafo:hero")) {
                sessionStorage.setItem("sakafo:hero", "1");
                const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
                intro
                    .from(".home-hero__eyebrow", { y: 12, opacity: 0, duration: 0.4 })
                    .from(
                        ".hero-title [data-word]",
                        { yPercent: 105, opacity: 0, duration: 0.58, stagger: 0.06 },
                        "-=0.1",
                    )
                    .from(".home-hero__description", { y: 16, opacity: 0, duration: 0.46 }, "-=0.22")
                    .from(".home-hero__plate-art", { y: 20, opacity: 0, duration: 0.56 }, "-=0.4");
            }

            const plate = root.current.querySelector(".home-hero__plate");
            if (desktop && plate) {
                gsap.to(plate, {
                    yPercent: -7,
                    ease: "none",
                    scrollTrigger: {
                        trigger: root.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.7,
                    },
                });
            }
        },
        { scope: root, dependencies: [reduce, desktop], revertOnUpdate: true },
    );

    useEffect(() => {
        if (reduce || !autoRotate || plats.length < 2) return;
        const id = window.setInterval(() => setI(v => (v + 1) % plats.length), 7000);
        return () => window.clearInterval(id);
    }, [autoRotate, plats.length, reduce]);

    if (!plat) return null;

    const selectionnerAvecClavier = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let prochain: number;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") prochain = (index + 1) % plats.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
            prochain = (index - 1 + plats.length) % plats.length;
        else if (event.key === "Home") prochain = 0;
        else if (event.key === "End") prochain = plats.length - 1;
        else return;

        event.preventDefault();
        setI(prochain);
        tabRefs.current[prochain]?.focus();
    };

    return (
        <section ref={root} className="island home-hero">
            <div className="page-shell home-hero__grid">
                <div className="home-hero__copy">
                    <p className="home-hero__eyebrow">Cuisine de Madagascar</p>
                    <h1 className="hero-title home-hero__title">
                        <span className="block overflow-hidden">
                            <span className="inline-block" data-word>
                                La Grande
                            </span>
                        </span>
                        <span className="block overflow-hidden">
                            <span className="inline-block" data-word>
                                Île se goûte,
                            </span>
                        </span>
                        <span className="block overflow-hidden">
                            <em className="inline-block" data-word>
                                plat après plat.
                            </em>
                        </span>
                    </h1>
                    <p className="home-hero__description">
                        Romazava, ravitoto, kitoza, koba : explorez {n} plats malagasy, leurs ingrédients, leurs
                        recettes et leurs prix en Ariary.
                    </p>
                    <div className="home-hero__actions">
                        <Button to="/plats">{t("explorerPlats")}</Button>
                        <Button to="/regions" variant="contour">
                            {t("decouvrirRegions")}
                        </Button>
                    </div>
                    <motion.div
                        initial="hidden"
                        animate="show"
                        transition={cascade}
                        className="home-hero__tabs-wrapper"
                    >
                        {plats.map((p, idx) => (
                            <motion.button
                                key={p.id}
                                ref={element => {
                                    tabRefs.current[idx] = element;
                                }}
                                id={`hero-tab-${p.id}`}
                                type="button"
                                role="tab"
                                aria-label={`Afficher ${p.nom.malagasy}`}
                                aria-selected={idx === i}
                                aria-controls="hero-dish-panel"
                                tabIndex={idx === i ? 0 : -1}
                                className="home-hero__tab"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setAutoRotate(false);
                                    setI(idx);
                                }}
                                onFocus={() => setAutoRotate(false)}
                                onKeyDown={event => {
                                    setAutoRotate(false);
                                    selectionnerAvecClavier(event, idx);
                                }}
                            >
                                <DishArt archetype={p.archetype} palette={p.palette} size={38} photo={p.photo} />
                            </motion.button>
                        ))}
                    </motion.div>
                    <button
                        type="button"
                        className="home-hero__autoplay"
                        aria-pressed={autoRotate && !reduce}
                        aria-label="Défilement automatique des plats vedettes"
                        disabled={reduce}
                        onClick={() => setAutoRotate(active => !active)}
                    >
                        {reduce ? "Sélection manuelle" : autoRotate ? "Pause" : "Reprendre"}
                    </button>
                </div>

                <div className="home-hero__visual">
                    <HeroVectorOrbits />
                    <div
                        id="hero-dish-panel"
                        className="home-hero__plate"
                        role="tabpanel"
                        aria-labelledby={`hero-tab-${plat.id}`}
                        tabIndex={0}
                    >
                        <motion.div
                            key={plat.id}
                            initial={reduce ? false : { y: 12, scale: 0.97, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            transition={spring.soft}
                            className="home-hero__art-transition"
                        >
                            <DishArt
                                archetype={plat.archetype}
                                palette={plat.palette}
                                size={440}
                                chaud={plat.chaud}
                                animated={!reduce}
                                photo={plat.photo}
                                loading="eager"
                                showPhotoCredit
                                className="home-hero__plate-art"
                            />
                        </motion.div>
                        <div className="home-hero__price">
                            <Prix valeur={prixPortion(plat)} estFictif variante="sticker" />
                        </div>
                        <div className="home-hero__caption">
                            <div className="min-w-0">
                                <span className="home-hero__caption-name">{plat.nom.malagasy}</span>
                                <span className="home-hero__caption-meta">Un plat à découvrir</span>
                            </div>
                            <FavoriteButton id={plat.id} type="plat" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
