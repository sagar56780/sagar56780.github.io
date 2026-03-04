import slugify from 'slugify';

export const buildSlug = (value) => {
  const base = slugify(value || 'item', {
    lower: true,
    strict: true,
    trim: true
  });

  return `${base}-${Date.now().toString().slice(-6)}`;
};
