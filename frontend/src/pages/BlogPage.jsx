import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import SectionHeader from '../components/SectionHeader';
import usePageMeta from '../hooks/usePageMeta';
import contentService from '../services/contentService';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: 'Blog | Sagar Kumar',
    description: 'Technical insights and articles by Sagar Kumar.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await contentService.getBlogs();
        setBlogs(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <SectionHeader title="Blog" subtitle="Thoughts, tutorials, and development notes." />

      <div className="grid cards-2 stagger-group">
        {blogs.map((blog) => (
          <article key={blog._id} className="card reveal-up">
            <h3>{blog.title}</h3>
            <p className="subtle">
              {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p>{blog.excerpt || `${blog.content.slice(0, 140)}...`}</p>
            <Link to={`/blog/${blog.slug}`} className="btn tiny secondary">
              Read More
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
