import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Header from './components/Header/Header.jsx'; 
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx'; 
import './App.css';


function App() {
  return (
    <>
      <Header />
      <main style={{ marginTop: '20px', padding: '0 20px' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/" 
            element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>(Página Inicial - Conteúdo ainda vai ser adicionado)</p>
              </div>
            }/>
        </Routes>
      </main>
    </>
  );
}

export default App;