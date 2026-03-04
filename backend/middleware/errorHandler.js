const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  const multerLikeError =
    err?.name === 'MulterError' || err?.message === 'Invalid file type';
  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : multerLikeError
        ? 400
        : 500;

  console.error(err);

  res.status(statusCode).json({
    message: err.message || 'Server error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

export { notFound, errorHandler };
