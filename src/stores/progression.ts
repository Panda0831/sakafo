import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '@/services/storage.service';

interface ProgState {
  etapes: Record<string, string[]>;
  marquer: (parcoursId: string, etapeId: string) => void;
  reinitialiser: (parcoursId: string) => void;
  courses: string[];
  ajouterCourse: (id: string) => void;
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

export const useProgression = create<ProgState>()(
  persist(
    (set, get) => ({
      etapes: {},
      courses: [],
      marquer: (parcoursId, etapeId) => {
        const cur = get().etapes[parcoursId] ?? [];
        if (cur.includes(etapeId)) return;
        set({ etapes: { ...get().etapes, [parcoursId]: [...cur, etapeId] } });
      },
      reinitialiser: (parcoursId) => {
        const next = { ...get().etapes };
        delete next[parcoursId];
        set({ etapes: next });
      },
      ajouterCourse: (id) => {
        if (get().courses.includes(id)) return;
        set({ courses: [...get().courses, id] });
      },
    }),
    { name: 'progression', storage: createJSONStorage(() => mem) },
  ),
);
