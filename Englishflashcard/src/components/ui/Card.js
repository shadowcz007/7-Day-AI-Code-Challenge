import React from 'react';

export const Card = ({ children, className ,onClick}) => (
  <div className={`bg-white shadow-md rounded ${className}`} onClick={onClick}>
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);