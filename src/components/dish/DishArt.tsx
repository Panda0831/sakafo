import type { ArchetypeVisuel, PalettePlat, PhotoPlat } from "@/types";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

const Steam = ({ on }: { on: boolean }) => {
    if (!on) return null;
    return (
        <g className="steam" opacity="0.55">
            <path d="M48 22c0-6 4-8 4-14" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                <animate
                    attributeName="d"
                    dur="3.2s"
                    repeatCount="indefinite"
                    values="M48 28c0-6 4-8 4-14;M48 22c0-6 3-9 2-14;M48 28c0-6 4-8 4-14"
                />
            </path>
            <path d="M56 24c0-5 3-7 2-12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <animate attributeName="opacity" dur="3.2s" repeatCount="indefinite" values="0.2;0.7;0.2" />
            </path>
            <path d="M40 24c0-5-3-8-1-13" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </g>
    );
};

const foods: Record<ArchetypeVisuel, (p: PalettePlat) => ReactNode> = {
    "bol-ragout": p => (
        <>
            <ellipse cx="50" cy="58" rx="28" ry="18" fill={p.base} />
            <ellipse cx="42" cy="54" rx="8" ry="6" fill={p.accent1} />
            <ellipse cx="58" cy="56" rx="7" ry="5" fill={p.accent2} />
            <ellipse cx="50" cy="62" rx="10" ry="4" fill={p.ombre} opacity="0.25" />
        </>
    ),
    "bol-soupe": p => (
        <>
            <ellipse cx="50" cy="56" rx="26" ry="16" fill={p.base} />
            <ellipse cx="50" cy="54" rx="20" ry="10" fill={p.accent1} opacity="0.5" />
        </>
    ),
    "bol-porridge": p => (
        <>
            <ellipse cx="50" cy="56" rx="26" ry="16" fill={p.base} />
            <circle cx="44" cy="54" r="3" fill={p.accent2} />
            <circle cx="56" cy="58" r="2.5" fill={p.accent1} />
        </>
    ),
    "assiette-riz": p => (
        <>
            <ellipse cx="50" cy="55" rx="24" ry="16" fill={p.base} />
            {[0, 1, 2, 3, 4, 5].map(i => (
                <ellipse
                    key={i}
                    cx={40 + (i % 3) * 8}
                    cy={50 + Math.floor(i / 3) * 7}
                    rx="4"
                    ry="2.2"
                    fill={p.accent1}
                    transform={`rotate(${i * 18} ${40 + (i % 3) * 8} ${50 + Math.floor(i / 3) * 7})`}
                />
            ))}
        </>
    ),
    "assiette-viande": p => (
        <>
            <ellipse cx="52" cy="54" rx="18" ry="12" fill={p.base} />
            <ellipse cx="38" cy="58" rx="10" ry="8" fill={p.accent1} />
            <ellipse cx="60" cy="60" rx="8" ry="6" fill={p.accent2} />
        </>
    ),
    "assiette-poisson": p => (
        <>
            <ellipse cx="50" cy="55" rx="22" ry="10" fill={p.base} />
            <ellipse cx="68" cy="55" rx="6" ry="4" fill={p.accent1} />
            <circle cx="40" cy="53" r="2" fill={p.ombre} />
        </>
    ),
    "assiette-mer": p => (
        <>
            <ellipse cx="46" cy="54" rx="14" ry="10" fill={p.base} />
            <ellipse cx="60" cy="58" rx="10" ry="7" fill={p.accent1} />
            <circle cx="36" cy="60" r="5" fill={p.accent2} />
        </>
    ),
    brochettes: p => (
        <>
            <rect x="30" y="48" width="40" height="4" rx="2" fill={p.ombre} />
            <circle cx="38" cy="50" r="6" fill={p.base} />
            <circle cx="50" cy="50" r="6" fill={p.accent1} />
            <circle cx="62" cy="50" r="6" fill={p.base} />
        </>
    ),
    beignets: p => (
        <>
            <circle cx="40" cy="54" r="10" fill={p.base} />
            <circle cx="58" cy="52" r="9" fill={p.accent1} />
            <circle cx="50" cy="64" r="7" fill={p.accent2} />
        </>
    ),
    galette: p => (
        <>
            <circle cx="50" cy="56" r="18" fill={p.base} />
            <circle cx="50" cy="56" r="12" fill={p.accent1} opacity="0.45" />
        </>
    ),
    "paquet-feuille": p => (
        <>
            <ellipse cx="50" cy="56" rx="16" ry="20" fill={p.accent1} />
            <ellipse cx="50" cy="58" rx="10" ry="14" fill={p.base} />
        </>
    ),
    tubercules: p => (
        <>
            <ellipse cx="42" cy="56" rx="12" ry="9" fill={p.base} />
            <ellipse cx="58" cy="58" rx="11" ry="8" fill={p.accent1} />
        </>
    ),
    salade: p => (
        <>
            <ellipse cx="48" cy="54" rx="10" ry="8" fill={p.accent1} />
            <ellipse cx="58" cy="58" rx="9" ry="7" fill={p.base} />
            <ellipse cx="42" cy="62" rx="7" ry="5" fill={p.accent2} />
        </>
    ),
    "ramequin-sauce": p => (
        <>
            <circle cx="50" cy="56" r="14" fill={p.base} />
            <circle cx="50" cy="56" r="9" fill={p.accent1} />
        </>
    ),
    "tranche-gateau": p => (
        <>
            <path d="M32 64 L50 40 L68 64 Z" fill={p.base} />
            <path d="M38 64 L50 48 L62 64 Z" fill={p.accent1} opacity="0.5" />
        </>
    ),
    verre: p => (
        <>
            <path d="M38 36 h24 l-4 32 h-16 z" fill={p.base} />
            <path d="M40 40 h20 l-1 10 h-18 z" fill={p.accent1} />
        </>
    ),
    tasse: p => (
        <>
            <ellipse cx="48" cy="58" rx="16" ry="12" fill={p.base} />
            <path d="M64 52 c10 0 10 16 0 16" fill="none" stroke={p.accent1} strokeWidth="4" />
        </>
    ),
    coupe: p => (
        <>
            <ellipse cx="50" cy="48" rx="18" ry="10" fill={p.base} />
            <rect x="47" y="56" width="6" height="12" rx="3" fill={p.accent1} />
            <ellipse cx="44" cy="46" rx="4" ry="3" fill={p.accent2} />
        </>
    ),
};

