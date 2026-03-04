import { useEffect, useState } from 'react';
import contentService from '../../services/contentService';

const initialForm = {
  company: '',
  role: '',
  duration: '',
  description: '',
  location: '',
  sortOrder: 0
};

const ManageExperience = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');

  const loadItems = async () => {
    const data = await contentService.getExperience();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const reset = () => {
    setForm(initialForm);
    setEditingId('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (editingId) {
      await contentService.updateExperience(editingId, form);
    } else {
      await contentService.createExperience(form);
    }

    reset();
    await loadItems();
  };

  const onEdit = (item) => {
    setEditingId(item._id);
    setForm({
      company: item.company,
      role: item.role,
      duration: item.duration,
      description: item.description,
      location: item.location || '',
      sortOrder: item.sortOrder || 0
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this experience entry?')) {
      return;
    }

    await contentService.deleteExperience(id);
    await loadItems();
  };

  return (
    <section>
      <h2>Manage Experience</h2>

      <form className="card stack-md reveal-up" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Company"
          required
          value={form.company}
          onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Role"
          required
          value={form.role}
          onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Duration"
          required
          value={form.duration}
          onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
        />
        <textarea
          rows="4"
          placeholder="Description"
          required
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Sort order"
          value={form.sortOrder}
          onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
        />

        <div className="row gap-sm">
          <button className="btn" type="submit">
            {editingId ? 'Update Entry' : 'Add Entry'}
          </button>
          {editingId ? (
            <button className="btn secondary" type="button" onClick={reset}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="grid cards-2 mt-lg stagger-group">
        {items.map((item) => (
          <article key={item._id} className="card reveal-up">
            <h3>{item.role}</h3>
            <p className="subtle">
              {item.company} • {item.duration}
            </p>
            <p>{item.description}</p>
            <div className="row gap-sm">
              <button type="button" className="btn tiny secondary" onClick={() => onEdit(item)}>
                Edit
              </button>
              <button type="button" className="btn tiny danger" onClick={() => onDelete(item._id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ManageExperience;
