import { useEffect, useState } from 'react';
import { usePreferences } from '@/stores/preferences';

export const useMotionPrefs = () => {
  const reduire = usePreferences((s) => s.reduireMotion);
  const [os, setOs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setOs(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return { reduce: reduire || os, force: reduire };
};

export const useMediaQuery = (q: string) => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const sync = () => setOk(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [q]);
  return ok;
};
