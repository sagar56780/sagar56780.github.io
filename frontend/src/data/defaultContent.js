export const DEFAULT_ABOUT = {
  _id: 'about-1',
  fullName: 'Sagar Kumar',
  headline: 'Full Stack Developer',
  shortBio:
    'I build clean, performant web applications focused on real-world outcomes and maintainable code.',
  detailedBio:
    'I am a developer who enjoys solving practical engineering problems, shipping polished UI, and building end-to-end web products with modern JavaScript stacks.',
  techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Git'],
  profileImageUrl: '/og-image.jpg',
  profileImagePath: '',
  socials: {
    github: 'https://github.com/sagarkumar446',
    linkedin: '',
    twitter: '',
    instagram: ''
  },
  contact: {
    email: 'admin@sagarkumar.dev',
    phone: '',
    location: 'India'
  },
  createdAt: '2026-03-04T00:00:00.000Z',
  updatedAt: '2026-03-04T00:00:00.000Z'
};

export const DEFAULT_PROJECTS = [
  {
    _id: 'project-1',
    title: 'Developer Portfolio',
    description:
      'A modern responsive portfolio with an admin dashboard to manage projects, skills, experience, blogs, and resume data.',
    role: 'Frontend + UI Architecture',
    year: '2026',
    status: 'Live',
    highlights: [
      'Static GitHub Pages architecture with admin-powered local content updates.',
      'Modern animated interface with responsive layout and theme toggling.',
      'Project cards with media gallery, technology icons, and structured link groups.'
    ],
    technologies: [
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
      },
      {
        name: 'Vite',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg'
      },
      {
        name: 'CSS3',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
      }
    ],
    links: [
      { label: 'Source Code', url: 'https://github.com/sagarkumar446/sagarkumar446.github.io' },
      { label: 'Live Site', url: 'https://sagarkumar446.github.io/' }
    ],
    images: ['/og-image.jpg'],
    imageUrl: '/og-image.jpg',
    githubUrl: 'https://github.com/sagarkumar446/sagarkumar446.github.io',
    liveUrl: 'https://sagarkumar446.github.io/',
    imagePath: '',
    featured: true,
    sortOrder: 1,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  }
];

export const DEFAULT_EXPERIENCE = [
  {
    _id: 'experience-1',
    company: 'Freelance / Personal Projects',
    role: 'Full Stack Developer',
    duration: '2024 - Present',
    description:
      'Designing and building full-stack web applications with focus on performance, clean UI, and practical delivery.',
    location: 'Remote',
    sortOrder: 1,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  }
];

export const DEFAULT_SKILLS = [
  {
    _id: 'skill-1',
    category: 'Frontend',
    name: 'React',
    level: 90,
    icon: '',
    sortOrder: 1,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  },
  {
    _id: 'skill-2',
    category: 'Backend',
    name: 'Node.js',
    level: 88,
    icon: '',
    sortOrder: 1,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  },
  {
    _id: 'skill-3',
    category: 'Database',
    name: 'MongoDB',
    level: 84,
    icon: '',
    sortOrder: 1,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  }
];

export const DEFAULT_BLOGS = [
  {
    _id: 'blog-1',
    title: 'Building A Portfolio That Is Easy To Update',
    slug: 'building-a-portfolio-that-is-easy-to-update',
    excerpt:
      'A practical approach to managing portfolio content dynamically and keeping the frontend performant.',
    content:
      'This portfolio runs fully on GitHub Pages in static mode. Content updates are stored in browser localStorage through the admin panel.',
    tags: ['portfolio', 'react', 'frontend'],
    coverImage: '',
    isPublished: true,
    publishedAt: '2026-03-04T00:00:00.000Z',
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  }
];

export const DEFAULT_RESUME = {
  _id: 'resume-1',
  filename: 'resume.pdf',
  originalName: 'Sagar-Kumar-Resume.pdf',
  mimeType: 'application/pdf',
  size: 0,
  filePath: '',
  fileUrl: '/resume.pdf',
  isActive: true,
  createdAt: '2026-03-04T00:00:00.000Z',
  updatedAt: '2026-03-04T00:00:00.000Z'
};

export const buildDefaultContentState = () => {
  return {
    about: DEFAULT_ABOUT,
    projects: DEFAULT_PROJECTS,
    experience: DEFAULT_EXPERIENCE,
    skills: DEFAULT_SKILLS,
    blogs: DEFAULT_BLOGS,
    resume: DEFAULT_RESUME
  };
};
