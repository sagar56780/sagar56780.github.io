import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import './styles/variables.css';
import './styles/animations.css';
import './styles/global.css';

function migrateLegacyHash() {
  if (typeof window === 'undefined') {
    return;
  }

  const { hash } = window.location;
  const legacyHashRoute = hash.startsWith('#/') ? hash.slice(1) : '';

  if (legacyHashRoute) {
    window.history.replaceState(null, '', `${window.location.pathname}${legacyHashRoute}`);
  }
}

migrateLegacyHash();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
