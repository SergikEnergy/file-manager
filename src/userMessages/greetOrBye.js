import { getUserName } from '../utils/getUserName.js';

export const sayHelloOrGoodBye = (msg = 'hello') => {
  const user = getUserName();
  if (msg === 'hello') {
    console.log(`Welcome to the File Manager, ${user}!`);
  }
  if (msg === 'bye') {
    console.log(`Thank you for using File Manager, ${user}, goodbye!`);
  }
};
