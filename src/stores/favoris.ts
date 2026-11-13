import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TypeFavori } from '@/types';
import {
  ajouterFavori,
  estFavori,
  type FavoriItem,
  retirerFavori,
} from '@/services/favoris.service';
import { storage } from '@/services/storage.service';

interface FavState {
  items: FavoriItem[];
  toggle: (id: string, type: TypeFavori) => 'ajoute' | 'retire';
  a: (id: string, type: TypeFavori) => boolean;
  vider: () => void;
  retirer: (id: string, type: TypeFavori) => void;
}

const mem = {
  getItem: (name: string) => JSON.stringify(storage.lire(name, null)),
  setItem: (name: string, value: string) => {
    try {
      storage.ecrire(name, JSON.parse(value));
    } catch {
      /* ignore */
    }
  },
  removeItem: (name: string) => storage.supprimer(name),
};

export const useFavoris = create<FavState>()(
  persist(
    (set, get) => ({
      items: [],
      a: (id, type) => estFavori(get().items, id, type),
      toggle: (id, type) => {
        const on = estFavori(get().items, id, type);
        set({
          items: on
            ? retirerFavori(get().items, id, type)
            : ajouterFavori(get().items, id, type),
        });
        return on ? 'retire' : 'ajoute';
      },
      retirer: (id, type) => set({ items: retirerFavori(get().items, id, type) }),
      vider: () => set({ items: [] }),
    }),
    { name: 'favoris', storage: createJSONStorage(() => mem) },
  ),
);
