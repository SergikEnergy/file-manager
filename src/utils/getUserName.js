export const getUserName = () => {
  const processArgs = process.argv.slice(2);

  let user;
  if (processArgs.length !== 0) {
    const users = processArgs.filter((elem) => elem.startsWith('--username'));
    if (users.length !== 0) {
      const [_, userName] = users.at(-1).trim().split('=');
      user = userName ? userName : '';
      if (!user) {
        const [_, defaultName] = users[0].trim().split('=');
        user = defaultName;
      }
    }
  } else user = 'Unknown';
  return user;
};
