import React from 'react';

export default function InputField({ type, placeholder, value, onChange }) {
  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  return (
    <input
      style={inputStyle}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
