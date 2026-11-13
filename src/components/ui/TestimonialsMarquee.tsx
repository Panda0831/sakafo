import { useRef } from 'react';
import { temoignages } from '@/data/temoignages';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';
import { gsap, useGSAP } from '@/motion/gsapSetup';

const TestimonialGroup = ({ duplicate = false }: { duplicate?: boolean }) => (
  <div className="testimonial-marquee__group" aria-hidden={duplicate}>
    {temoignages.map((tm) => (
      <blockquote key={tm.id} className="testimonial-marquee__card">
        <p>{tm.texte}</p>
        <footer className="mt-3 font-display">{tm.prenom}</footer>
        <p className="text-sm text-lagon-500">Témoignage fictif</p>
      </blockquote>
    ))}
  </div>
);

export const TestimonialsMarquee = () => {
  const track = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const { reduce } = useMotionPrefs();

  useGSAP(
    () => {
      if (!track.current || reduce) {
        tween.current = null;
        return;
      }

      // Kill existing tween if recreating
      tween.current?.kill();

      tween.current = gsap.to(track.current, {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        paused: false,
      });

      return () => {
        tween.current?.kill();
        tween.current = null;
      };
    },
    { scope: track, dependencies: [reduce], revertOnUpdate: true }
  );

  return (
    <div className="testimonial-marquee" data-testid="testimonial-marquee">
      <div className="testimonial-marquee__viewport" data-reduced={reduce}>
        <div ref={track} className="testimonial-marquee__track">
          <TestimonialGroup />
          <TestimonialGroup duplicate />
        </div>
      </div>
    </div>
  );
};