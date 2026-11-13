import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toasts } from '@/components/layout/Toasts';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { PageTransition } from '@/motion/PageTransition';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';
import { validerDonnees } from '@/data';
import { ArrowUp } from '@phosphor-icons/react';

export const RootLayout = () => {
  const { pathname } = useLocation();
  const cuisine = pathname.includes('/cuisine');
  const { reduce } = useMotionPrefs();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (import.meta.env.DEV) validerDonnees();
  }, []);

  useEffect(() => {
    if (reduce || cuisine) return;
    const lenis = new Lenis({ lerp: 0.1 });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce, cuisine]);

  if (cuisine) return <PageTransition />;

  return (
    <>
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" className="site-main pt-28">
        <PageTransition />
      </main>
      <Footer />
      <Toasts />
      <SearchOverlay />
      <button
        type="button"
        className="back-to-top no-print fixed bottom-6 right-6 z-20 grid h-12 w-12 place-items-center rounded-circle bg-riziere-700 text-ecume shadow-[var(--sh-2)]"
        aria-label="Retour en haut"
        onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
      >
        <ArrowUp weight="bold" />
      </button>
    </>
  );
};