export const DishArt = ({
    archetype,
    palette,
    size = 220,
    animated = false,
    chaud,
    className,
    photo,
    loading = "lazy",
    showPhotoCredit = false,
    fillContainer = false,
}: {
    archetype: ArchetypeVisuel;
    palette: PalettePlat;
    size?: number;
    animated?: boolean;
    chaud?: boolean;
    className?: string;
    photo?: PhotoPlat;
    loading?: "eager" | "lazy";
    showPhotoCredit?: boolean;
    fillContainer?: boolean;
}) => {
    return photo ? (
        <figure
            className={cn("dish-art-photo", className)}
            style={{ width: fillContainer ? "100%" : size, height: fillContainer ? "100%" : size }}
        >
            <img
                src={photo.src}
                alt={photo.alt}
                width={size}
                height={size}
                loading={loading}
                fetchPriority={loading === "eager" ? "high" : "auto"}
                decoding="async"
            />
            {showPhotoCredit && size >= 120 && (
                <figcaption>
                    <span title={[photo.source, photo.licenseUrl].filter(Boolean).join(" · ") || undefined}>
                        {photo.illustrative && "Image illustrative · "}
                        {photo.credit}
                        {photo.license && ` · ${photo.license}`}
                    </span>
                </figcaption>
            )}
        </figure>
    ) : (
        <svg
            viewBox="0 0 100 100"
            width={size}
            height={size}
            className={cn("dish-art-vector overflow-hidden", className)}
            role="img"
            aria-hidden
        >
            <circle
                data-vector-layer="shadow"
                cx="50"
                cy="52"
                r="46"
                fill={palette.ombre}
                opacity="0.12"
                className={animated ? "pulse-slow" : undefined}
            />
            <circle
                data-vector-layer="plate"
                cx="50"
                cy="50"
                r="42"
                fill={palette.assiette}
                className={animated ? "plate-pulse" : undefined}
            />
            <circle
                data-vector-layer="rim"
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke={palette.ombre}
                strokeOpacity="0.12"
                strokeWidth="2"
                pathLength="100"
                strokeDasharray="100"
                className={animated ? "rim-spin" : undefined}
            />
            <g data-vector-layer="food">{foods[archetype](palette)}</g>
            {chaud && animated ? <Steam on /> : null}
        </svg>
    );
};
