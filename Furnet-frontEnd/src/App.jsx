import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PostagensPage from './pages/PostagensPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SignupPage from './pages/SignupPage.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="AppBody">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/postagens" element={<PostagensPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
