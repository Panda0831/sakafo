import { create } from 'zustand';

export interface ToastItem {
  id: string;
  message: string;
  tone: 'info' | 'erreur';
}

interface UiState {
  rechercheOuverte: boolean;
  menuOuvert: boolean;
  toasts: ToastItem[];
  panierPulse: number;
  ouvrirRecherche: (v: boolean) => void;
  ouvrirMenu: (v: boolean) => void;
  toast: (message: string, tone?: ToastItem['tone']) => void;
  retirerToast: (id: string) => void;
  pulsePanier: () => void;
}

export const useUi = create<UiState>((set, get) => ({
  rechercheOuverte: false,
  menuOuvert: false,
  toasts: [],
  panierPulse: 0,
  ouvrirRecherche: (rechercheOuverte) => set({ rechercheOuverte }),
  ouvrirMenu: (menuOuvert) => set({ menuOuvert }),
  toast: (message, tone = 'info') => {
    const id = crypto.randomUUID();
    set({ toasts: [...get().toasts, { id, message, tone }] });
    window.setTimeout(() => get().retirerToast(id), 4000);
  },
  retirerToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
  pulsePanier: () => set({ panierPulse: get().panierPulse + 1 }),
}));
