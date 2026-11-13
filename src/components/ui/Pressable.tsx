import { motion, type HTMLMotionProps } from 'motion/react';
import { spring } from '@/motion/tokens';
import { cn } from '@/utils/cn';

type Props = HTMLMotionProps<'button'> & { calm?: boolean };

export const Pressable = ({ className, calm, children, ...rest }: Props) => (
  <motion.button
    type="button"
    className={cn('relative overflow-hidden', className)}
    whileHover={calm ? { y: -1, scale: 1.01 } : { y: -2, scale: 1.02 }}
    whileTap={{ scale: 0.96 }}
    transition={spring.ui}
    {...rest}
  >
    {children}
  </motion.button>
);
