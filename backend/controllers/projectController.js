import Project from '../models/Project.js';
import { removeFileIfExists } from '../utils/file.js';
import { parseArrayInput } from '../utils/parsers.js';

const toBoolean = (value) => {
  if (typeof value === 'boolean') {
    return value;
  }

  return ['true', '1', 'yes', 'on'].includes(String(value).toLowerCase());
};

export const listProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ sortOrder: 1, createdAt: -1 });
    return res.json(projects);
  } catch (error) {
    return next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json(project);
  } catch (error) {
    return next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { title, description, githubUrl, liveUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const project = new Project({
      title,
      description,
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      technologies: parseArrayInput(req.body.technologies),
      featured: toBoolean(req.body.featured),
      sortOrder: Number(req.body.sortOrder) || 0
    });

    if (req.file) {
      project.imagePath = req.file.path;
      project.imageUrl = `/uploads/projects/${req.file.filename}`;
    }

    await project.save();

    return res.status(201).json(project);
  } catch (error) {
    return next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const editable = ['title', 'description', 'githubUrl', 'liveUrl'];

    editable.forEach((field) => {
      if (typeof req.body[field] !== 'undefined') {
        project[field] = req.body[field];
      }
    });

    if (typeof req.body.technologies !== 'undefined') {
      project.technologies = parseArrayInput(req.body.technologies);
    }

    if (typeof req.body.featured !== 'undefined') {
      project.featured = toBoolean(req.body.featured);
    }

    if (typeof req.body.sortOrder !== 'undefined') {
      project.sortOrder = Number(req.body.sortOrder) || 0;
    }

    if (req.file) {
      removeFileIfExists(project.imagePath);
      project.imagePath = req.file.path;
      project.imageUrl = `/uploads/projects/${req.file.filename}`;
    }

    await project.save();

    return res.json(project);
  } catch (error) {
    return next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    removeFileIfExists(project.imagePath);
    await project.deleteOne();

    return res.json({ message: 'Project deleted' });
  } catch (error) {
    return next(error);
  }
};
