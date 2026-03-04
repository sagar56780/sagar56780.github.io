import { useEffect, useMemo, useState } from 'react';
import { buildAssetUrl } from '../services/api';

const normalizeTechList = (technologies = []) => {
  return (Array.isArray(technologies) ? technologies : [])
    .map((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        const name = String(item.name || '').trim();
        const icon = String(item.icon || '').trim();

        if (!name) {
          return null;
        }

        return { name, icon };
      }

      const text = String(item || '').trim();

      if (!text) {
        return null;
      }

      const [namePart, ...iconParts] = text.split('|');
      const name = String(namePart || '').trim();
      const icon = String(iconParts.join('|') || '').trim();

      if (!name) {
        return null;
      }

      return { name, icon };
    })
    .filter(Boolean);
};

const normalizeLinks = (project) => {
  const directLinks = Array.isArray(project.links) ? project.links : [];

  const fromList = directLinks
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const label = String(item.label || '').trim() || 'Link';
      const url = String(item.url || '').trim();

      if (!url || !/^https?:\/\//i.test(url)) {
        return null;
      }

      return { label, url };
    })
    .filter(Boolean);

  const addLegacy = (label, url) => {
    const clean = String(url || '').trim();
    if (!clean || !/^https?:\/\//i.test(clean)) {
      return;
    }

    const exists = fromList.some((item) => item.url.toLowerCase() === clean.toLowerCase());
    if (!exists) {
      fromList.push({ label, url: clean });
    }
  };

  addLegacy('GitHub', project.githubUrl);
  addLegacy('Live Demo', project.liveUrl);

  return fromList;
};

const normalizeImages = (project) => {
  const images = [];

  if (Array.isArray(project.images)) {
    project.images.forEach((item) => {
      const value = String(item || '').trim();
      if (value) {
        images.push(value);
      }
    });
  }

  const fallback = String(project.imageUrl || '').trim();
  if (fallback && !images.includes(fallback)) {
    images.unshift(fallback);
  }

  return [...new Set(images)];
};

const normalizeHighlights = (project) => {
  if (Array.isArray(project.highlights)) {
    return project.highlights.map((item) => String(item).trim()).filter(Boolean);
  }

  return [];
};

const fallbackFromName = (name) => {
  const text = String(name || '').trim();
  if (!text) {
    return 'T';
  }

  return text.slice(0, 2).toUpperCase();
};

const ProjectCard = ({ project }) => {
  const technologies = useMemo(() => normalizeTechList(project.technologies), [project.technologies]);
  const links = useMemo(() => normalizeLinks(project), [project]);
  const images = useMemo(() => normalizeImages(project), [project]);
  const highlights = useMemo(() => normalizeHighlights(project), [project]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project._id, images.length]);

  const activeImage = images[activeImageIndex] || '';

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <article className="card project-card reveal-up">
      {images.length ? (
        <div className="project-gallery">
          <div className="project-gallery-main-wrap">
            <img
              src={buildAssetUrl(activeImage)}
              alt={project.title}
              className="project-gallery-main"
              loading="lazy"
            />

            {project.status || project.year ? (
              <div className="project-meta-badges">
                {project.status ? <span className="project-meta-chip">{project.status}</span> : null}
                {project.year ? <span className="project-meta-chip">{project.year}</span> : null}
              </div>
            ) : null}

            {images.length > 1 ? (
              <>
                <button type="button" className="gallery-nav prev" onClick={prevImage} aria-label="Previous image">
                  ‹
                </button>
                <button type="button" className="gallery-nav next" onClick={nextImage} aria-label="Next image">
                  ›
                </button>
              </>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className="project-thumbs" aria-label="Project image thumbnails">
              {images.map((img, index) => (
                <button
                  key={`${project._id}-img-${index}`}
                  type="button"
                  className={index === activeImageIndex ? 'project-thumb active' : 'project-thumb'}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={buildAssetUrl(img)} alt={`${project.title} preview ${index + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="card-content">
        <div className="section-row between">
          <h3>{project.title}</h3>
          {project.role ? <span className="subtle">{project.role}</span> : null}
        </div>

        <p>{project.description}</p>

        {highlights.length ? (
          <ul className="project-highlights">
            {highlights.map((point, index) => (
              <li key={`${project._id}-highlight-${index}`}>{point}</li>
            ))}
          </ul>
        ) : null}

        {technologies.length ? (
          <div className="project-tech-list">
            {technologies.map((tech) => (
              <span key={`${project._id}-${tech.name}`} className="tech-pill">
                {tech.icon ? (
                  <img src={buildAssetUrl(tech.icon)} alt={`${tech.name} icon`} className="tech-pill-icon" loading="lazy" />
                ) : (
                  <span className="tech-pill-fallback">{fallbackFromName(tech.name)}</span>
                )}
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        ) : null}

        {links.length ? (
          <div className="row gap-sm wrap">
            {links.map((link, index) => (
              <a
                key={`${project._id}-link-${index}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="btn tiny secondary"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
};

export default ProjectCard;
