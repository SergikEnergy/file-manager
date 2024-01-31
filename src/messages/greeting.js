import { getUserName } from './utils/getUserName';

export const sayHello = () => {
  const user = getUserName();
  console.log(`Welcome to the File Manager, ${user}!`);
};
