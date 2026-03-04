export const TOKEN_KEY = 'portfolio_admin_token';

export const buildAssetUrl = (path) => {
  if (!path) {
    return '';
  }

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  return path.startsWith('/') ? path : `/${path}`;
};
