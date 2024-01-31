import { sayHelloOrGoodBye } from './src/userMessages/greetOrBye.js';

sayHelloOrGoodBye();

process.on('exit', (code) => {
  if (code === 0) {
    sayHelloOrGoodBye('bye');
  } else {
    console.log('error');
  }
});
