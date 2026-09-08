import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ProjectCard from '../components/ProjectCard';
import usePageMeta from '../hooks/usePageMeta';
import { buildAssetUrl } from '../services/api';
import contentService from '../services/contentService';
import { SDLC_PIPELINE } from '../data/defaultContent';

const ROLES = [
  'Playwright E2E Test Automation',
  'REST API Testing · Postman · PHPUnit',
  'CI/CD · GitHub Actions · Docker',
  'Full-Stack Developer · Java · Spring Boot · React'
];

const HERO_TECH = ['Java', 'Spring Boot', 'React', 'Playwright', 'REST APIs', 'CI/CD'];

const TypingHero = ({ about }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex % ROLES.length];
    let timer;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === '') {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    } else {
      timer = setTimeout(
        () => {
          setText(current.slice(0, text.length + (deleting ? -1 : 1)));
        },
        deleting ? 38 : 62
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  return (
    <div className="hero hero-center reveal-up">
      <div className="hero-avatar-block">
        {about?.profileImageUrl ? (
          <div className="avatar-orbit">
            <span className="orbit-dot" />
            <div className="hero-image-ring">
              <img
                src={buildAssetUrl(about.profileImageUrl)}
                alt="Sagar Kumar — QA Automation Engineer and Full-Stack Developer"
                className="hero-image"
                fetchpriority="high"
              />
            </div>
            <span className="orbit-dot orbit-dot-2" />
          </div>
        ) : (
          <div className="avatar-fallback">SK</div>
        )}
      </div>

      <div className="hero-copy">
        <div className="terminal-bar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="terminal-title">sagar@portfolio ~ $ whoami</span>
        </div>

        <h1>{about?.fullName || 'Sagar Kumar'}</h1>

        <h2 className="hero-headline">
          {about?.headline || 'QA Automation Engineer & Full-Stack Developer'}
        </h2>

        <div className="type-row">
          <span className="prompt">$</span>
          <p className="typewriter">{text}</p>
          <span className="caret" />
        </div>

        <div className="tag-list hero-tech-line">
          {HERO_TECH.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        <p className="subtle hero-bio">
          QA Automation Engineer at Webkul — building reliable Playwright E2E suites, testing REST APIs, and
          driving CI/CD. Full-stack developer who understands the entire SDLC.
        </p>

        <div className="row gap-sm wrap hero-actions">
          <Link to="/projects" className="btn">
            View Projects
          </Link>
          <a
            href={contentService.getResumeDownloadUrl()}
            className="btn secondary"
            target="_blank"
            rel="noreferrer"
          >
            Download Resume
          </a>
          <a
            href={about?.socials?.github || 'https://github.com/sagarkumar446'}
            className="btn ghost"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href={about?.socials?.linkedin || 'https://www.linkedin.com/in/sagar-kumar-java-developer'}
            className="btn ghost"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <Link to="/contact" className="btn ghost">
            Contact Me
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat-chip">
            <strong>2+</strong>
            <span>Years Testing</span>
          </div>
          <div className="stat-chip">
            <strong>18+</strong>
            <span>E2E Suites</span>
          </div>
          <div className="stat-chip">
            <strong>24+</strong>
            <span>OSS PRs</span>
          </div>
          <div className="stat-chip">
            <strong>24</strong>
            <span>REST Endpoints</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PipelineSection = () => {
  return (
    <section className="section">
      <div className="section-row between reveal-up">
        <div>
          <p className="eyebrow">process</p>
          <h2>Engineering Lifecycle</h2>
        </div>
      </div>

      <div className="pipeline reveal-up">
        {SDLC_PIPELINE.map((stage, index) => (
          <div className="pipeline-node" key={stage.id}>
            <div className="pipeline-node-head">
              <span className="pipeline-icon">{stage.icon}</span>
              <span className="pipeline-step">0{index + 1}</span>
            </div>
            <h3>{stage.phase}</h3>
            <p>{stage.detail}</p>
            <div className="tag-list">
              {stage.tools.map((tool) => (
                <span key={tool} className="tag">
                  {tool}
                </span>
              ))}
            </div>
            {index < SDLC_PIPELINE.length - 1 ? <span className="pipeline-arrow">→</span> : null}
          </div>
        ))}
      </div>
    </section>
  );
};

const HomePage = () => {
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: 'Sagar Kumar | QA Automation Engineer & Full-Stack Developer',
    description:
      'QA Automation Engineer at Webkul specializing in Playwright E2E automation, REST API testing, CI/CD, and full-stack development with Java, Spring Boot and React.',
    path: '/'
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
      <TypingHero about={about} />

      <PipelineSection />

      <section className="section">
        <div className="section-row between reveal-up">
          <div>
            <p className="eyebrow">featured</p>
            <h2>Highlighted Work</h2>
          </div>
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
