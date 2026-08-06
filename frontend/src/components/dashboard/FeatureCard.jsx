import React from 'react';
import { LuArrowRight, LuLock } from 'react-icons/lu';

const FeatureCard = ({
  icon,
  title,
  description,
  buttonText,
  badgeText,
  disabled = false,
  onClick,
}) => {
  return (
    <div
      className={`relative flex flex-col justify-between p-6 bg-white rounded-2xl border transition-all duration-300 ${
        disabled
          ? 'border-gray-200 bg-gray-50/70 opacity-75 cursor-not-allowed'
          : 'border-emerald-100 hover:border-[#4CAF50] hover:shadow-lg hover:-translate-y-1 bg-gradient-to-b from-white to-[#F5F7FA]'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`text-4xl p-3 rounded-2xl ${disabled ? 'bg-gray-100' : 'bg-[#E8F5E9]'}`}>
            {icon}
          </div>
          {disabled ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full font-marathi">
              <LuLock className="w-3 h-3" />
              {badgeText || 'लवकरच उपलब्ध'}
            </span>
          ) : (
            <span className="px-3 py-1 bg-emerald-100 text-[#2E7D32] text-xs font-bold rounded-full font-marathi">
              सक्रिय
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-[#333333] mb-2 font-marathi">
          {title}
        </h3>
        <p className="text-gray-600 text-sm font-marathi leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div>
        <button
          onClick={onClick}
          disabled={disabled}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all font-marathi ${
            disabled
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-md hover:shadow-lg active:scale-95'
          }`}
        >
          <span>{buttonText || 'सुरू करा'}</span>
          {!disabled && <LuArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default FeatureCard;
