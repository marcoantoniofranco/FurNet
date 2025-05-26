import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  return (
    <header className="furnet-header">
      <nav className="navegacao-header">
        <Link to="/" className="logo-furnet">
          Furnet
        </Link>

        <ul className="links-menu">
          <li>
            <Link to="/" className="item-menu">
              Home
            </Link>
          </li>

          {/* Mostra diferentes opções dependendo se está logado */}
          {usuarioLogado ? (
            <>
              <li>
                <Link to="/profile" className="item-menu">
                  Meu Perfil
                </Link>
              </li>
              <li>
                <span className="item-menu">Olá, {usuarioLogado}!</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="item-menu">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="item-menu">
                  Criar Conta
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
