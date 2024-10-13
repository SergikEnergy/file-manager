import { colorizedLog } from './colorized-log.js';

export const logCurrentPath = (path: string) => {
  colorizedLog(`You are currently in ${path}`, 'yellow');
};
