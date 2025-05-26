import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import InputField from '../components/InputField.jsx';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  // async/await para aguardar resposta do servidor
  const handleLogin = async () => {
    if (!email || !senha) {
      setMessage('Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:5224/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Senha: senha,
        }),
      });

      if (response.ok) {
        localStorage.setItem('usuarioLogado', email);
        setMessage('Login realizado com sucesso!');

        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        setMessage('Email ou senha incorretos');
      }
    } catch {
      setMessage('Erro de conexão com o servidor');
    }
  };

  const goToSignup = () => {
    window.location.href = '/signup';
  };

  return (
    <div className="login-background">
      <div className="login-box">
        <h2>Login</h2>

        {message && (
          <p className={message.includes('sucesso') ? 'success' : 'error'}>
            {message}
          </p>
        )}

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Button text="Entrar" onClick={handleLogin} />
        <Button text="Criar Conta" type="secondary" onClick={goToSignup} />
      </div>
    </div>
  );
}
