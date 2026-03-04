import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, '..');
const uploadRoot = path.join(backendRoot, 'uploads');

const ensureDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const makeStorage = (subFolder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const destination = path.join(uploadRoot, subFolder);
      ensureDirectory(destination);
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const safeBase = file.originalname
        .replace(ext, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');

      cb(null, `${Date.now()}-${safeBase}${ext}`);
    }
  });
};

const makeFilter = (allowedMimeTypes, allowedExtensions) => {
  return (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const isAllowedMime = allowedMimeTypes.includes(file.mimetype);
    const isAllowedExt = allowedExtensions.includes(ext);

    if (!isAllowedMime || !isAllowedExt) {
      return cb(new Error('Invalid file type'));
    }

    return cb(null, true);
  };
};

const createUploader = ({ folder, mimeTypes, extensions }) => {
  return multer({
    storage: makeStorage(folder),
    fileFilter: makeFilter(mimeTypes, extensions),
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  });
};

export const projectImageUpload = createUploader({
  folder: 'projects',
  mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  extensions: ['.jpg', '.jpeg', '.png', '.webp']
});

export const profileImageUpload = createUploader({
  folder: 'profile',
  mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  extensions: ['.jpg', '.jpeg', '.png', '.webp']
});

export const resumeUpload = createUploader({
  folder: 'resume',
  mimeTypes: [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  extensions: ['.pdf', '.docx']
});
