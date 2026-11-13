import { Link } from 'react-router-dom';

export const Logo = ({ compact }: { compact?: boolean }) => (
  <Link to="/" className="flex items-center gap-2 min-h-11" aria-label="Sakafo Gasy, accueil">
    <img
      src="/logo-wordmark.png"
      alt=""
      width={compact ? 42 : 50}
      height={compact ? 42 : 50}
      className={`site-logo${compact ? ' site-logo--compact' : ''}`}
      decoding="async"
    />
    <span className="site-logo__title">
      Sakafo Gasy
      {!compact && <span className="site-logo__tagline">La carte de la Grande Île</span>}
    </span>
  </Link>
);
