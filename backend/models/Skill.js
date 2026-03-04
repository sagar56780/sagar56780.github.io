import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: Number,
      default: 80,
      min: 0,
      max: 100
    },
    icon: {
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

skillSchema.index({ category: 1, name: 1 }, { unique: true });

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
