import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: 'Sagar Kumar'
    },
    headline: {
      type: String,
      default: 'Full Stack Developer'
    },
    shortBio: {
      type: String,
      default:
        'I build clean, performant web applications with a strong focus on user experience and maintainable architecture.'
    },
    detailedBio: {
      type: String,
      default:
        'I am a developer who enjoys shipping practical products, learning modern technologies, and solving real-world engineering problems.'
    },
    techStack: {
      type: [String],
      default: ['React', 'Node.js', 'Express', 'MongoDB']
    },
    profileImageUrl: {
      type: String,
      default: ''
    },
    profileImagePath: {
      type: String,
      default: ''
    },
    socials: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' }
    },
    contact: {
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' }
    }
  },
  {
    timestamps: true
  }
);

const About = mongoose.model('About', aboutSchema);

export default About;
