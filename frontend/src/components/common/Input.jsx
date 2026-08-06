import React from 'react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  icon: Icon = null,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-[#333333] flex items-center gap-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#2E7D32] pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${
            Icon ? 'pl-11' : 'pl-4'
          } pr-4 py-3 bg-white border ${
            error ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 focus:border-[#2E7D32] focus:ring-[#4CAF50]/30'
          } rounded-xl text-[#333333] placeholder-gray-400 shadow-sm focus:outline-none focus:ring-4 transition-all duration-200 text-base font-marathi`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 font-medium pl-1">{error}</span>}
    </div>
  );
};

export default Input;
