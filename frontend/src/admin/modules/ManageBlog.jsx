import { useEffect, useState } from 'react';
import contentService from '../../services/contentService';

const initialForm = {
  title: '',
  excerpt: '',
  content: '',
  tags: '',
  coverImage: '',
  isPublished: true
};

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');

  const loadBlogs = async () => {
    const data = await contentService.getAdminBlogs();
    setBlogs(data);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const reset = () => {
    setForm(initialForm);
    setEditingId('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      tags: form.tags
    };

    if (editingId) {
      await contentService.updateBlog(editingId, payload);
    } else {
      await contentService.createBlog(payload);
    }

    reset();
    await loadBlogs();
  };

  const onEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt || '',
      content: blog.content,
      tags: blog.tags?.join(', ') || '',
      coverImage: blog.coverImage || '',
      isPublished: blog.isPublished
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) {
      return;
    }

    await contentService.deleteBlog(id);
    await loadBlogs();
  };

  return (
    <section>
      <h2>Manage Blog</h2>

      <form className="card stack-md reveal-up" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          required
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
        />
        <textarea
          rows="3"
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
        />
        <textarea
          rows="8"
          placeholder="Content"
          value={form.content}
          required
          onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
        />
        <input
          type="url"
          placeholder="Cover image URL"
          value={form.coverImage}
          onChange={(e) => setForm((prev) => ({ ...prev, coverImage: e.target.value }))}
        />

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => setForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
          />
          Published
        </label>

        <div className="row gap-sm">
          <button className="btn" type="submit">
            {editingId ? 'Update Blog' : 'Add Blog'}
          </button>
          {editingId ? (
            <button className="btn secondary" type="button" onClick={reset}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="grid cards-2 mt-lg stagger-group">
        {blogs.map((blog) => (
          <article key={blog._id} className="card reveal-up">
            <h3>{blog.title}</h3>
            <p className="subtle">{blog.isPublished ? 'Published' : 'Draft'}</p>
            <p>{blog.excerpt || `${blog.content.slice(0, 120)}...`}</p>
            <div className="row gap-sm">
              <button type="button" className="btn tiny secondary" onClick={() => onEdit(blog)}>
                Edit
              </button>
              <button type="button" className="btn tiny danger" onClick={() => onDelete(blog._id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ManageBlog;
