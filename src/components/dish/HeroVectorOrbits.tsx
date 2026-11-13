import { useRef } from 'react';
import { useMotionPrefs } from '@/hooks/useMotionPrefs';
import { gsap, useGSAP } from '@/motion/gsapSetup';

export const HeroVectorOrbits = () => {
  const root = useRef<HTMLDivElement>(null);
  const { reduce } = useMotionPrefs();

  useGSAP(
    () => {
      if (!root.current || reduce) return;

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .fromTo('.hero-vector-orbit', { strokeDashoffset: 30, opacity: 0 }, { strokeDashoffset: 0, opacity: 0.72, duration: 0.85, stagger: 0.12 }, 0)
        .fromTo('.hero-vector-trace', { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 0.82, duration: 0.8, stagger: 0.16 }, 0.12)
        .fromTo('.hero-vector-node', { scale: 0.45, opacity: 0, rotation: -14, transformOrigin: '50% 50%' }, { scale: 1, opacity: 0.95, rotation: 0, duration: 0.64, stagger: 0.12 }, 0.32)
        .fromTo('.hero-vector-grains', { scale: 0.7, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 0.65, duration: 0.5 }, 0.54);

      gsap.to('.hero-vector-orbit--outer', {
          rotation: 360,
          duration: 46,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        });
      gsap.to('.hero-vector-orbit--inner', {
          rotation: -360,
          duration: 38,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        });
      gsap.to('.hero-vector-node--leaf', {
          y: -7,
          rotation: 8,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.35,
        });
      gsap.to('.hero-vector-grains', {
          rotation: 14,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '50% 50%',
        });
    },
    { scope: root, dependencies: [reduce], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="home-hero__orbit-wrap">
      <svg
        className="home-hero__orbit"
        viewBox="0 0 600 600"
        role="presentation"
        aria-hidden="true"
        focusable="false"
      >
        <ellipse
          className="hero-vector-orbit hero-vector-orbit--outer"
          cx="300"
          cy="300"
          rx="246"
          ry="188"
          transform="rotate(-24 300 300)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 9"
          pathLength="30"
        />
        <ellipse
          className="hero-vector-orbit hero-vector-orbit--inner"
          cx="300"
          cy="300"
          rx="210"
          ry="150"
          transform="rotate(32 300 300)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1 13"
          pathLength="30"
        />
        <path
          className="hero-vector-trace"
          d="M92 288c24-24 42 13 62-4s4-42 26-48 38 14 53-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
        />
        <path
          className="hero-vector-trace"
          d="M374 121c-13 21 9 31-4 49s-35 11-36 33"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
        />
        <g className="hero-vector-node hero-vector-node--leaf" transform="translate(118 190) rotate(-22)">
          <path d="M0 26C1 7 19-4 40 1 36 22 20 34 0 26Z" fill="currentColor" fillOpacity=".16" />
          <path d="M2 26 34 5M14 18l-3-9m12 1 2 8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        <g className="hero-vector-node hero-vector-node--leaf" transform="translate(452 334) rotate(24)">
          <path d="M0 18C12 5 29 5 42 16 31 31 14 34 0 18Z" fill="currentColor" fillOpacity=".15" />
          <path d="m3 19 34-3M17 18l-3-8m13 7 4 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        <g className="hero-vector-node hero-vector-node--leaf" transform="translate(180 430) rotate(18)">
          <path d="M2 4c11-5 25-2 31 7-9 10-22 12-33 5Z" fill="currentColor" fillOpacity=".14" />
          <path d="m2 14 28-7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        <g className="hero-vector-grains" fill="currentColor">
          <ellipse cx="433" cy="173" rx="3" ry="7" transform="rotate(-34 433 173)" />
          <ellipse cx="451" cy="185" rx="3" ry="7" transform="rotate(28 451 185)" />
          <ellipse cx="424" cy="195" rx="3" ry="7" transform="rotate(61 424 195)" />
          <circle cx="125" cy="390" r="2" />
          <circle cx="141" cy="399" r="1.5" />
          <circle cx="116" cy="410" r="1.5" />
        </g>
      </svg>
    </div>
  );
};
