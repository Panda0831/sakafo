import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="site-footer island bg-riziere-900 text-ecume motif-tsihi mt-8 mb-0 rounded-t-[var(--r-2xl)] rounded-b-none p-8 md:p-16">
    <div className="page-shell">
      <div className="site-footer__lead">
        <div>
          <p className="site-footer__brand">Sakafo Gasy</p>
          <p className="font-display display-l max-w-[14ch] mt-5">La Grande Île se goûte, plat après plat.</p>
        </div>
        <Link to="/plats" className="site-footer__cta">
          À table <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="site-footer__columns">
        <div>
          <p className="site-footer__label">À propos du site</p>
          <p className="text-riziere-100 mt-3 max-w-[36ch]">
            Une carte sensible des plats, des gestes et des récits culinaires de Madagascar.
          </p>
          <p className="text-riziere-100/70 mt-3 max-w-[36ch] text-sm">
            Site de démonstration
          </p>
        </div>
        <nav className="grid content-start gap-2" aria-label="Explorer le site">
          <p className="site-footer__label mb-1">Explorer</p>
          <Link to="/plats">Les plats</Link>
          <Link to="/recettes">Les recettes</Link>
          <Link to="/carte-gastronomique">Carte gastronomique</Link>
          <Link to="/culture">Culture</Link>
          <Link to="/blog">Journal</Link>
        </nav>
        <nav className="grid content-start gap-2" aria-label="Informations">
          <p className="site-footer__label mb-1">Informations</p>
          <Link to="/faq">Questions fréquentes</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Confidentialité</Link>
        </nav>
      </div>
      <div className="site-footer__bottom">
        <span>Des recettes et des récits à partager.</span>
        <Link to="/">Retour à l’accueil</Link>
      </div>
    </div>
  </footer>
);
