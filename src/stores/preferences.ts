import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Langue, Theme } from '@/types';
import { storage } from '@/services/storage.service';

interface PrefState {
  langue: Langue;
  theme: Theme;
  reduireMotion: boolean;
  vuePlats: 'cartes' | 'carte-menu';
  setLangue: (l: Langue) => void;
  setTheme: (t: Theme) => void;
  setReduireMotion: (v: boolean) => void;
  setVuePlats: (v: 'cartes' | 'carte-menu') => void;
}

const mem = {
  getItem: (name: string) => JSON.stringify(storage.lire(name, null)),
  setItem: (name: string, value: string) => {
    try {
      storage.ecrire(name, JSON.parse(value));
    } catch {
      storage.ecrire(name, value);
    }
  },
  removeItem: (name: string) => storage.supprimer(name),
};

export const usePreferences = create<PrefState>()(
  persist(
    (set) => ({
      langue: 'fr',
      theme: 'systeme',
      reduireMotion: false,
      vuePlats: 'cartes',
      setLangue: (langue) => set({ langue }),
      setTheme: (theme) => set({ theme }),
      setReduireMotion: (reduireMotion) => set({ reduireMotion }),
      setVuePlats: (vuePlats) => set({ vuePlats }),
    }),
    { name: 'preferences', storage: createJSONStorage(() => mem) },
  ),
);
