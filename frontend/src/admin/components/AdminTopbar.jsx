import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../../components/ThemeToggle';

const AdminTopbar = () => {
  const { admin, logout } = useAuth();

  return (
    <header className="admin-topbar reveal-up">
      <div>
        <h1>Admin Dashboard</h1>
        <p className="subtle">Logged in as {admin?.email || 'admin'}</p>
      </div>
      <div className="row gap-sm">
        <ThemeToggle />
        <button type="button" className="btn tiny danger" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
