import { homedir } from 'os';

import { greeting } from './features/greeting.js';
import { logSuccess } from './utils/log-success-message.js';
import { App } from './app.js';

greeting();

const pathToHomeDir = homedir();
logSuccess(pathToHomeDir);

const app = new App(pathToHomeDir);
console.log(app);

process.on('exit', (code) => {
  if (code === 0) {
    greeting('bye');
  } else {
    console.log('error');
  }
});

process.on('SIGINT', () => {
  greeting('bye');
});
