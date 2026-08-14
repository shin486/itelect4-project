import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router'; // ← This import is essential
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* ← This wrapper is essential */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);