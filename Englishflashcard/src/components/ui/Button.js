import React from 'react';

export const Button = ({ onClick, children, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="px-4 py-2 bg-blue-500 text-white rounded"
  style={{
    backgroundColor:disabled?'rgb(197 208 219)':'#007bff'
  }}
  >
    {children}
  </button>
);