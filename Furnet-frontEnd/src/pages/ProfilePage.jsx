import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import InputField from '../components/InputField.jsx';
import './LoginPage.css';

export default function ProfilePage() {
  // Recupera dados salvos no navegador
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  const [novaSenha, setNovaSenha] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    if (!novaSenha) {
      setMessage('Digite uma nova senha');
      return;
    }

    try {
      const response = await fetch('http://localhost:5224/usuarios/senha', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: usuarioLogado,
          NovaSenha: novaSenha,
        }),
      });

      if (response.ok) {
        setMessage('Senha alterada com sucesso!');
        setNovaSenha('');
      } else {
        setMessage('Erro ao alterar senha');
      }
    } catch {
      setMessage('Erro de conexão');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/';
  };

  const goBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="login-background">
      <div className="login-box">
        <h2>Meu Perfil</h2>

        <div style={{ marginBottom: '20px' }}>
          <p>
            <strong>Email:</strong> {usuarioLogado}
          </p>
          <p>
            <strong>Status:</strong> Usuário ativo
          </p>
        </div>

        <h3>Alterar Senha</h3>

        {message && (
          <p className={message.includes('sucesso') ? 'success' : 'error'}>
            {message}
          </p>
        )}

        <InputField
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />

        <Button text="Alterar Senha" onClick={handleChangePassword} />
        <Button text="Voltar para Home" type="secondary" onClick={goBack} />
        <Button text="Sair da Conta" type="secondary" onClick={handleLogout} />
      </div>
    </div>
  );
}
