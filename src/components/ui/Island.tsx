import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export const Island = ({
  children,
  className,
  tone = 'surface',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'surface' | 'dark' | 'riz' | 'soft';
}) => {
  const tones = {
    surface: 'bg-surface text-ink',
    dark: 'bg-riziere-900 text-ecume',
    riz: 'bg-riziere-100 text-girofle-900',
    soft: 'bg-elevated text-ink',
  };
  return (
    <section data-tone={tone} className={cn('island site-panel py-12 md:py-20', tones[tone], className)}>
      {children}
    </section>
  );
};
