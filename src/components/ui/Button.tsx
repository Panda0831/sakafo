import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

type Variant = 'plein' | 'contour' | 'doux';

const styles: Record<Variant, string> = {
  plein: 'bg-riziere-700 text-ecume hover:bg-riziere-500 hover:text-riziere-900',
  contour: 'bg-transparent text-riziere-700 ring-1 ring-riziere-500 hover:bg-riziere-100',
  doux: 'bg-riziere-100 text-riziere-900 hover:bg-riziere-500',
};

export const Button = ({
  to,
  onClick,
  children,
  variant = 'plein',
  className,
  type = 'button',
  ariaLabel,
}: {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}) => {
  const cls = cn(
    'inline-flex items-center justify-center min-h-11 px-5 font-medium rounded-pill transition-colors duration-150 ease-out',
    styles[variant],
    className,
  );

  if (to)
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );

  return (
    <button type={type} className={cls} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
};
