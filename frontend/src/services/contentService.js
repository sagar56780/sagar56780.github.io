import { buildDefaultContentState } from '../data/defaultContent';

const STORAGE_KEY = 'portfolio_static_content_v1';
const MESSAGES_KEY = 'portfolio_static_messages_v1';

const nowIso = () => new Date().toISOString();

const clone = (value) => {
  return JSON.parse(JSON.stringify(value));
};

const makeId = (prefix) => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const toNumber = (value, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const toBoolean = (value, fallback = false) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'undefined' || value === null) {
    return fallback;
  }

  return ['true', '1', 'yes', 'on'].includes(String(value).trim().toLowerCase());
};

const parseArrayInput = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  const text = String(value).trim();

  if (!text) {
    return [];
  }

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    return text
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const parseObjectInput = (value, fallback = {}) => {
  if (!value) {
    return fallback;
  }

  if (typeof value === 'object' && !Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(String(value));
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    return fallback;
  }

  return fallback;
};

const slugify = (text) => {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const fileToDataUrl = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

const sortByOrderAndDate = (items) => {
  return [...items].sort((a, b) => {
    const orderDiff = toNumber(a.sortOrder, 0) - toNumber(b.sortOrder, 0);
    if (orderDiff !== 0) {
      return orderDiff;
    }

    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });
};

const sortByDateDesc = (items, dateKey = 'createdAt') => {
  return [...items].sort((a, b) => {
    return new Date(b[dateKey] || 0).getTime() - new Date(a[dateKey] || 0).getTime();
  });
};

const mergeWithDefaults = (rawState = {}) => {
  const defaults = buildDefaultContentState();

  return {
    about: {
      ...defaults.about,
      ...(rawState.about || {}),
      socials: {
        ...defaults.about.socials,
        ...(rawState.about?.socials || {})
      },
      contact: {
        ...defaults.about.contact,
        ...(rawState.about?.contact || {})
      }
    },
    projects: Array.isArray(rawState.projects)
      ? rawState.projects.map((project) => normalizeProjectItem(project))
      : defaults.projects.map((project) => normalizeProjectItem(project)),
    experience: Array.isArray(rawState.experience) ? rawState.experience : defaults.experience,
    skills: Array.isArray(rawState.skills) ? rawState.skills : defaults.skills,
    blogs: Array.isArray(rawState.blogs) ? rawState.blogs : defaults.blogs,
    resume: rawState.resume || defaults.resume
  };
};

const readState = () => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const defaults = buildDefaultContentState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }

  try {
    const parsed = JSON.parse(raw);
    const merged = mergeWithDefaults(parsed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    const defaults = buildDefaultContentState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }
};

