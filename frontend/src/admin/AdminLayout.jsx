import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <AdminTopbar />
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
