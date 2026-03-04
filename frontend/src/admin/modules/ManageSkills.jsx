import { useEffect, useState } from 'react';
import contentService from '../../services/contentService';

const initialForm = {
  category: '',
  name: '',
  level: 80,
  icon: '',
  sortOrder: 0
};

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');

  const loadSkills = async () => {
    const data = await contentService.getSkills();
    setSkills(data);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const reset = () => {
    setForm(initialForm);
    setEditingId('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (editingId) {
      await contentService.updateSkill(editingId, form);
    } else {
      await contentService.createSkill(form);
    }

    reset();
    await loadSkills();
  };

  const onEdit = (item) => {
    setEditingId(item._id);
    setForm({
      category: item.category,
      name: item.name,
      level: item.level,
      icon: item.icon || '',
      sortOrder: item.sortOrder || 0
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) {
      return;
    }

    await contentService.deleteSkill(id);
    await loadSkills();
  };

  return (
    <section>
      <h2>Manage Skills</h2>

      <form className="card stack-md reveal-up" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Category"
          required
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Skill name"
          required
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="number"
          min="0"
          max="100"
          placeholder="Level"
          value={form.level}
          onChange={(e) => setForm((prev) => ({ ...prev, level: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Icon (optional)"
          value={form.icon}
          onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Sort order"
          value={form.sortOrder}
          onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
        />

        <div className="row gap-sm">
          <button className="btn" type="submit">
            {editingId ? 'Update Skill' : 'Add Skill'}
          </button>
          {editingId ? (
            <button className="btn secondary" type="button" onClick={reset}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="grid cards-2 mt-lg stagger-group">
        {skills.map((skill) => (
          <article key={skill._id} className="card reveal-up">
            <h3>{skill.name}</h3>
            <p className="subtle">
              {skill.category} • {skill.level}%
            </p>
            <div className="row gap-sm">
              <button className="btn tiny secondary" onClick={() => onEdit(skill)} type="button">
                Edit
              </button>
              <button className="btn tiny danger" onClick={() => onDelete(skill._id)} type="button">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ManageSkills;
