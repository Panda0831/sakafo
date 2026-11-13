import { AnimatePresence, motion } from "motion/react";
import { Button } from "./Button";

export const EmptyState = ({
    message,
    actionLabel,
    onAction,
    to,
}: {
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    to?: string;
}) => (
    <AnimatePresence>
        <div className="grid place-items-center text-center py-16 px-6">
            <motion.div
                className="h-40 w-40 rounded-circle bg-riziere-100 grid place-items-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="h-28 w-28 rounded-circle border-4 border-riziere-500/30 relative">
                    <span className="absolute left-1/2 top-1/2 h-2 w-5 -translate-x-1/2 rounded-pill bg-ylang-400" />
                </div>
            </motion.div>
            <p className="max-w-[36ch] text-girofle-600">{message}</p>
            {actionLabel && (to || onAction) && (
                <div className="mt-6">
                    <Button to={to} onClick={onAction}>
                        {actionLabel}
                    </Button>
                </div>
            )}
        </div>
    </AnimatePresence>
);
