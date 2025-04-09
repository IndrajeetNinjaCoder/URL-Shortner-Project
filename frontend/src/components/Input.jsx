// src/components/ui/input.jsx
import React from 'react';

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
};
