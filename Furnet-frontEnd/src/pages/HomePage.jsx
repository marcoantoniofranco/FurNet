import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bem-vindo ao Furnet!</h1>
        <p className="home-description">
          Sua plataforma para conectar e compartilhar experiências.
        </p>

        <div className="home-buttons">
          <Link to="/login" className="home-btn primary">
            Fazer Login
          </Link>
          <Link to="/signup" className="home-btn secondary">
            Criar Conta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
