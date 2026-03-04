import Blog from '../models/Blog.js';
import { parseArrayInput } from '../utils/parsers.js';
import { buildSlug } from '../utils/slug.js';

export const listPublishedBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1, createdAt: -1 });
    return res.json(blogs);
  } catch (error) {
    return next(error);
  }
};

export const listAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.json(blogs);
  } catch (error) {
    return next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.json(blog);
  } catch (error) {
    return next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const blog = await Blog.create({
      title,
      slug: buildSlug(title),
      excerpt: excerpt || '',
      content,
      coverImage: coverImage || '',
      tags: parseArrayInput(req.body.tags),
      isPublished:
        typeof req.body.isPublished === 'undefined'
          ? true
          : ['true', '1', 'yes', 'on'].includes(String(req.body.isPublished).toLowerCase()),
      publishedAt: req.body.publishedAt || new Date()
    });

    return res.status(201).json(blog);
  } catch (error) {
    return next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const editable = ['title', 'excerpt', 'content', 'coverImage'];

    editable.forEach((field) => {
      if (typeof req.body[field] !== 'undefined') {
        blog[field] = req.body[field];
      }
    });

    if (typeof req.body.title !== 'undefined') {
      blog.slug = buildSlug(req.body.title);
    }

    if (typeof req.body.tags !== 'undefined') {
      blog.tags = parseArrayInput(req.body.tags);
    }

    if (typeof req.body.isPublished !== 'undefined') {
      blog.isPublished = ['true', '1', 'yes', 'on'].includes(
        String(req.body.isPublished).toLowerCase()
      );
    }

    if (typeof req.body.publishedAt !== 'undefined') {
      blog.publishedAt = req.body.publishedAt;
    }

    await blog.save();

    return res.json(blog);
  } catch (error) {
    return next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await blog.deleteOne();

    return res.json({ message: 'Blog deleted' });
  } catch (error) {
    return next(error);
  }
};
