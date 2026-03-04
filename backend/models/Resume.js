import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    filePath: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  {
    timestamps: true
  }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
