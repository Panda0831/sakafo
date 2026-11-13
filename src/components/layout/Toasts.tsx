import { AnimatePresence, motion } from 'motion/react';
import { useUi } from '@/stores/ui';
import { spring } from '@/motion/tokens';

export const Toasts = () => {
  const toasts = useUi((s) => s.toasts);
  const retirer = useUi((s) => s.retirerToast);
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex flex-col gap-2 no-print" data-toast aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            layout
            initial={{ y: 16, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={spring.pop}
            onClick={() => retirer(t.id)}
            className={`rounded-pill px-5 py-3 shadow-[var(--sh-2)] ${t.tone === 'erreur' ? 'bg-litchi-700 text-perle' : 'bg-riziere-900 text-ecume'}`}
          >
            {t.message}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
};
