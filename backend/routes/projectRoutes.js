import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getProjectById,
  listProjects,
  updateProject
} from '../controllers/projectController.js';
import authenticate from '../middleware/auth.js';
import { projectImageUpload } from '../middleware/upload.js';

const router = Router();

router.get('/', listProjects);
router.get('/:id', getProjectById);
router.post('/', authenticate, projectImageUpload.single('image'), createProject);
router.put('/:id', authenticate, projectImageUpload.single('image'), updateProject);
router.delete('/:id', authenticate, deleteProject);

export default router;
