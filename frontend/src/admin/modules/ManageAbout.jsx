import { useEffect, useState } from 'react';
import { buildAssetUrl } from '../../services/api';
import contentService from '../../services/contentService';

const ManageAbout = () => {
  const [form, setForm] = useState({
    fullName: '',
    headline: '',
    shortBio: '',
    detailedBio: '',
    techStack: '',
    contactEmail: '',
    contactPhone: '',
    contactLocation: '',
    github: '',
    linkedin: '',
    twitter: '',
    instagram: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [saving, setSaving] = useState(false);

  const loadAbout = async () => {
    const data = await contentService.getAbout();

    setForm({
      fullName: data.fullName || '',
      headline: data.headline || '',
      shortBio: data.shortBio || '',
      detailedBio: data.detailedBio || '',
      techStack: data.techStack?.join(', ') || '',
      contactEmail: data.contact?.email || '',
      contactPhone: data.contact?.phone || '',
      contactLocation: data.contact?.location || '',
      github: data.socials?.github || '',
      linkedin: data.socials?.linkedin || '',
      twitter: data.socials?.twitter || '',
      instagram: data.socials?.instagram || ''
    });

    setCurrentImage(data.profileImageUrl || '');
  };

  useEffect(() => {
    loadAbout();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = new FormData();
      payload.append('fullName', form.fullName);
      payload.append('headline', form.headline);
      payload.append('shortBio', form.shortBio);
      payload.append('detailedBio', form.detailedBio);
      payload.append('techStack', form.techStack);
      payload.append(
        'contact',
        JSON.stringify({
          email: form.contactEmail,
          phone: form.contactPhone,
          location: form.contactLocation
        })
      );
      payload.append(
        'socials',
        JSON.stringify({
          github: form.github,
          linkedin: form.linkedin,
          twitter: form.twitter,
          instagram: form.instagram
        })
      );

      if (profileImage) {
        payload.append('profileImage', profileImage);
      }

      await contentService.updateAbout(payload);
      setProfileImage(null);
      await loadAbout();
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h2>Manage About Section</h2>

      <form className="card stack-md reveal-up" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={form.fullName}
          onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Headline"
          value={form.headline}
          onChange={(e) => setForm((prev) => ({ ...prev, headline: e.target.value }))}
        />
        <textarea
          rows="3"
          placeholder="Short bio"
          value={form.shortBio}
          onChange={(e) => setForm((prev) => ({ ...prev, shortBio: e.target.value }))}
        />
        <textarea
          rows="5"
          placeholder="Detailed bio"
          value={form.detailedBio}
          onChange={(e) => setForm((prev) => ({ ...prev, detailedBio: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Tech stack (comma separated)"
          value={form.techStack}
          onChange={(e) => setForm((prev) => ({ ...prev, techStack: e.target.value }))}
        />

        <h3>Contact</h3>
        <input
          type="email"
          placeholder="Email"
          value={form.contactEmail}
          onChange={(e) => setForm((prev) => ({ ...prev, contactEmail: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.contactPhone}
          onChange={(e) => setForm((prev) => ({ ...prev, contactPhone: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Location"
          value={form.contactLocation}
          onChange={(e) => setForm((prev) => ({ ...prev, contactLocation: e.target.value }))}
        />

        <h3>Social Links</h3>
        <input
          type="url"
          placeholder="GitHub URL"
          value={form.github}
          onChange={(e) => setForm((prev) => ({ ...prev, github: e.target.value }))}
        />
        <input
          type="url"
          placeholder="LinkedIn URL"
          value={form.linkedin}
          onChange={(e) => setForm((prev) => ({ ...prev, linkedin: e.target.value }))}
        />
        <input
          type="url"
          placeholder="Twitter URL"
          value={form.twitter}
          onChange={(e) => setForm((prev) => ({ ...prev, twitter: e.target.value }))}
        />
        <input
          type="url"
          placeholder="Instagram URL"
          value={form.instagram}
          onChange={(e) => setForm((prev) => ({ ...prev, instagram: e.target.value }))}
        />

        {currentImage ? (
          <img src={buildAssetUrl(currentImage)} alt="Profile" className="profile-preview" loading="lazy" />
        ) : null}

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
        />

        <button className="btn" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Update About Section'}
        </button>
      </form>
    </section>
  );
};

export default ManageAbout;
