import { stat } from 'fs/promises';
import { normalize, resolve, isAbsolute } from 'path';

export const isDirExist = async (pathToDir: string) => {
  try {
    return (await stat(pathToDir)).isDirectory();
  } catch {
    throw new Error('Error with reading directory');
  }
};

export const pathResolver = (currentPath: string, pathTo: string | string[]) => {
  try {
    const absolute = isAbsolute(typeof pathTo === 'string' ? pathTo : pathTo.toString());
    if (absolute) {
      return normalize(typeof pathTo === 'string' ? pathTo : pathTo.toString());
    }
    return resolve(currentPath, ...pathTo);
  } catch {
    throw new Error('Operation failed');
  }
};

export const isFileExist = async (pathToFile: string) => {
  try {
    return (await stat(pathToFile)).isFile();
  } catch {
    throw new Error('Failed read file');
  }
};
