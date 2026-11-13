import { useEffect } from 'react';
import { usePreferences } from '@/stores/preferences';

export const useTheme = () => {
  const theme = usePreferences((s) => s.theme);
  useEffect(() => {
    const apply = (dark: boolean) => {
      document.documentElement.dataset.theme = dark ? 'sombre' : 'clair';
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#131114' : '#FDFDFB');
    };
    if (theme === 'systeme') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      apply(mq.matches);
      const sync = () => apply(mq.matches);
      mq.addEventListener('change', sync);
      return () => mq.removeEventListener('change', sync);
    }
    apply(theme === 'sombre');
  }, [theme]);
};
