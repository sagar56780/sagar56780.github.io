import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ProtectedRoute from './admin/components/ProtectedRoute';
import useScrollReveal from './hooks/useScrollReveal';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AdminLoginPage = lazy(() => import('./admin/AdminLoginPage'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const DashboardPage = lazy(() => import('./admin/DashboardPage'));
const ManageProjects = lazy(() => import('./admin/modules/ManageProjects'));
const ManageExperience = lazy(() => import('./admin/modules/ManageExperience'));
const ManageSkills = lazy(() => import('./admin/modules/ManageSkills'));
const ManageAbout = lazy(() => import('./admin/modules/ManageAbout'));
const ManageResume = lazy(() => import('./admin/modules/ManageResume'));
const ManageBlog = lazy(() => import('./admin/modules/ManageBlog'));

const PublicLayout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const App = () => {
  useScrollReveal();

  return (
    <Suspense fallback={<Loader fullScreen />}>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="experience" element={<ManageExperience />} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="about" element={<ManageAbout />} />
          <Route path="resume" element={<ManageResume />} />
          <Route path="blog" element={<ManageBlog />} />
        </Route>

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
