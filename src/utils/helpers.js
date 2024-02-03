import { stat } from 'node:fs/promises';
import { normalize, resolve, isAbsolute } from 'node:path';

export const isDirExist = async (pathToDir) => {
  try {
    const isDirectory = (await stat(pathToDir)).isDirectory();
    return isDirectory;
  } catch {
    throw new Error('Error with reading directory');
  }
};

export const pathResolver = (currentPath, pathTo) => {
  const absolute = isAbsolute(...pathTo);
  if (absolute) {
    return normalize(...pathTo);
  }
  return resolve(currentPath, ...pathTo);
};
