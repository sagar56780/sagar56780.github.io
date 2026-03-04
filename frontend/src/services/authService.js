import { TOKEN_KEY } from './api';

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@sagarkumar.dev')
  .trim()
  .toLowerCase();
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'ChangeMe123!';

const ADMIN_PROFILE = {
  id: 'admin-local-1',
  name: 'Sagar Kumar',
  email: ADMIN_EMAIL
};

const decodeToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    const decoded = atob(token);
    const payload = JSON.parse(decoded);
    return payload;
  } catch {
    return null;
  }
};

const authService = {
  login: async ({ email, password }) => {
    const normalizedEmail = String(email || '')
      .trim()
      .toLowerCase();

    if (normalizedEmail !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      email: ADMIN_EMAIL,
      role: 'admin',
      issuedAt: Date.now()
    };

    const token = btoa(JSON.stringify(payload));

    return {
      token,
      admin: ADMIN_PROFILE
    };
  },

  me: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const decoded = decodeToken(token);

    if (!decoded || decoded.email !== ADMIN_EMAIL) {
      throw new Error('Unauthorized');
    }

    return ADMIN_PROFILE;
  }
};

export default authService;
