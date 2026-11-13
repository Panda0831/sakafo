const PREFIX = 'sakafo:v1:';
const VERSION = 1;

export const storage = {
  lire<T>(cle: string, fallback: T, valider?: (v: unknown) => v is T): T {
    try {
      const raw = localStorage.getItem(PREFIX + cle);
      if (!raw) return fallback;
      const parsed: unknown = JSON.parse(raw);
      if (valider && !valider(parsed)) return fallback;
      return parsed as T;
    } catch {
      return fallback;
    }
  },
  ecrire(cle: string, valeur: unknown): void {
    try {
      localStorage.setItem(PREFIX + cle, JSON.stringify(valeur));
      localStorage.setItem(PREFIX + 'version', String(VERSION));
    } catch {
      /* quota / privé */
    }
  },
  supprimer(cle: string): void {
    try {
      localStorage.removeItem(PREFIX + cle);
    } catch {
      /* ignore */
    }
  },
  reinitialiser(): void {
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i += 1) {
        const k = localStorage.key(i);
        if (k?.startsWith(PREFIX)) keys.push(k);
      }
      keys.forEach((k) => localStorage.removeItem(k));
    } catch {
      /* ignore */
    }
  },
};

export const session = {
  lire(cle: string): string | null {
    try {
      return sessionStorage.getItem(PREFIX + cle);
    } catch {
      return null;
    }
  },
  ecrire(cle: string, valeur: string): void {
    try {
      sessionStorage.setItem(PREFIX + cle, valeur);
    } catch {
      /* ignore */
    }
  },
};
