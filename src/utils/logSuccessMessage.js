import { colorizedLog as log } from './colorizedLog.js';

export const logSuccess = (path) => {
  log(`You are currently in ${path}`, 'yellow');
};
