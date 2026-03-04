import { Router } from 'express';
import {
  createSkill,
  deleteSkill,
  groupedSkills,
  listSkills,
  updateSkill
} from '../controllers/skillController.js';
import authenticate from '../middleware/auth.js';

const router = Router();

router.get('/', listSkills);
router.get('/grouped', groupedSkills);
router.post('/', authenticate, createSkill);
router.put('/:id', authenticate, updateSkill);
router.delete('/:id', authenticate, deleteSkill);

export default router;
