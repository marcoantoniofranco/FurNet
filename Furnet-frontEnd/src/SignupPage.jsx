import React, { useState } from 'react';
import './LoginPage.css'; // Reaproveitando o mesmo CSS
import InputField from './components/InputField';
import Button from './components/Button';

export default function SignupPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSignup = async () => {
    // Verificação básica
    if (!nome || !email || !senha) {
      setMensagem('Por favor, preencha todos os campos');
      return;
    }

    try {
      // Chamada para a API
      const response = await fetch('http://localhost:5000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nome: nome,
          Email: email,
          Senha: senha
        })
      });

      if (response.ok) {
        setMensagem('Conta criada com sucesso!');
        // Limpar os campos após sucesso
        setNome('');
        setEmail('');
        setSenha('');
      } else {
        const erro = await response.text();
        setMensagem(`Erro ao criar conta: ${erro}`);
      }
    } catch (error) {
      setMensagem(`Erro de conexão: ${error.message}`);
    }
  };

  const voltar = () => {
    // Navegando de volta para a página de login usando React Router
    window.location.href = '/login';
  };

  return (
    <div className="login-background">
      <div className="login-box">
        <h2>Criar Conta</h2>
        
        {mensagem && <p className="mensagem">{mensagem}</p>}
        
        <InputField
          type="text"
          placeholder="Nome"
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
        
        <Button 
          text="Criar Conta" 
          className="login-btn" 
          onClick={handleSignup} 
        />
        
        <Button 
          text="Voltar" 
          className="signup-btn" 
          onClick={voltar} 
        />
      </div>
    </div>
  );
}
