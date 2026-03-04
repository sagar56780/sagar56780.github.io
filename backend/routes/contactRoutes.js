import { Router } from 'express';
import { listMessages, submitContact } from '../controllers/contactController.js';
import authenticate from '../middleware/auth.js';

const router = Router();

router.post('/', submitContact);
router.get('/', authenticate, listMessages);

export default router;
