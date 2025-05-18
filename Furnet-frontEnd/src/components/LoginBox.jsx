import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

const LoginBox = ({ onLogin, onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (onLogin) {
      onLogin(username, password);
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      
      <InputField
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <InputField
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <Button 
        text="Entrar" 
        className="login-btn" 
        onClick={handleLogin} 
      />
      
      <Button 
        text="Criar Conta" 
        className="signup-btn" 
        onClick={onSignup} 
      />
    </div>
  );
};

export default LoginBox;
