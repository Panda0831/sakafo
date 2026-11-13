export const joursDepuisAujourdhui = (n: number): Date => {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
};

export const formaterDateFr = (d: Date, locale = 'fr-FR'): string =>
  new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);

export const formaterDateCourte = (d: Date, locale = 'fr-FR'): string =>
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(d);
