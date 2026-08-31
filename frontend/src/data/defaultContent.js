export const DEFAULT_ABOUT = {
  _id: 'about-1',
  fullName: 'Sagar Kumar',
  headline: 'Full-Stack & QA Automation Engineer',
  shortBio:
    'QA Automation Engineer crafting reliable test suites and full-stack web apps — Playwright, React, Spring Boot, CI/CD on GitHub Actions, REST API testing with Postman.',
  detailedBio:
    'I am a QA Automation Engineer with ~2 years of experience in manual and automation testing at Webkul, working on open-source products like Krayin CRM and Bagisto. I build Playwright E2E suites (Page Object Model), test REST APIs with Postman and PHPUnit, and drive CI/CD with GitHub Actions and Docker. Alongside testing, I build full-stack applications with React, Spring Boot, and relational databases, giving me a well-rounded view of the entire SDLC.',
  techStack: [
    'Playwright',
    'JavaScript',
    'TypeScript',
    'Java',
    'React',
    'Spring Boot',
    'Postman',
    'PHPUnit',
    'GitHub Actions',
    'Docker',
    'SQL',
    'Git'
  ],
  profileImageUrl: '/profile.jpg',
  profileImagePath: '',
  socials: {
    github: 'https://github.com/sagarkumar446',
    linkedin: 'https://www.linkedin.com/in/sagar-kumar-java-developer',
    twitter: 'https://x.com/sagat56780',
    instagram: 'https://www.instagram.com/saga2832/'
  },
  contact: {
    email: 'sagarkumar020599@gmail.com',
    phone: '+91 8430296626',
    location: 'Noida, UP, India'
  },
  createdAt: '2026-03-04T00:00:00.000Z',
  updatedAt: '2026-03-04T00:00:00.000Z'
};

