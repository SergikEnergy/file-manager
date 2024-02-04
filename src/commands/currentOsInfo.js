import os from 'node:os';
import { colorizedLog as log } from '../utils/colorizedLog.js';

export const getEOLInfo = async () => {
  log(`Your OS EOL: ${JSON.stringify(os.EOL)}`, 'green');
};

export const getCPUInfo = async () => {
  const cpusInfo = os.cpus().map((item) => {
    return {
      Model: item.model.trim(),
      'Clock Rate': `${item.speed / 1000} GHz`,
    };
  });
  log(`Total amount of CPUS is ${cpusInfo.length}`, 'green');
  console.table(cpusInfo);
};

export const getHomeDir = async () => {
  const homedir = os.homedir();
  log(`User home directory is --> ${homedir}`, 'green');
};

export const getUserName = async () => {
  const user = os.userInfo().username;
  log(`Current user --> ${user}`, 'green');
};

export const getArchitecture = async () => {
  const archInfo = os.arch();
  log(`CPU architecture --> ${archInfo}`, 'green');
};
