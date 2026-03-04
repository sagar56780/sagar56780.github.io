import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*'
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/uploads', express.static(uploadsDir));

app.get('/', (req, res) => {
  res.json({
    name: 'Sagar Kumar Portfolio API',
    status: 'ok'
  });
});

const bindRoute = (pathName, router) => {
  app.use(pathName, router);
  app.use(`/api${pathName}`, router);
};

bindRoute('/auth', authRoutes);
bindRoute('/about', aboutRoutes);
bindRoute('/projects', projectRoutes);
bindRoute('/experience', experienceRoutes);
bindRoute('/skills', skillRoutes);
bindRoute('/blog', blogRoutes);
bindRoute('/resume', resumeRoutes);
bindRoute('/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