export const DEFAULT_PROJECTS = [
  {
    _id: 'project-1',
    title: 'Krayin CRM — Open Source QA Contributions',
    description:
      'Contributed 24+ pull requests to the Krayin CRM repository (krayin/laravel-crm, 23.7k+ stars) — Playwright E2E specs, PHPUnit tests, and release changelogs; earned Collaborator badge.',
    role: 'QA Automation Engineer',
    year: '2025',
    status: 'Open Source',
    highlights: [
      'Playwright E2E automation across admin modules: leads, contacts, quotes, mail, products, automation, webhooks, campaigns.',
      'PHPUnit language-file validation test and REST API unit/feature/integration tests.',
      'Updated GitHub Actions Playwright workflow and added DB-prefix support for parallel CI runs.'
    ],
    technologies: [
      { name: 'Playwright', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' }
    ],
    links: [
      { label: 'Repository', url: 'https://github.com/krayin/laravel-crm' },
      { label: 'Contributions', url: 'https://github.com/sagarkumar446' }
    ],
    images: [],
    imageUrl: '',
    githubUrl: 'https://github.com/krayin/laravel-crm',
    liveUrl: '',
    imagePath: '',
    featured: true,
    sortOrder: 1,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  },
  {
    _id: 'project-2',
    title: 'Krayin REST API — Test Cases',
    description:
      'Wrote PHPUnit unit, feature, and integration test cases for the Krayin REST API package — auth, leads, pipelines, activities, contacts, and Swagger documentation endpoints.',
    role: 'API Testing',
    year: '2025',
    status: 'Testing',
    highlights: [
      'Validated request/response schemas, status codes, authentication (Sanctum), and data integrity.',
      'Covered API endpoints for leads, pipelines, activities, and contacts.',
      'Auth-focused testing with Laravel Sanctum.'
    ],
    technologies: [
      { name: 'PHPUnit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg' }
    ],
    links: [
      { label: 'Test Cases Repo', url: 'https://github.com/sagarkumar446/krayin-rest-api-test-cases' }
    ],
    images: [],
    imageUrl: '',
    githubUrl: 'https://github.com/sagarkumar446/krayin-rest-api-test-cases',
    liveUrl: '',
    imagePath: '',
    featured: true,
    sortOrder: 2,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  },
  {
    _id: 'project-3',
    title: 'Restaurant Management System',
    description:
      'Full-stack restaurant management platform with backend REST API and a React frontend. Auth, orders, reservations, menu, and loyalty modules.',
    role: 'Full-Stack Developer',
    year: '2024',
    status: 'Full-Stack',
    highlights: [
      'Backend: Spring Boot 3.3.2, Java 17, JPA/Hibernate, MySQL — 24 REST endpoints with validation and pagination.',
      'Frontend: React 18, Redux Toolkit, MUI, Tailwind CSS — OTP authentication (email) and Razorpay payment integration.',
      'Tested APIs (Postman/cURL), database operations, and end-to-end UI workflows.'
    ],
    technologies: [
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
    ],
    links: [
      { label: 'Backend', url: 'https://github.com/sagarkumar446/restorent_management_system' },
      { label: 'Frontend', url: 'https://github.com/sagarkumar446/restorent_management_front_end' }
    ],
    images: [],
    imageUrl: '',
    githubUrl: 'https://github.com/sagarkumar446/restorent_management_system',
    liveUrl: '',
    imagePath: '',
    featured: false,
    sortOrder: 3,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  },
  {
    _id: 'project-4',
    title: 'This Portfolio — Dynamic GitHub Pages',
    description:
      'A modern React + Vite portfolio with an admin dashboard (localStorage-backed), theme toggle, and CI/CD deployment to GitHub Pages via GitHub Actions.',
    role: 'Frontend + CI/CD',
    year: '2026',
    status: 'Live',
    highlights: [
      'Static GitHub Pages architecture with GitHub Actions deploy workflow.',
      'Admin panel to manage projects, experience, skills, resume, and blog.',
      'Animated interface with dark/light theming and responsive layout.'
    ],
    technologies: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
      { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' }
    ],
    links: [
      { label: 'Source Code', url: 'https://github.com/sagarkumar446/sagarkumar446.github.io' },
      { label: 'Live Site', url: 'https://sagarkumar446.github.io/' }
    ],
    images: [],
    imageUrl: '',
    githubUrl: 'https://github.com/sagarkumar446/sagarkumar446.github.io',
    liveUrl: 'https://sagarkumar446.github.io/',
    imagePath: '',
    featured: false,
    sortOrder: 4,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  }
];

export const DEFAULT_EXPERIENCE = [
  {
    _id: 'experience-1',
    company: 'Webkul Software Pvt. Ltd.',
    role: 'Associate Quality Analyst → QA Automation Engineer',
    duration: 'Jan 2025 – Present',
    description:
      'Manual and automation testing for Krayin CRM and Bagisto. Wrote 18+ Playwright E2E scripts (Page Object Model), contributed 24+ PRs to Krayin CRM open source, performed REST API testing with Postman and PHPUnit, worked on GitHub Actions CI/CD and Docker demo environments, in an Agile/Scrum workflow.',
    location: 'Noida, UP',
    sortOrder: 1,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  },
  {
    _id: 'experience-2',
    company: 'Trayistats AI Technologies',
    role: 'Software Developer (Intern)',
    duration: 'Aug 2024 – Nov 2024',
    description:
      'Developed and maintained web features using JavaScript, HTML, CSS, and backend services; wrote and tested APIs and database operations.',
    location: 'Noida, UP',
    sortOrder: 2,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  },
  {
    _id: 'experience-3',
    company: 'QSpiders Software Testing Training Institute',
    role: 'Full-Stack Developer (Intern)',
    duration: 'Jul 2023 – Aug 2024',
    description:
      'Built full-stack applications with Java, Spring Boot, PostgreSQL, and front-end technologies; gained a strong foundation in SDLC/STLC and testing practices.',
    location: 'Delhi',
    sortOrder: 3,
    createdAt: '2026-03-04T00:00:00.000Z',
    updatedAt: '2026-03-04T00:00:00.000Z'
  }
];

export const DEFAULT_SKILLS = [
  { _id: 'skill-1', category: 'Testing', name: 'Functional', level: 95, icon: '', sortOrder: 1 },
  { _id: 'skill-2', category: 'Testing', name: 'Regression', level: 92, icon: '', sortOrder: 2 },
  { _id: 'skill-3', category: 'Testing', name: 'UI / E2E', level: 90, icon: '', sortOrder: 3 },
  { _id: 'skill-4', category: 'Testing', name: 'API Testing', level: 93, icon: '', sortOrder: 4 },
  { _id: 'skill-5', category: 'Testing', name: 'Test Case Design', level: 94, icon: '', sortOrder: 5 },
  { _id: 'skill-6', category: 'Testing', name: 'Smoke / Sanity', level: 90, icon: '', sortOrder: 6 },
  { _id: 'skill-7', category: 'Automation', name: 'Playwright (POM)', level: 88, icon: '', sortOrder: 1 },
  { _id: 'skill-8', category: 'Automation', name: 'Selenium', level: 72, icon: '', sortOrder: 2 },
  { _id: 'skill-9', category: 'Automation', name: 'PHPUnit', level: 80, icon: '', sortOrder: 3 },
  { _id: 'skill-10', category: 'API Tools', name: 'Postman', level: 90, icon: '', sortOrder: 1 },
  { _id: 'skill-11', category: 'API Tools', name: 'Swagger', level: 82, icon: '', sortOrder: 2 },
  { _id: 'skill-12', category: 'API Tools', name: 'REST / HTTP', level: 92, icon: '', sortOrder: 3 },
  { _id: 'skill-13', category: 'CI/CD & DevOps', name: 'GitHub Actions', level: 84, icon: '', sortOrder: 1 },
  { _id: 'skill-14', category: 'CI/CD & DevOps', name: 'Docker', level: 80, icon: '', sortOrder: 2 },
  { _id: 'skill-15', category: 'CI/CD & DevOps', name: 'Git', level: 90, icon: '', sortOrder: 3 },
  { _id: 'skill-16', category: 'Languages', name: 'Java', level: 85, icon: '', sortOrder: 1 },
  { _id: 'skill-17', category: 'Languages', name: 'JavaScript', level: 85, icon: '', sortOrder: 2 },
  { _id: 'skill-18', category: 'Languages', name: 'TypeScript', level: 78, icon: '', sortOrder: 3 },
  { _id: 'skill-19', category: 'Languages', name: 'SQL', level: 88, icon: '', sortOrder: 4 },
  { _id: 'skill-20', category: 'Backend', name: 'Spring Boot', level: 78, icon: '', sortOrder: 1 },
  { _id: 'skill-21', category: 'Backend', name: 'Laravel', level: 72, icon: '', sortOrder: 2 },
  { _id: 'skill-22', category: 'Frontend', name: 'React', level: 85, icon: '', sortOrder: 1 },
  { _id: 'skill-23', category: 'Frontend', name: 'Redux Toolkit', level: 80, icon: '', sortOrder: 2 },
  { _id: 'skill-24', category: 'Frontend', name: 'Tailwind CSS', level: 84, icon: '', sortOrder: 3 },
  { _id: 'skill-25', category: 'Databases', name: 'MySQL', level: 86, icon: '', sortOrder: 1 },
  { _id: 'skill-26', category: 'Databases', name: 'PostgreSQL', level: 80, icon: '', sortOrder: 2 },
  { _id: 'skill-27', category: 'Concepts', name: 'SDLC', level: 95, icon: '', sortOrder: 1 },
  { _id: 'skill-28', category: 'Concepts', name: 'STLC', level: 95, icon: '', sortOrder: 2 },
  { _id: 'skill-29', category: 'Concepts', name: 'Agile / Scrum', level: 88, icon: '', sortOrder: 3 },
  { _id: 'skill-30', category: 'Concepts', name: 'Bug Lifecycle', level: 90, icon: '', sortOrder: 4 },
  { _id: 'skill-31', category: 'Concepts', name: 'Page Object Model', level: 88, icon: '', sortOrder: 5 }
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
  },
  {
    _id: 'blog-2',
    title: 'End-to-End Testing With Playwright: What I Learned',
    slug: 'e2e-testing-with-playwright',
    excerpt:
      'Lessons from building 18+ Playwright E2E suites with the Page Object Model across enterprise admin modules.',
    content:
      'Writing reliable end-to-end tests with Playwright and the Page Object Model across enterprise admin modules. Includes tips on selectors, fixtures, retries, and CI integration with GitHub Actions.',
    tags: ['playwright', 'testing', 'e2e'],
    coverImage: '',
    isPublished: true,
    publishedAt: '2026-03-10T00:00:00.000Z',
    createdAt: '2026-03-10T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    _id: 'blog-3',
    title: 'REST API Testing With Postman and PHPUnit',
    slug: 'rest-api-testing-postman-phpunit',
    excerpt:
      'How I test REST APIs using Postman collections and PHPUnit, covering auth, schemas, and status codes.',
    content:
      'A guide to REST API testing using Postman collections and PHPUnit tests, covering authentication (Sanctum), request/response schemas, status codes, and data integrity.',
    tags: ['api', 'testing', 'phpunit'],
    coverImage: '',
    isPublished: true,
    publishedAt: '2026-03-15T00:00:00.000Z',
    createdAt: '2026-03-15T00:00:00.000Z',
    updatedAt: '2026-03-15T00:00:00.000Z'
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

export const SDLC_PIPELINE = [
  {
    id: 'requirements',
    phase: 'Requirements',
    icon: '📋',
    detail: 'Understand product scope, acceptance criteria, and user stories in Agile.',
    tools: ['Jira', 'Scrum', 'User Stories']
  },
  {
    id: 'design',
    phase: 'Design',
    icon: '🎨',
    detail: 'Architecture, API contracts, and test strategy before code is written.',
    tools: ['Swagger', 'Figma', 'Test Plans']
  },
  {
    id: 'development',
    phase: 'Development',
    icon: '💻',
    detail: 'Build features across the stack: React frontend, Spring Boot / Laravel backend.',
    tools: ['Java', 'React', 'Spring Boot', 'Laravel']
  },
  {
    id: 'testing',
    phase: 'Testing',
    icon: '🧪',
    detail: 'Automate E2E, API, and unit tests; design test cases and bug reports.',
    tools: ['Playwright', 'Postman', 'PHPUnit', 'Selenium']
  },
  {
    id: 'deployment',
    phase: 'Deployment',
    icon: '🚀',
    detail: 'Ship via CI/CD pipelines and containerized environments.',
    tools: ['GitHub Actions', 'Docker', 'Git']
  },
  {
    id: 'maintenance',
    phase: 'Maintenance',
    icon: '🛠️',
    detail: 'Monitor, regress, and release iteratively with quality gates.',
    tools: ['Regression', 'CI', 'Release']
  }
];

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
