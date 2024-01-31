import { homedir } from 'node:os';
import { sayHelloOrGoodBye } from './src/userMessages/greetOrBye.js';
import { logSuccess } from './src/utils/logSuccessMessage.js';
import App from './src/app.js';

const pathToHomeDir = homedir();

sayHelloOrGoodBye();

logSuccess(pathToHomeDir);

const app = new App(pathToHomeDir);
app.run();

process.on('exit', (code) => {
  if (code === 0) {
    sayHelloOrGoodBye('bye');
  } else {
    console.log('error');
  }
});
