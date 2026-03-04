import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    excerpt: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    coverImage: {
      type: String,
      default: ''
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
