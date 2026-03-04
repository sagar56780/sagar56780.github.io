import Resume from '../models/Resume.js';
import { removeFileIfExists } from '../utils/file.js';

const getActiveResumeDocument = async () => {
  return Resume.findOne({ isActive: true }).sort({ createdAt: -1 });
};

export const getActiveResume = async (req, res, next) => {
  try {
    const resume = await getActiveResumeDocument();

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    return res.json(resume);
  } catch (error) {
    return next(error);
  }
};

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const previousResumes = await Resume.find({ isActive: true });

    previousResumes.forEach((item) => removeFileIfExists(item.filePath));

    await Resume.updateMany({}, { isActive: false });

    const newResume = await Resume.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      filePath: req.file.path,
      fileUrl: `/uploads/resume/${req.file.filename}`,
      isActive: true,
      uploadedBy: req.user?.id
    });

    return res.status(201).json(newResume);
  } catch (error) {
    return next(error);
  }
};

export const downloadActiveResume = async (req, res, next) => {
  try {
    const resume = await getActiveResumeDocument();

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    return res.download(resume.filePath, resume.originalName);
  } catch (error) {
    return next(error);
  }
};
