export const ease = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
  outBack: [0.34, 1.56, 0.64, 1],
  standard: [0.2, 0, 0, 1],
} as const;

export const spring = {
  ui: { type: 'spring' as const, stiffness: 320, damping: 30, mass: 0.9 },
  soft: { type: 'spring' as const, stiffness: 180, damping: 24, mass: 1 },
  pop: { type: 'spring' as const, stiffness: 520, damping: 16, mass: 0.7 },
  sheet: { type: 'spring' as const, stiffness: 260, damping: 32, mass: 1 },
  swing: { type: 'spring' as const, stiffness: 90, damping: 8, mass: 1.1 },
};

export const dur = { micro: 0.16, fast: 0.28, base: 0.45, slow: 0.7, hero: 1.1 } as const;
export const stagger = { tight: 0.035, base: 0.06, loose: 0.1 } as const;
export const viewportOnce = { once: true, amount: 0.25 } as const;
