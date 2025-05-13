import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Quinn from './Quinn.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Quinn />
  </StrictMode>,
);
