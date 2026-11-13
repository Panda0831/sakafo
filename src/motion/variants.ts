import { dur, ease, spring, stagger } from './tokens';

export const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: spring.soft },
};

export const cascade = {
  hidden: {},
  show: { transition: { staggerChildren: stagger.base } },
};

export const maskWord = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: dur.base, ease: ease.outExpo } },
};

export const pageIn = {
  initial: { opacity: 0, scale: 0.99 },
  animate: { opacity: 1, scale: 1, transition: { duration: dur.slow, ease: ease.outExpo } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: dur.fast, ease: ease.inOutQuart } },
};
