import React from 'react';

// Componente reutilizável que recebe props
export default function Button({ text, onClick, type = 'primary' }) {
  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: type === 'primary' ? '#007bff' : '#6c757d',
    color: 'white',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}
