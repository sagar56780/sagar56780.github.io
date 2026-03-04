import { Router } from 'express';
import {
  downloadActiveResume,
  getActiveResume,
  uploadResume
} from '../controllers/resumeController.js';
import authenticate from '../middleware/auth.js';
import { resumeUpload } from '../middleware/upload.js';

const router = Router();

router.get('/', getActiveResume);
router.get('/download', downloadActiveResume);
router.post('/upload', authenticate, resumeUpload.single('resume'), uploadResume);

export default router;
