import { MessageCircle } from 'lucide-react';
import React, { ComponentProps } from 'react';

const FloatingButton = ({ ...props }: ComponentProps<'button'>) => {
  return (
    <button
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg focus:outline-none"
      aria-label="open chat"
      {...props}
    >
      <MessageCircle size={28} />
    </button>
  );
};

export default FloatingButton;
