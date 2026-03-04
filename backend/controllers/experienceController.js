import Experience from '../models/Experience.js';

export const listExperience = async (req, res, next) => {
  try {
    const experience = await Experience.find().sort({ sortOrder: 1, createdAt: -1 });
    return res.json(experience);
  } catch (error) {
    return next(error);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const { company, role, duration, description, location } = req.body;

    if (!company || !role || !duration || !description) {
      return res.status(400).json({
        message: 'Company, role, duration and description are required'
      });
    }

    const item = await Experience.create({
      company,
      role,
      duration,
      description,
      location: location || '',
      sortOrder: Number(req.body.sortOrder) || 0
    });

    return res.status(201).json(item);
  } catch (error) {
    return next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const item = await Experience.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const editable = ['company', 'role', 'duration', 'description', 'location'];

    editable.forEach((field) => {
      if (typeof req.body[field] !== 'undefined') {
        item[field] = req.body[field];
      }
    });

    if (typeof req.body.sortOrder !== 'undefined') {
      item.sortOrder = Number(req.body.sortOrder) || 0;
    }

    await item.save();

    return res.json(item);
  } catch (error) {
    return next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const item = await Experience.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    await item.deleteOne();

    return res.json({ message: 'Experience deleted' });
  } catch (error) {
    return next(error);
  }
};
