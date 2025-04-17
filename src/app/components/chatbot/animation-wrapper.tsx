import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

const AnimationWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-24 right-4 w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col"
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
