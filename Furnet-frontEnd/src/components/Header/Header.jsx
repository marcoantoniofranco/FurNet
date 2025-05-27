import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarioEmail');
    localStorage.removeItem('usuarioId');
    window.location.href = '/';
  };

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="logo">
          Furnet
        </Link>

        {usuarioLogado ? (
          <div className="user-nav">
            <Link to="/postagens" className="nav-link">
              Postagens
            </Link>
            <Link to="/profile" className="nav-link">
              Perfil
            </Link>
            <div className="user-info">
              <span className="user-name">
                Olá, {usuarioLogado || 'Usuário'}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>
        ) : (
          <div className="auth-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/login" className="nav-link">
              Entrar
            </Link>
            <Link to="/signup" className="nav-link signup">
              Criar Conta
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
