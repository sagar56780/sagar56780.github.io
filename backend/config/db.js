import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing in environment variables');
  }

  if (mongoUri.includes('<db_password>') || mongoUri.includes('db_password')) {
    throw new Error(
      'MONGODB_URI contains a placeholder password. Replace it with your real MongoDB Atlas user password.'
    );
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB || undefined
    });
  } catch (error) {
    if (error?.message?.includes('bad auth')) {
      throw new Error(
        'MongoDB authentication failed. Check Atlas username/password in MONGODB_URI and URL-encode special characters in the password.'
      );
    }

    if (error?.message?.includes('querySrv ECONNREFUSED')) {
      throw new Error(
        'MongoDB DNS lookup failed from this environment. Verify network access and Atlas SRV hostname.'
      );
    }

    throw error;
  }

  console.log('MongoDB connected');
};

export default connectDB;
