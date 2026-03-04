import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ProjectCard from '../components/ProjectCard';
import usePageMeta from '../hooks/usePageMeta';
import { buildAssetUrl } from '../services/api';
import contentService from '../services/contentService';

const HomePage = () => {
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: 'Sagar Kumar | Full Stack Developer',
    description:
      'Developer portfolio of Sagar Kumar showcasing projects, skills, experience, and contact information.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [aboutData, projectData] = await Promise.all([
          contentService.getAbout(),
          contentService.getProjects()
        ]);

        setAbout(aboutData);
        setProjects(projectData);

        const resumeData = await contentService.getResume();
        setResume(resumeData);
      } catch {
        setResume(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const featured = useMemo(() => {
    return projects.filter((item) => item.featured).slice(0, 3);
  }, [projects]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <div className="hero reveal-up">
        <div>
          <p className="eyebrow">Developer Portfolio</p>
          <h1>{about?.fullName || 'Sagar Kumar'}</h1>
          <p className="headline">{about?.headline || 'Full Stack Developer'}</p>
          <p className="subtle">{about?.shortBio}</p>

          <div className="row gap-sm wrap">
            <Link className="btn" to="/projects">
              View Projects
            </Link>
            <Link className="btn secondary" to="/contact">
              Contact
            </Link>
            {resume ? (
              <a href={contentService.getResumeDownloadUrl()} className="btn ghost" target="_blank" rel="noreferrer">
                Download Resume
              </a>
            ) : null}
          </div>
        </div>

        <div className="hero-image-wrap">
          {about?.profileImageUrl ? (
            <img
              src={buildAssetUrl(about.profileImageUrl)}
              alt={about.fullName || 'Sagar Kumar'}
              className="hero-image"
              loading="lazy"
            />
          ) : (
            <div className="avatar-fallback">SK</div>
          )}
        </div>
      </div>

      <section className="section">
        <div className="section-row between reveal-up">
          <h2>Highlighted Projects</h2>
          <Link to="/projects" className="btn tiny secondary">
            See all
          </Link>
        </div>

        <div className="grid cards-3 stagger-group">
          {(featured.length ? featured : projects.slice(0, 3)).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default HomePage;
