import { useEffect } from 'react';

export const Seo = ({ title, description }: { title: string; description: string }) => {
  useEffect(() => {
    document.title = `${title} — Sakafo Gasy`;
    const el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute('content', description);
  }, [title, description]);
  return null;
};
