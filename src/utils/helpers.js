import { stat } from 'node:fs/promises';

export const isDirExist = async (pathToDir) => {
  try {
    const isDirectory = (await stat(pathToDir)).isDirectory();
    return isDirectory;
  } catch {
    throw new Error('Error with reading directory');
  }
};
