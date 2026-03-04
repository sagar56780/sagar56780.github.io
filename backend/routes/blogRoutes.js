import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getBlogBySlug,
  listAllBlogs,
  listPublishedBlogs,
  updateBlog
} from '../controllers/blogController.js';
import authenticate from '../middleware/auth.js';

const router = Router();

router.get('/', listPublishedBlogs);
router.get('/admin/all', authenticate, listAllBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', authenticate, createBlog);
router.put('/:id', authenticate, updateBlog);
router.delete('/:id', authenticate, deleteBlog);

export default router;
