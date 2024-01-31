export const getUserName = () => {
  const processArgs = process.argv.slice(2);

  let user = 'Unknown';
  if (processArgs.length !== 0) {
    const users = processArgs.filter((elem) => elem.startsWith('--username'));
    console.log(users);
  }
  return user;
};
