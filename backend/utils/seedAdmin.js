import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

const seedDefaultAdmin = async () => {
  const adminCount = await Admin.countDocuments();

  if (adminCount > 0) {
    return;
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn('No admin exists and ADMIN_EMAIL / ADMIN_PASSWORD is missing.');
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  await Admin.create({
    email: email.toLowerCase(),
    password: hashed,
    name: 'Sagar Kumar'
  });

  console.log(`Seeded default admin account: ${email}`);
};

export default seedDefaultAdmin;
