import { Router } from 'express';
import {
  createExperience,
  deleteExperience,
  listExperience,
  updateExperience
} from '../controllers/experienceController.js';
import authenticate from '../middleware/auth.js';

const router = Router();

router.get('/', listExperience);
router.post('/', authenticate, createExperience);
router.put('/:id', authenticate, updateExperience);
router.delete('/:id', authenticate, deleteExperience);

export default router;
