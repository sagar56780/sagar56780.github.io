import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      default: ''
    },
    sortOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
