import { resolve } from 'path';
import { isDirExist } from '../utils/helpers.js';

export const moveUpLevel = async (path: string) => {
  return resolve(path, '..');
};

export const changeCurrentDirectory = async (pathFrom: string, pathTo: string[]) => {
  const path = resolve(pathFrom, ...pathTo);
  await isDirExist(path);
  return path;
};
