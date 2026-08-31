import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import SectionHeader from '../components/SectionHeader';
import usePageMeta from '../hooks/usePageMeta';
import contentService from '../services/contentService';

const SkillsPage = () => {
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: 'Skills | Sagar Kumar',
    description: 'Skills grouped by categories across frontend, backend, databases, and tools.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await contentService.getGroupedSkills();
        setGrouped(data);
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
        title="Skills"
        subtitle="Grouped by engineering discipline — testing, automation, CI/CD, and full-stack."
        />
      <p className="subtle skills-note reveal-up">
        Proficiency levels reflect hands-on experience across QA automation, API testing, CI/CD, and full-stack development.
      </p>

      <div className="grid cards-2 stagger-group">
        {Object.entries(grouped).map(([category, skills]) => (
          <article key={category} className="card reveal-up">
            <h3>{category}</h3>
            <div className="skill-list">
              {skills.map((skill) => (
                <div key={skill._id} className="skill-item">
                  <div className="section-row between">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="progress-track">
                    <span className="progress-fill" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SkillsPage;
