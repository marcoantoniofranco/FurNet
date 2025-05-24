import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

function Header() {
  return (
    <header className="furnet-header">
      <nav className="navegacao-header">
        <Link to="/" className="logo-furnet">
          Furnet
        </Link>
        <ul className="links-menu">
          <li>
            <Link to="/" className="item-menu">
              Página Inicial
            </Link>
          </li>
          <li>
            <Link to="/login" className="item-menu"> Login </Link>
          </li>
          <li>
            <Link to="/signup" className="item-menu">
              Criar Conta
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;