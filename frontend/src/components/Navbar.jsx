import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link to="/" className="brand">
          Sagar Kumar
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Link to="/admin/login" className="btn tiny">
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
