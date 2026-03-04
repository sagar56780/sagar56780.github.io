import { useEffect, useState } from 'react';
import { buildAssetUrl } from '../../services/api';
import contentService from '../../services/contentService';

const initialForm = {
  title: '',
  role: '',
  year: '',
  status: '',
  description: '',
  highlights: '',
  technologiesDetailed: '',
  projectLinks: '',
  featured: false,
  sortOrder: 0
};

const normalizeImages = (project) => {
  if (Array.isArray(project.images) && project.images.length) {
    return project.images.filter(Boolean);
  }

  return project.imageUrl ? [project.imageUrl] : [];
};

const toTechnologyEditorValue = (project) => {
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];

  return technologies
    .map((item) => {
      if (item && typeof item === 'object') {
        const name = String(item.name || '').trim();
        const icon = String(item.icon || '').trim();
        return icon ? `${name}|${icon}` : name;
      }

      const text = String(item || '').trim();
      return text;
    })
    .filter(Boolean)
    .join('\n');
};

const toLinkEditorValue = (project) => {
  const links = Array.isArray(project.links) ? project.links : [];

  if (links.length) {
    return links
      .map((item) => `${String(item.label || 'Link').trim()}|${String(item.url || '').trim()}`)
      .filter((line) => !line.endsWith('|'))
      .join('\n');
  }

  const fallback = [];
  if (project.githubUrl) {
    fallback.push(`GitHub|${project.githubUrl}`);
  }
  if (project.liveUrl) {
    fallback.push(`Live Demo|${project.liveUrl}`);
  }

  return fallback.join('\n');
};

const toHighlightsEditorValue = (project) => {
  if (!Array.isArray(project.highlights)) {
    return '';
  }

  return project.highlights.map((item) => String(item).trim()).filter(Boolean).join('\n');
};

const formatTechNames = (project) => {
  const list = Array.isArray(project.technologies) ? project.technologies : [];

  return list
    .map((item) => {
      if (item && typeof item === 'object') {
        return String(item.name || '').trim();
      }

      return String(item || '').trim();
    })
    .filter(Boolean);
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [saving, setSaving] = useState(false);

  const loadProjects = async () => {
    const data = await contentService.getProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setNewImages([]);
    setExistingImages([]);
    setEditingId('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, value);
      });

      payload.append('imagesExisting', JSON.stringify(existingImages));
      newImages.forEach((file) => payload.append('images', file));

      if (editingId) {
        await contentService.updateProject(editingId, payload);
      } else {
        await contentService.createProject(payload);
      }

      resetForm();
      await loadProjects();
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || '',
      role: project.role || '',
      year: project.year || '',
      status: project.status || '',
      description: project.description || '',
      highlights: toHighlightsEditorValue(project),
      technologiesDetailed: toTechnologyEditorValue(project),
      projectLinks: toLinkEditorValue(project),
      featured: Boolean(project.featured),
      sortOrder: Number(project.sortOrder) || 0
    });
    setExistingImages(normalizeImages(project));
    setNewImages([]);
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this project?')) {
      return;
    }

    await contentService.deleteProject(id);
    await loadProjects();
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <section>
      <h2>Manage Projects</h2>
      <p className="subtle">Add full project details including media gallery, links, and technology icons.</p>

      <form className="card stack-md reveal-up" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Project title"
          value={form.title}
          required
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
        />

        <div className="grid cards-2">
          <input
            type="text"
            placeholder="Your role (e.g. Full Stack Developer)"
            value={form.role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Year (e.g. 2026)"
            value={form.year}
            onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
          />
        </div>

        <input
          type="text"
          placeholder="Status (e.g. Live, In Progress)"
          value={form.status}
          onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
        />

        <textarea
          rows="5"
          placeholder="Project description"
          value={form.description}
          required
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        />

        <textarea
          rows="4"
          placeholder={'Highlights (one per line)\\nExample: Implemented JWT auth\\nOptimized LCP below 1.5s'}
          value={form.highlights}
          onChange={(e) => setForm((prev) => ({ ...prev, highlights: e.target.value }))}
        />

        <textarea
          rows="4"
          placeholder={
            'Technologies with icons (one per line)\\nExample: React|https://...react-original.svg\\nNode.js|https://...nodejs-original.svg'
          }
          value={form.technologiesDetailed}
          onChange={(e) => setForm((prev) => ({ ...prev, technologiesDetailed: e.target.value }))}
        />

        <textarea
          rows="4"
          placeholder={'Project links (one per line)\\nExample: Source Code|https://github.com/...\\nLive Demo|https://...'}
          value={form.projectLinks}
          onChange={(e) => setForm((prev) => ({ ...prev, projectLinks: e.target.value }))}
        />

        <div className="row gap-sm wrap">
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
            />
            Featured
          </label>

          <input
            type="number"
            placeholder="Sort order"
            value={form.sortOrder}
            onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
          />
        </div>

        <div className="stack-sm">
          <label htmlFor="project-images">Project images (multiple)</label>
          <input
            id="project-images"
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => setNewImages(Array.from(e.target.files || []))}
          />
        </div>

        {existingImages.length ? (
          <div className="stack-sm">
            <p className="subtle">Existing images</p>
            <div className="project-admin-media-grid">
              {existingImages.map((image, index) => (
                <div className="project-admin-media-item" key={`existing-${index}`}>
                  <img src={buildAssetUrl(image)} alt={`Existing project ${index + 1}`} loading="lazy" />
                  <button type="button" className="btn tiny danger" onClick={() => removeExistingImage(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {newImages.length ? (
          <div className="stack-sm">
            <p className="subtle">New images to upload</p>
            <div className="project-admin-file-list">
              {newImages.map((file, index) => (
                <div key={`${file.name}-${index}`} className="project-admin-file-item">
                  <span>{file.name}</span>
                  <button type="button" className="btn tiny danger" onClick={() => removeNewImage(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="row gap-sm">
          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId ? (
            <button type="button" className="btn secondary" onClick={resetForm}>
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="grid cards-2 mt-lg stagger-group">
        {projects.map((project) => (
          <article key={project._id} className="card reveal-up">
            <div className="section-row between">
              <h3>{project.title}</h3>
              {project.status ? <span className="tag">{project.status}</span> : null}
            </div>

            {normalizeImages(project).length ? (
              <img
                src={buildAssetUrl(normalizeImages(project)[0])}
                alt={project.title}
                className="project-image"
                loading="lazy"
              />
            ) : null}

            <p className="subtle">
              {project.role || 'Role not set'} {project.year ? `• ${project.year}` : ''}
            </p>
            <p>{project.description}</p>

            <div className="tag-list">
              {formatTechNames(project).slice(0, 5).map((tech) => (
                <span key={`${project._id}-${tech}`} className="tag">
                  {tech}
                </span>
              ))}
            </div>

            <p className="subtle">
              {normalizeImages(project).length} image(s) • {(Array.isArray(project.links) ? project.links.length : 0)} link(s)
            </p>

            <div className="row gap-sm">
              <button className="btn tiny secondary" onClick={() => onEdit(project)} type="button">
                Edit
              </button>
              <button className="btn tiny danger" onClick={() => onDelete(project._id)} type="button">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ManageProjects;
