import React from 'react';

export const Select = ({ onValueChange, children }) => (
  <select onChange={(e) => onValueChange(e.target.value)} className="border rounded px-2 py-1">
    {children}
  </select>
);

export const SelectContent = ({ children }) => (
  <>{children}</>
);

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

export const SelectTrigger = ({ children }) => (
  <>{children}</>
);

export const SelectValue = ({ placeholder }) => (
  <option value="" disabled selected>{placeholder}</option>
);