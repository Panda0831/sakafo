import { useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { useMediaQuery, useMotionPrefs } from '@/hooks/useMotionPrefs';
import { gsap, ScrollTrigger, useGSAP } from './gsapSetup';

export const PageTransition = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const { reduce } = useMotionPrefs();
  const desktop = useMediaQuery('(min-width: 768px)');
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current || reduce) return;

      const distance = desktop ? 18 : 10;
      const duration = desktop ? 0.55 : 0.38;
      const intro = root.current.querySelector<HTMLElement>(
        ':scope > .site-panel:first-child, :scope > .home-page .home-hero',
      );
      if (intro) {
        gsap.fromTo(intro, { y: distance, opacity: 0 }, { y: 0, opacity: 1, duration, ease: 'power3.out' });
      }

      const sections = gsap.utils.toArray<HTMLElement>(
        ':scope > .site-panel:not(:first-child), .home-page .home-reveal',
        root.current,
      );
      sections.forEach((section) => {
        const reveal = gsap.fromTo(
          section,
          { y: distance, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: desktop ? 0.58 : 0.4,
            ease: 'power2.out',
            paused: true,
            immediateRender: false,
          },
        );

        ScrollTrigger.create({
          trigger: section,
          start: 'top 90%',
          once: true,
          onEnter: () => reveal.play(),
        });
      });

      const vectorArts = root.current.querySelectorAll<SVGSVGElement>('.dish-art-vector');
      ScrollTrigger.batch(vectorArts, {
        start: 'top 88%',
        once: true,
        batchMax: 6,
        onEnter: (targets) => {
          targets.forEach((art, index) => {
            const shadow = art.querySelector('[data-vector-layer="shadow"]');
            const plate = art.querySelector('[data-vector-layer="plate"]');
            const rim = art.querySelector('[data-vector-layer="rim"]');
            const food = art.querySelector('[data-vector-layer="food"]');
            const timeline = gsap.timeline({
              delay: index * 0.035,
              defaults: { ease: 'power3.out' },
            });

            if (shadow) {
              timeline.fromTo(
                shadow,
                { scale: 0.78, opacity: 0, transformOrigin: '50% 50%' },
                { scale: 1, opacity: 0.12, duration: 0.42 },
                0,
              );
            }
            if (plate) {
              timeline.fromTo(
                plate,
                { scale: 0.88, opacity: 0, transformOrigin: '50% 50%' },
                { scale: 1, opacity: 1, duration: 0.48 },
                0.04,
              );
            }
            if (rim) {
              timeline.fromTo(rim, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.62 }, 0.08);
            }
            if (food) {
              timeline.fromTo(
                food,
                { y: 7, scale: 0.84, opacity: 0, transformOrigin: '50% 50%' },
                { y: 0, scale: 1, opacity: 1, duration: 0.5 },
                0.16,
              );
            }
          });
        },
      });
    },
    { scope: root, dependencies: [location.pathname, reduce, desktop], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="site-page" key={location.pathname}>
      {outlet}
    </div>
  );
};
