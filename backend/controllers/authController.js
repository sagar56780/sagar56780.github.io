import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const createToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      role: 'admin'
    },
    process.env.JWT_SECRET || 'dev-secret',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(admin);

    return res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    return next(error);
  }
};

export const getCurrentAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    return res.json(admin);
  } catch (error) {
    return next(error);
  }
};
