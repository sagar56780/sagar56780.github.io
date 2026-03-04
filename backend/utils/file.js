import fs from 'fs';

export const removeFileIfExists = (filePath) => {
  if (!filePath) {
    return;
  }

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.warn(`Could not remove file: ${filePath}`, error.message);
  }
};
