import { Router } from 'express';
import { getCurrentAdmin, loginAdmin } from '../controllers/authController.js';
import authenticate from '../middleware/auth.js';

const router = Router();

router.post('/login', loginAdmin);
router.get('/me', authenticate, getCurrentAdmin);

export default router;
