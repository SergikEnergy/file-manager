import { colorizedLog } from './colorized-log.js';

export const logSuccess = (path: string) => {
  colorizedLog(`You are currently in ${path}`, 'yellow');
};
