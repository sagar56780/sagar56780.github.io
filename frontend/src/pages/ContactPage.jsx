import { useEffect, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import usePageMeta from '../hooks/usePageMeta';
import contentService from '../services/contentService';

const FORMRSPREE_ENDPOINT =
  (import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mppzqpnz').trim();

const initialForm = {
  name: '',
  email: '',
  message: ''
};

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [about, setAbout] = useState(null);

  usePageMeta({
    title: 'Contact Sagar Kumar | QA Automation & Full-Stack Developer',
    description:
      'Contact Sagar Kumar, QA Automation Engineer and full-stack developer, about QA automation, REST API testing, CI/CD, or full-stack development opportunities.',
    path: '/contact'
  });

  useEffect(() => {
    const load = async () => {
      const data = await contentService.getAbout();
      setAbout(data);
    };

    load();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      const res = await fetch(FORMRSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New portfolio message from ${form.name}`
        })
      });

      if (!res.ok) {
        throw new Error(`Formspree responded ${res.status}`);
      }

      setStatus('Message sent successfully.');
      setForm(initialForm);
    } catch {
      setStatus('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <SectionHeader title="Contact" subtitle="Send a message and I will get back to you." />

      <div className="contact-grid stagger-group">
        <form className="card reveal-up" onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="6"
            required
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          />

          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>

          {status ? <p className="subtle">{status}</p> : null}
        </form>

        <article className="card reveal-up">
          <h3>Connect</h3>
          <p className="subtle">Reach out through email or social platforms.</p>

          <div className="stack-sm">
            {about?.contact?.email ? <p>Email: {about.contact.email}</p> : null}
            {about?.contact?.phone ? <p>Phone: {about.contact.phone}</p> : null}
            {about?.contact?.location ? <p>Location: {about.contact.location}</p> : null}
          </div>

          <div className="stack-sm">
            {about?.socials?.github ? (
              <a href={about.socials.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
            {about?.socials?.linkedin ? (
              <a href={about.socials.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : null}
            {about?.socials?.twitter ? (
              <a href={about.socials.twitter} target="_blank" rel="noreferrer">
                Twitter
              </a>
            ) : null}
            {about?.socials?.instagram ? (
              <a href={about.socials.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
};

export default ContactPage;
