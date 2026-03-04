import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/projects', label: 'Manage Projects' },
  { to: '/admin/experience', label: 'Manage Experience' },
  { to: '/admin/skills', label: 'Manage Skills' },
  { to: '/admin/about', label: 'Manage About' },
  { to: '/admin/resume', label: 'Manage Resume' },
  { to: '/admin/blog', label: 'Manage Blog' }
];

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2>Admin</h2>
      <nav>
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? 'admin-link active' : 'admin-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
