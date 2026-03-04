import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import authenticate from '../middleware/auth.js';
import { profileImageUpload } from '../middleware/upload.js';

const router = Router();

router.get('/', getAbout);
router.put('/', authenticate, profileImageUpload.single('profileImage'), updateAbout);

export default router;
