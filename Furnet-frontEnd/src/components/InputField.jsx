import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="login-input"
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
