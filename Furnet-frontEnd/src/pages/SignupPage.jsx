import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import InputField from '../components/InputField.jsx';
import './LoginPage.css';

export default function SignupPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    if (!nome || !email || !senha) {
      setMessage('Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:5224/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nome: nome,
          Email: email,
          Senha: senha,
        }),
      });

      if (response.ok) {
        setMessage('Conta criada com sucesso!');
        setNome('');
        setEmail('');
        setSenha('');

        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setMessage('Erro ao criar conta');
      }
    } catch {
      setMessage('Erro de conexão');
    }
  };

  const goBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="login-background">
      <div className="login-box">
        <h2>Criar Conta</h2>

        {message && (
          <p className={message.includes('sucesso') ? 'success' : 'error'}>
            {message}
          </p>
        )}

        <InputField
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

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

        <Button text="Criar Conta" onClick={handleSignup} />
        <Button text="Voltar" type="secondary" onClick={goBack} />
      </div>
    </div>
  );
}
