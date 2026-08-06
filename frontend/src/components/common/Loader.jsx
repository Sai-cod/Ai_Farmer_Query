import React from 'react';
import { LuSprout } from 'react-icons/lu';

const Loader = ({ text = 'लोड होत आहे...', size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-lg',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <div className="relative flex items-center justify-center">
        <div className="absolute animate-ping inline-flex h-12 w-12 rounded-full bg-[#4CAF50] opacity-30"></div>
        <LuSprout className={`${sizes[size].split(' ')[0]} ${sizes[size].split(' ')[1]} text-[#2E7D32] animate-bounce`} />
      </div>
      {text && <p className="text-gray-600 font-medium text-sm animate-pulse font-marathi">{text}</p>}
    </div>
  );
};

export default Loader;
