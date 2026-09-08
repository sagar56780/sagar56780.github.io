import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

const NotFoundPage = () => {
  usePageMeta({
    title: '404 | Page Not Found',
    description: 'The requested page could not be found.',
    robots: 'noindex, follow'
  });

  return (
    <section className="card center reveal-up">
      <h1>404</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/" className="btn tiny">
        Return Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
