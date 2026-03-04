import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService';
import { TOKEN_KEY } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || '');
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    const loadAdmin = async () => {
      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      try {
        const profile = await authService.me();
        setAdmin(profile);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken('');
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    loadAdmin();
  }, [token]);

  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setAdmin(null);
  };

  const value = useMemo(
    () => ({ token, admin, loading, isAuthenticated: Boolean(token), login, logout }),
    [token, admin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
