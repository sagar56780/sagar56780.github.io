import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DEFAULT_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@sagarkumar.dev';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      const destination = location.state?.from || '/admin';
      navigate(destination, { replace: true });
    } catch (error) {
      setError(error?.message || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card reveal-up" onSubmit={onSubmit}>
        <p className="eyebrow">Admin Access</p>
        <h1>Sign in</h1>
        <p className="subtle">Static mode: credentials are validated in-browser.</p>
        <p className="subtle">Default email: {DEFAULT_ADMIN_EMAIL}</p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Login'}
        </button>

        {error ? <p className="danger-text">{error}</p> : null}

        <Link to="/" className="subtle">
          Back to website
        </Link>
      </form>
    </div>
  );
};

export default AdminLoginPage;
