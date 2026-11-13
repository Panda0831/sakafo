import { Heart } from '@phosphor-icons/react';
import { useFavoris } from '@/stores/favoris';
import { useUi } from '@/stores/ui';
import { useT } from '@/hooks/useT';
import type { TypeFavori } from '@/types';
import { cn } from '@/utils/cn';

export const FavoriteButton = ({
  id,
  type,
  className,
}: {
  id: string;
  type: TypeFavori;
  className?: string;
}) => {
  const on = useFavoris((s) => s.a(id, type));
  const toggle = useFavoris((s) => s.toggle);
  const toast = useUi((s) => s.toast);
  const t = useT();
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? t('retirerFavoris') : t('ajouterFavoris')}
      className={cn(
        'grid h-11 w-11 place-items-center rounded-circle bg-elevated shadow-[var(--sh-1)]',
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const r = toggle(id, type);
        toast(r === 'ajoute' ? t('ajouteFavoris') : t('retireFavoris'));
      }}
    >
      <Heart weight={on ? 'fill' : 'bold'} className={on ? 'text-litchi-500' : 'text-riziere-700'} size={22} />
    </button>
  );
};
