import Skill from '../models/Skill.js';

const groupSkills = (skills) => {
  return skills.reduce((acc, skill) => {
    const key = skill.category;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(skill);
    return acc;
  }, {});
};

export const listSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, sortOrder: 1, name: 1 });
    return res.json(skills);
  } catch (error) {
    return next(error);
  }
};

export const groupedSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, sortOrder: 1, name: 1 });
    return res.json(groupSkills(skills));
  } catch (error) {
    return next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const { category, name, level, icon } = req.body;

    if (!category || !name) {
      return res.status(400).json({ message: 'Category and name are required' });
    }

    const skill = await Skill.create({
      category,
      name,
      level: Number(level) || 80,
      icon: icon || '',
      sortOrder: Number(req.body.sortOrder) || 0
    });

    return res.status(201).json(skill);
  } catch (error) {
    return next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    const editable = ['category', 'name', 'icon'];

    editable.forEach((field) => {
      if (typeof req.body[field] !== 'undefined') {
        skill[field] = req.body[field];
      }
    });

    if (typeof req.body.level !== 'undefined') {
      skill.level = Number(req.body.level) || 0;
    }

    if (typeof req.body.sortOrder !== 'undefined') {
      skill.sortOrder = Number(req.body.sortOrder) || 0;
    }

    await skill.save();

    return res.json(skill);
  } catch (error) {
    return next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await skill.deleteOne();

    return res.json({ message: 'Skill deleted' });
  } catch (error) {
    return next(error);
  }
};
