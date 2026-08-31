import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import SectionHeader from '../components/SectionHeader';
import usePageMeta from '../hooks/usePageMeta';
import contentService from '../services/contentService';

const ExperiencePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: 'Experience | Sagar Kumar',
    description: 'Professional experience, roles, and achievements of Sagar Kumar.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await contentService.getExperience();
        setItems(data);
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
        title="Experience"
        subtitle="Roles spanning QA automation, API testing, and full-stack development."
      />

      <div className="timeline stagger-group">
        {items.map((item) => (
          <article key={item._id} className="card timeline-item reveal-up">
            <div className="section-row between">
              <h3>{item.role}</h3>
              <span className="tag">{item.duration}</span>
            </div>
            <p className="subtle">
              {item.company} {item.location ? `• ${item.location}` : ''}
            </p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExperiencePage;
