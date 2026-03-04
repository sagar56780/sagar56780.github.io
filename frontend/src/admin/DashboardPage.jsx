import { useEffect, useState } from 'react';
import contentService from '../services/contentService';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    skills: 0,
    blogs: 0,
    messages: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [projects, experience, skills, blogs, messages] = await Promise.all([
          contentService.getProjects(),
          contentService.getExperience(),
          contentService.getSkills(),
          contentService.getAdminBlogs(),
          contentService.getContactMessages()
        ]);

        setStats({
          projects: projects.length,
          experience: experience.length,
          skills: skills.length,
          blogs: blogs.length,
          messages: messages.length
        });
      } catch {
        setStats({
          projects: 0,
          experience: 0,
          skills: 0,
          blogs: 0,
          messages: 0
        });
      }
    };

    loadStats();
  }, []);

  return (
    <section>
      <h2>Overview</h2>
      <p className="subtle">Manage portfolio content dynamically (stored in this browser in static mode).</p>

      <div className="grid cards-3 stagger-group">
        <article className="card stat-card reveal-up">
          <p className="eyebrow">Projects</p>
          <h3>{stats.projects}</h3>
        </article>
        <article className="card stat-card reveal-up">
          <p className="eyebrow">Experience</p>
          <h3>{stats.experience}</h3>
        </article>
        <article className="card stat-card reveal-up">
          <p className="eyebrow">Skills</p>
          <h3>{stats.skills}</h3>
        </article>
        <article className="card stat-card reveal-up">
          <p className="eyebrow">Blog Posts</p>
          <h3>{stats.blogs}</h3>
        </article>
        <article className="card stat-card reveal-up">
          <p className="eyebrow">Contact Messages</p>
          <h3>{stats.messages}</h3>
        </article>
      </div>
    </section>
  );
};

export default DashboardPage;
