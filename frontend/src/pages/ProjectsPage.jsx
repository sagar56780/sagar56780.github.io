import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import usePageMeta from '../hooks/usePageMeta';
import contentService from '../services/contentService';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: 'Projects | Sagar Kumar',
    description: 'Explore software projects by Sagar Kumar with technology stack, GitHub links, and live demos.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await contentService.getProjects();
        setProjects(data);
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
        title="Projects"
        subtitle="A collection of practical builds with code and live previews."
      />

      <div className="grid cards-3 stagger-group">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
