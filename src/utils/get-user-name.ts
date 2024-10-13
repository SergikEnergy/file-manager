import { isArrayWithItems } from './is-array-with-items.js';

export const getUserName = () => {
  const processArgs = process.argv.slice(2);

  let user;
  if (processArgs.length !== 0) {
    const users = processArgs.filter((elem) => elem.startsWith('--username'));
    if (isArrayWithItems(users)) {
      const [_, userName] = users[users.length - 1].trim().split('=');
      user = userName ? userName : '';
      if (!user) {
        const [_, defaultName] = users[0].trim().split('=');
        user = defaultName;
      }
    }
  } else user = 'Unknown';
  return user;
};
