import { regions } from '@/data/regions';
import { cn } from '@/utils/cn';

const positions: Record<string, { x: number; y: number }> = {
  'reg-analamanga': { x: 55, y: 48 },
  'reg-vakinankaratra': { x: 50, y: 57 },
  'reg-itasy': { x: 48, y: 52 },
  'reg-bongolava': { x: 38, y: 49 },
  'reg-haute-matsiatra': { x: 46, y: 68 },
  'reg-amoron-i-mania': { x: 49, y: 62 },
  'reg-alaotra-mangoro': { x: 70, y: 43 },
  'reg-atsinanana': { x: 78, y: 50 },
  'reg-analanjirofo': { x: 84, y: 34 },
  'reg-sava': { x: 90, y: 19 },
  'reg-diana': { x: 79, y: 13 },
  'reg-sofia': { x: 66, y: 25 },
  'reg-boeny': { x: 37, y: 30 },
  'reg-betsiboka': { x: 52, y: 40 },
  'reg-melaky': { x: 20, y: 43 },
  'reg-menabe': { x: 21, y: 60 },
  'reg-atsimo-andrefana': { x: 15, y: 82 },
  'reg-ihorombe': { x: 45, y: 77 },
  'reg-anosy': { x: 45, y: 91 },
  'reg-androy': { x: 28, y: 93 },
  'reg-atsimo-atsinanana': { x: 64, y: 78 },
  'reg-vatovavy': { x: 65, y: 67 },
  'reg-fitovinany': { x: 63, y: 72 },
};

export const CarteMadagascar = ({
  activeId,
  onSelect,
  compact,
}: {
  activeId?: string;
  onSelect?: (id: string) => void;
  compact?: boolean;
}) => (
  <div className={cn('madagascar-map', compact && 'madagascar-map--compact')}>
    <p className="madagascar-map__hint">
      Carte des régions de Madagascar. Sélectionnez une région.
    </p>
    <div className="madagascar-map__frame">
      <img
        className="madagascar-map__image"
        src="/images/shutterstock-589901828.webp"
        alt="Carte de Madagascar avec les noms de ses régions inscrits sur la carte"
        width={728}
        height={425}
        loading="lazy"
        decoding="async"
      />
      {regions.map((region) => {
        const position = positions[region.id];
        if (!position) return null;

        const selected = region.id === activeId;
        return (
          <button
            key={region.id}
            type="button"
            className={cn(
              'madagascar-map__region',
              selected && 'madagascar-map__region--selected',
              'transition-all duration-300 ease-out'
            )}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            aria-label={`Afficher ${region.nom}`}
            aria-pressed={selected}
            title={region.nom}
            onClick={() => onSelect?.(region.id)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.transition = 'transform 0.2s ease-out';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        );
      })}
    </div>
  </div>
);