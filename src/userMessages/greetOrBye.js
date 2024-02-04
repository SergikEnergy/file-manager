import { getUserName } from '../utils/getUserName.js';
import { colorizedLog } from '../utils/colorizedLog.js';

export const sayHelloOrGoodBye = (msg = 'hello') => {
  const user = getUserName();
  if (msg === 'hello') {
    colorizedLog(`Welcome to the File Manager, ${user}!`, 'yellow');
  }
  if (msg === 'bye') {
    colorizedLog(`Thank you for using File Manager, ${user}, goodbye!`, 'yellow');
  }
};
