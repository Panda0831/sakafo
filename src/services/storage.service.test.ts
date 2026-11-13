import { beforeEach, describe, expect, it } from 'vitest';
import { storage } from './storage.service';

class MemStorage {
  store = new Map<string, string>();
  getItem(k: string) {
    return this.store.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.store.set(k, v);
  }
  removeItem(k: string) {
    this.store.delete(k);
  }
  clear() {
    this.store.clear();
  }
  key(i: number) {
    return [...this.store.keys()][i] ?? null;
  }
  get length() {
    return this.store.size;
  }
}

describe('storage.service', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: new MemStorage(),
      configurable: true,
    });
  });

  it('écrit et relit une valeur', () => {
    storage.ecrire('x', { a: 1 });
    expect(storage.lire('x', { a: 0 })).toEqual({ a: 1 });
  });

  it('retombe sur le fallback si JSON corrompu', () => {
    localStorage.setItem('sakafo:v1:x', '{nope');
    expect(storage.lire('x', 42)).toBe(42);
  });

  it('rejette une valeur invalide', () => {
    storage.ecrire('n', 3);
    const isNum = (v: unknown): v is number => typeof v === 'number' && v > 10;
    expect(storage.lire('n', 99, isNum)).toBe(99);
  });

  it('réinitialise les clés préfixées', () => {
    storage.ecrire('a', 1);
    storage.reinitialiser();
    expect(storage.lire('a', 0)).toBe(0);
  });
});
