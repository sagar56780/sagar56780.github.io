import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import SectionHeader from '../components/SectionHeader';
import usePageMeta from '../hooks/usePageMeta';
import { buildAssetUrl } from '../services/api';
import contentService from '../services/contentService';

const AboutPage = () => {
  const [about, setAbout] = useState(null);
  const [groupedSkills, setGroupedSkills] = useState({});
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: 'About | Sagar Kumar',
    description: 'Read the detailed introduction, technical stack, and core strengths of Sagar Kumar.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [aboutData, skillData] = await Promise.all([
          contentService.getAbout(),
          contentService.getGroupedSkills()
        ]);
        setAbout(aboutData);
        setGroupedSkills(skillData);
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
      <SectionHeader
        title="About Me"
        subtitle="QA Automation Engineer and Full-Stack developer focused on quality across the SDLC."
      />

      <div className="about-grid stagger-group">
        <article className="card reveal-up">
          <h3>{about?.fullName}</h3>
          <p>{about?.detailedBio}</p>
          <p className="subtle">{about?.shortBio}</p>
          <div className="tag-list">
            {about?.techStack?.map((stack) => (
              <span key={stack} className="tag">
                {stack}
              </span>
            ))}
          </div>
          <a href={contentService.getResumeDownloadUrl()} className="btn" target="_blank" rel="noreferrer">
            Download Resume
          </a>
        </article>

        <article className="card reveal-up about-photo-card">
          {about?.profileImageUrl ? (
            <div className="about-image-ring">
              <img
                src={buildAssetUrl(about.profileImageUrl)}
                alt={about?.fullName}
                className="about-image"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="avatar-fallback large">SK</div>
          )}
        </article>
      </div>

      <section className="section">
        <h2>Skills by Category</h2>
        <div className="grid cards-2 stagger-group">
          {Object.entries(groupedSkills).map(([category, items]) => (
            <article key={category} className="card reveal-up">
              <h3>{category}</h3>
              <div className="tag-list">
                {items.map((item) => (
                  <span key={item._id} className="tag">
                    {item.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default AboutPage;