const writeState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const readMessages = () => {
  const raw = localStorage.getItem(MESSAGES_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeMessages = (messages) => {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

const ensureUniqueSlug = (blogs, title, currentId = '') => {
  const base = slugify(title) || 'post';
  let slug = base;
  let index = 2;

  const isDuplicate = (candidate) =>
    blogs.some((blog) => blog.slug === candidate && blog._id !== currentId);

  while (isDuplicate(slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }

  return slug;
};

const parseLineInput = (value) => {
  if (!value) {
    return [];
  }

  return String(value)
    .split(/\r?\n/g)
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseFlexibleArrayInput = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    if (trimmed.startsWith('data:') || /^https?:\/\//i.test(trimmed)) {
      return [trimmed];
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      if (trimmed.includes('\n')) {
        return parseLineInput(trimmed);
      }

      return parseArrayInput(trimmed);
    }
  }

  return [];
};

const normalizeTechnologyList = (value) => {
  const rawItems =
    typeof value === 'string' && value.includes('\n')
      ? parseLineInput(value)
      : parseFlexibleArrayInput(value);

  const normalized = rawItems
    .map((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        const name = String(item.name || '').trim();
        const icon = String(item.icon || '').trim();

        if (!name) {
          return null;
        }

        return { name, icon };
      }

      const text = String(item || '').trim();
      if (!text) {
        return null;
      }

      const [namePart, ...iconParts] = text.split('|');
      const name = String(namePart || '').trim();
      const icon = String(iconParts.join('|') || '').trim();

      if (!name) {
        return null;
      }

      return { name, icon };
    })
    .filter(Boolean);

  const seen = new Set();

  return normalized.filter((tech) => {
    const key = tech.name.toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const isGithubLink = (link) => {
  const label = String(link?.label || '').toLowerCase();
  const url = String(link?.url || '').toLowerCase();
  return label.includes('github') || url.includes('github.com');
};

const normalizeLinksList = (value, legacyLinks = {}) => {
  const rawItems =
    typeof value === 'string' && value.includes('\n')
      ? parseLineInput(value)
      : parseFlexibleArrayInput(value);

  const normalized = rawItems
    .map((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        const label = String(item.label || '').trim() || 'Link';
        const url = String(item.url || '').trim();

        if (!url || !/^https?:\/\//i.test(url)) {
          return null;
        }

        return { label, url };
      }

      const text = String(item || '').trim();
      if (!text) {
        return null;
      }

      const [labelPart, ...urlParts] = text.split('|');

      let label = '';
      let url = '';

      if (urlParts.length > 0) {
        label = String(labelPart || '').trim();
        url = String(urlParts.join('|') || '').trim();
      } else {
        url = text;
      }

      if (!/^https?:\/\//i.test(url)) {
        return null;
      }

      return {
        label: label || 'Link',
        url
      };
    })
    .filter(Boolean);

  const appendLegacyLink = (label, url) => {
    const trimmed = String(url || '').trim();
    if (!trimmed || !/^https?:\/\//i.test(trimmed)) {
      return;
    }

    const exists = normalized.some((item) => item.url.toLowerCase() === trimmed.toLowerCase());
    if (!exists) {
      normalized.push({ label, url: trimmed });
    }
  };

  appendLegacyLink('GitHub', legacyLinks.githubUrl);
  appendLegacyLink('Live Demo', legacyLinks.liveUrl);

  return normalized;
};

const normalizeHighlights = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  const text = String(value).trim();
  if (!text) {
    return [];
  }

  if (text.includes('\n')) {
    return parseLineInput(text);
  }

  return parseArrayInput(text);
};

const normalizeImageList = (value, fallback = '') => {
  const rawItems = parseFlexibleArrayInput(value);
  const candidates = [String(fallback || '').trim(), ...rawItems.map((item) => String(item || '').trim())]
    .filter(Boolean);

  return [...new Set(candidates)];
};

const normalizeProjectItem = (project = {}) => {
  const technologies = normalizeTechnologyList(project.technologies);
  const links = normalizeLinksList(project.links, {
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl
  });
  const images = normalizeImageList(project.images, project.imageUrl);
  const highlights = normalizeHighlights(project.highlights);

  const githubLink = links.find((link) => isGithubLink(link));
  const liveLink = links.find((link) => !isGithubLink(link));

  return {
    ...project,
    role: String(project.role || ''),
    year: String(project.year || ''),
    status: String(project.status || ''),
    technologies,
    links,
    images,
    highlights,
    imageUrl: images[0] || '',
    githubUrl: githubLink?.url || String(project.githubUrl || ''),
    liveUrl: liveLink?.url || String(project.liveUrl || '')
  };
};

const normalizeProjectPayload = async (payload, existing = null) => {
  const base = normalizeProjectItem(existing || {});

  let title = base.title || '';
  let description = base.description || '';
  let role = base.role || '';
  let year = base.year || '';
  let status = base.status || '';
  let technologies = base.technologies || [];
  let links = base.links || [];
  let highlights = base.highlights || [];
  let featured = Boolean(base.featured);
  let sortOrder = toNumber(base.sortOrder, 0);
  let images = normalizeImageList(base.images, base.imageUrl);

  if (payload instanceof FormData) {
    if (payload.has('title')) {
      title = String(payload.get('title') || '').trim();
    }

    if (payload.has('description')) {
      description = String(payload.get('description') || '').trim();
    }

    if (payload.has('role')) {
      role = String(payload.get('role') || '').trim();
    }

    if (payload.has('year')) {
      year = String(payload.get('year') || '').trim();
    }

    if (payload.has('status')) {
      status = String(payload.get('status') || '').trim();
    }

    if (payload.has('technologiesDetailed')) {
      technologies = normalizeTechnologyList(payload.get('technologiesDetailed'));
    } else if (payload.has('technologies')) {
      technologies = normalizeTechnologyList(payload.get('technologies'));
    }

    if (payload.has('projectLinks')) {
      links = normalizeLinksList(payload.get('projectLinks'));
    }

    const legacyGithubUrl = payload.has('githubUrl')
      ? String(payload.get('githubUrl') || '').trim()
      : base.githubUrl;
    const legacyLiveUrl = payload.has('liveUrl')
      ? String(payload.get('liveUrl') || '').trim()
      : base.liveUrl;
    links = normalizeLinksList(links, {
      githubUrl: legacyGithubUrl,
      liveUrl: legacyLiveUrl
    });

    if (payload.has('highlights')) {
      highlights = normalizeHighlights(payload.get('highlights'));
    }

    if (payload.has('featured')) {
      featured = toBoolean(payload.get('featured'));
    }

    if (payload.has('sortOrder')) {
      sortOrder = toNumber(payload.get('sortOrder'), 0);
    }

    if (payload.has('imagesExisting')) {
      images = normalizeImageList(payload.get('imagesExisting'));
    }

    const newImageFiles = payload.getAll('images');
    for (const file of newImageFiles) {
      if (file instanceof File && file.size > 0) {
        images.push(await fileToDataUrl(file));
      }
    }

    const image = payload.get('image');
    if (image instanceof File && image.size > 0) {
      images.push(await fileToDataUrl(image));
    }

    if (payload.has('imageUrl')) {
      const manualImageUrl = String(payload.get('imageUrl') || '').trim();
      if (manualImageUrl) {
        images.push(manualImageUrl);
      }
    }
  } else {
    title = String(payload?.title ?? title).trim();
    description = String(payload?.description ?? description).trim();
    role = String(payload?.role ?? role).trim();
    year = String(payload?.year ?? year).trim();
    status = String(payload?.status ?? status).trim();

    if (typeof payload?.technologiesDetailed !== 'undefined') {
      technologies = normalizeTechnologyList(payload.technologiesDetailed);
    } else if (typeof payload?.technologies !== 'undefined') {
      technologies = normalizeTechnologyList(payload.technologies);
    }

    if (typeof payload?.projectLinks !== 'undefined') {
      links = normalizeLinksList(payload.projectLinks);
    } else if (typeof payload?.links !== 'undefined') {
      links = normalizeLinksList(payload.links);
    }

    links = normalizeLinksList(links, {
      githubUrl: String(payload?.githubUrl ?? base.githubUrl).trim(),
      liveUrl: String(payload?.liveUrl ?? base.liveUrl).trim()
    });

    if (typeof payload?.highlights !== 'undefined') {
      highlights = normalizeHighlights(payload.highlights);
    }

    featured = toBoolean(payload?.featured, featured);
    sortOrder = toNumber(payload?.sortOrder, sortOrder);

    images = normalizeImageList(payload?.images ?? images, payload?.imageUrl);
  }

  if (!title || !description) {
    throw new Error('Title and description are required');
  }

  const normalizedProject = normalizeProjectItem({
    title,
    description,
    role,
    year,
    status,
    technologies,
    links,
    highlights,
    featured,
    sortOrder,
    images
  });

  return normalizedProject;
};

const normalizeAboutPayload = async (payload, existing) => {
  const updated = clone(existing);

  if (payload instanceof FormData) {
    ['fullName', 'headline', 'shortBio', 'detailedBio'].forEach((field) => {
      if (payload.has(field)) {
        updated[field] = String(payload.get(field) || '');
      }
    });

    if (payload.has('techStack')) {
      updated.techStack = parseArrayInput(payload.get('techStack'));
    }

    if (payload.has('contact')) {
      updated.contact = {
        ...updated.contact,
        ...parseObjectInput(payload.get('contact'), {})
      };
    }

    if (payload.has('socials')) {
      updated.socials = {
        ...updated.socials,
        ...parseObjectInput(payload.get('socials'), {})
      };
    }

    const profileImage = payload.get('profileImage');
    if (profileImage instanceof File && profileImage.size > 0) {
      updated.profileImageUrl = await fileToDataUrl(profileImage);
      updated.profileImagePath = '';
    }
  } else {
    Object.assign(updated, payload || {});
  }

  updated.updatedAt = nowIso();
  return updated;
};

const contentService = {
  getAbout: async () => {
    const state = readState();
    return clone(state.about);
  },

  updateAbout: async (payload) => {
    const state = readState();
    state.about = await normalizeAboutPayload(payload, state.about);
    writeState(state);
    return clone(state.about);
  },

  getProjects: async () => {
    const state = readState();
    return clone(sortByOrderAndDate(state.projects).map((project) => normalizeProjectItem(project)));
  },

  createProject: async (payload) => {
    const state = readState();
    const normalized = await normalizeProjectPayload(payload);
    const createdAt = nowIso();

    const project = {
      _id: makeId('project'),
      ...normalized,
      imagePath: '',
      createdAt,
      updatedAt: createdAt
    };

    state.projects.push(normalizeProjectItem(project));
    writeState(state);
    return clone(normalizeProjectItem(project));
  },

  updateProject: async (id, payload) => {
    const state = readState();
    const index = state.projects.findIndex((project) => project._id === id);

    if (index < 0) {
      throw new Error('Project not found');
    }

    const normalized = await normalizeProjectPayload(payload, state.projects[index]);
    const updated = {
      ...state.projects[index],
      ...normalized,
      updatedAt: nowIso()
    };

    state.projects[index] = normalizeProjectItem(updated);
    writeState(state);
    return clone(normalizeProjectItem(updated));
  },

  deleteProject: async (id) => {
    const state = readState();
    state.projects = state.projects.filter((project) => project._id !== id);
    writeState(state);
    return { message: 'Project deleted' };
  },

  getExperience: async () => {
    const state = readState();
    return clone(sortByOrderAndDate(state.experience));
  },

  createExperience: async (payload) => {
    if (!payload?.company || !payload?.role || !payload?.duration || !payload?.description) {
      throw new Error('Company, role, duration and description are required');
    }

    const state = readState();
    const createdAt = nowIso();
    const item = {
      _id: makeId('experience'),
      company: String(payload.company),
      role: String(payload.role),
      duration: String(payload.duration),
      description: String(payload.description),
      location: String(payload.location || ''),
      sortOrder: toNumber(payload.sortOrder, 0),
      createdAt,
      updatedAt: createdAt
    };

    state.experience.push(item);
    writeState(state);
    return clone(item);
  },

  updateExperience: async (id, payload) => {
    const state = readState();
    const index = state.experience.findIndex((item) => item._id === id);

    if (index < 0) {
      throw new Error('Experience not found');
    }

    state.experience[index] = {
      ...state.experience[index],
      ...payload,
      sortOrder: toNumber(payload?.sortOrder, state.experience[index].sortOrder),
      updatedAt: nowIso()
    };

    writeState(state);
    return clone(state.experience[index]);
  },

  deleteExperience: async (id) => {
    const state = readState();
    state.experience = state.experience.filter((item) => item._id !== id);
    writeState(state);
    return { message: 'Experience deleted' };
  },

  getSkills: async () => {
    const state = readState();
    return clone(
      [...state.skills].sort((a, b) => {
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }

        const orderDiff = toNumber(a.sortOrder, 0) - toNumber(b.sortOrder, 0);
        if (orderDiff !== 0) {
          return orderDiff;
        }

        return String(a.name).localeCompare(String(b.name));
      })
    );
  },

  getGroupedSkills: async () => {
    const skills = await contentService.getSkills();

    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }

      acc[skill.category].push(skill);
      return acc;
    }, {});
  },

  createSkill: async (payload) => {
    if (!payload?.category || !payload?.name) {
      throw new Error('Category and name are required');
    }

    const state = readState();
    const createdAt = nowIso();
    const skill = {
      _id: makeId('skill'),
      category: String(payload.category),
      name: String(payload.name),
      level: toNumber(payload.level, 80),
      icon: String(payload.icon || ''),
      sortOrder: toNumber(payload.sortOrder, 0),
      createdAt,
      updatedAt: createdAt
    };

    state.skills.push(skill);
    writeState(state);
    return clone(skill);
  },

  updateSkill: async (id, payload) => {
    const state = readState();
    const index = state.skills.findIndex((skill) => skill._id === id);

    if (index < 0) {
      throw new Error('Skill not found');
    }

    state.skills[index] = {
      ...state.skills[index],
      ...payload,
      level: toNumber(payload?.level, state.skills[index].level),
      sortOrder: toNumber(payload?.sortOrder, state.skills[index].sortOrder),
      updatedAt: nowIso()
    };

    writeState(state);
    return clone(state.skills[index]);
  },

  deleteSkill: async (id) => {
    const state = readState();
    state.skills = state.skills.filter((skill) => skill._id !== id);
    writeState(state);
    return { message: 'Skill deleted' };
  },

  getBlogs: async () => {
    const state = readState();
    return clone(sortByDateDesc(state.blogs.filter((blog) => blog.isPublished), 'publishedAt'));
  },

  getBlogBySlug: async (slug) => {
    const state = readState();
    const blog = state.blogs.find((item) => item.slug === slug && item.isPublished);

    if (!blog) {
      throw new Error('Blog post not found');
    }

    return clone(blog);
  },

  getAdminBlogs: async () => {
    const state = readState();
    return clone(sortByDateDesc(state.blogs, 'createdAt'));
  },

  createBlog: async (payload) => {
    if (!payload?.title || !payload?.content) {
      throw new Error('Title and content are required');
    }

    const state = readState();
    const createdAt = nowIso();
    const blog = {
      _id: makeId('blog'),
      title: String(payload.title).trim(),
      slug: ensureUniqueSlug(state.blogs, payload.title),
      excerpt: String(payload.excerpt || ''),
      content: String(payload.content),
      tags: parseArrayInput(payload.tags),
      coverImage: String(payload.coverImage || ''),
      isPublished: toBoolean(payload.isPublished, true),
      publishedAt: payload.publishedAt ? String(payload.publishedAt) : createdAt,
      createdAt,
      updatedAt: createdAt
    };

    state.blogs.push(blog);
    writeState(state);
    return clone(blog);
  },

  updateBlog: async (id, payload) => {
    const state = readState();
    const index = state.blogs.findIndex((blog) => blog._id === id);

    if (index < 0) {
      throw new Error('Blog post not found');
    }

    const existing = state.blogs[index];
    const nextTitle = String(payload?.title ?? existing.title);

    state.blogs[index] = {
      ...existing,
      ...payload,
      title: nextTitle,
      slug: ensureUniqueSlug(state.blogs, nextTitle, id),
      tags: typeof payload?.tags !== 'undefined' ? parseArrayInput(payload.tags) : existing.tags,
      isPublished: toBoolean(payload?.isPublished, existing.isPublished),
      updatedAt: nowIso()
    };

    writeState(state);
    return clone(state.blogs[index]);
  },

  deleteBlog: async (id) => {
    const state = readState();
    state.blogs = state.blogs.filter((blog) => blog._id !== id);
    writeState(state);
    return { message: 'Blog deleted' };
  },

  getResume: async () => {
    const state = readState();

    if (!state.resume) {
      throw new Error('Resume not found');
    }

    return clone(state.resume);
  },

  uploadResume: async (payload) => {
    if (!(payload instanceof FormData)) {
      throw new Error('Invalid resume payload');
    }

    const file = payload.get('resume');

    if (!(file instanceof File) || file.size <= 0) {
      throw new Error('Resume file is required');
    }

    const ext = file.name.split('.').pop()?.toLowerCase();
    const allowed = ['pdf', 'docx'];
    if (!ext || !allowed.includes(ext)) {
      throw new Error('Only PDF and DOCX are allowed');
    }

    const fileUrl = await fileToDataUrl(file);
    const uploadedAt = nowIso();

    const state = readState();
    state.resume = {
      _id: makeId('resume'),
      filename: file.name,
      originalName: file.name,
      mimeType: file.type || (ext === 'pdf' ? 'application/pdf' : 'application/octet-stream'),
      size: file.size,
      filePath: '',
      fileUrl,
      isActive: true,
      createdAt: uploadedAt,
      updatedAt: uploadedAt
    };

    writeState(state);
    return clone(state.resume);
  },

  getResumeDownloadUrl: () => {
    const state = readState();
    return state.resume?.fileUrl || '';
  },

  submitContact: async (payload) => {
    if (!payload?.name || !payload?.email || !payload?.message) {
      throw new Error('Name, email and message are required');
    }

    const messages = readMessages();
    const item = {
      _id: makeId('message'),
      name: String(payload.name),
      email: String(payload.email),
      message: String(payload.message),
      createdAt: nowIso(),
      updatedAt: nowIso()
    };

    messages.unshift(item);
    writeMessages(messages);

    return {
      id: item._id,
      message: 'Message submitted successfully'
    };
  },

  getContactMessages: async () => {
    return clone(sortByDateDesc(readMessages(), 'createdAt'));
  }
};

export default contentService;
