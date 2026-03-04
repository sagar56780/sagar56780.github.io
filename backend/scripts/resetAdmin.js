import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const run = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required in backend/.env');
  }

  await connectDB();

  const hashed = await bcrypt.hash(password, 10);

  const admin = await Admin.findOneAndUpdate(
    { email: email.toLowerCase().trim() },
    {
      email: email.toLowerCase().trim(),
      password: hashed,
      name: 'Sagar Kumar'
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  );

  console.log(`Admin credentials reset for: ${admin.email}`);
  process.exit(0);
};

run().catch((error) => {
  console.error('Failed to reset admin:', error.message);
  process.exit(1);
});
