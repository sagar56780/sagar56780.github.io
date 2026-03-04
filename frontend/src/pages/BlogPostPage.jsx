import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import usePageMeta from '../hooks/usePageMeta';
import contentService from '../services/contentService';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: blog ? `${blog.title} | Sagar Kumar Blog` : 'Blog Post | Sagar Kumar',
    description: blog?.excerpt || 'Blog post by Sagar Kumar.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await contentService.getBlogBySlug(slug);
        setBlog(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  if (loading) {
    return <Loader />;
  }

  if (!blog) {
    return (
      <section className="card">
        <h2>Post not found</h2>
        <Link to="/blog" className="btn tiny">
          Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <article className="card reveal-up prose">
      <p className="eyebrow">Blog</p>
      <h1>{blog.title}</h1>
      <p className="subtle">
        {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
      <div className="tag-list">
        {blog.tags?.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <p style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</p>
    </article>
  );
};

export default BlogPostPage;
