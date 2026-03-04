import About from '../models/About.js';
import { removeFileIfExists } from '../utils/file.js';
import { parseArrayInput, parseObjectInput } from '../utils/parsers.js';

const ensureAboutDocument = async () => {
  const existing = await About.findOne();

  if (existing) {
    return existing;
  }

  return About.create({});
};

export const getAbout = async (req, res, next) => {
  try {
    const about = await ensureAboutDocument();
    return res.json(about);
  } catch (error) {
    return next(error);
  }
};

export const updateAbout = async (req, res, next) => {
  try {
    const about = await ensureAboutDocument();

    const fields = ['fullName', 'headline', 'shortBio', 'detailedBio'];

    fields.forEach((field) => {
      if (typeof req.body[field] !== 'undefined') {
        about[field] = req.body[field];
      }
    });

    if (typeof req.body.techStack !== 'undefined') {
      about.techStack = parseArrayInput(req.body.techStack);
    }

    if (typeof req.body.socials !== 'undefined') {
      about.socials = {
        ...about.socials,
        ...parseObjectInput(req.body.socials, {})
      };
    }

    if (typeof req.body.contact !== 'undefined') {
      about.contact = {
        ...about.contact,
        ...parseObjectInput(req.body.contact, {})
      };
    }

    if (req.file) {
      removeFileIfExists(about.profileImagePath);
      about.profileImagePath = req.file.path;
      about.profileImageUrl = `/uploads/profile/${req.file.filename}`;
    }

    await about.save();

    return res.json(about);
  } catch (error) {
    return next(error);
  }
};
