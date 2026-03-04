import { useEffect, useState } from 'react';
import contentService from '../../services/contentService';

const ManageResume = () => {
  const [resume, setResume] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const loadResume = async () => {
    try {
      const data = await contentService.getResume();
      setResume(data);
    } catch {
      setResume(null);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const onUpload = async (event) => {
    event.preventDefault();

    if (!resumeFile) {
      setStatus('Select a PDF or DOCX file to upload.');
      return;
    }

    setUploading(true);
    setStatus('');

    try {
      const payload = new FormData();
      payload.append('resume', resumeFile);
      await contentService.uploadResume(payload);
      setStatus('Resume uploaded successfully.');
      setResumeFile(null);
      await loadResume();
    } catch {
      setStatus('Upload failed. Allowed formats: PDF and DOCX.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section>
      <h2>Resume Management</h2>
      <p className="subtle">
        Upload or replace your current resume file. In static mode this is saved in this browser.
      </p>

      <form className="card stack-md reveal-up" onSubmit={onUpload}>
        <input
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
        />
        <button type="submit" className="btn" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Resume'}
        </button>
        {status ? <p className="subtle">{status}</p> : null}
      </form>

      {resume ? (
        <article className="card mt-lg reveal-up">
          <h3>Current Resume</h3>
          <p>Name: {resume.originalName}</p>
          <p>Uploaded: {new Date(resume.createdAt).toLocaleString()}</p>
          <a href={contentService.getResumeDownloadUrl()} target="_blank" rel="noreferrer" className="btn tiny secondary">
            Download Current Resume
          </a>
        </article>
      ) : null}
    </section>
  );
};

export default ManageResume;
