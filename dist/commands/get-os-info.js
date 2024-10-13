import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { colorizedLog } from '../utils/colorized-log.js';
export const getEOLInfo = async () => {
    colorizedLog(`Your OS EOL: ${JSON.stringify(EOL)}`, 'green');
};
export const getCPUInfo = async () => {
    const cpusInfo = cpus().map((item) => {
        return {
            Model: item.model.trim(),
            'Clock Rate': `${item.speed / 1000} GHz`,
        };
    });
    colorizedLog(`Total amount of CPUS is ${cpusInfo.length}`, 'green');
    console.table(cpusInfo);
};
export const getHomeDir = async () => {
    const homeDir = homedir();
    colorizedLog(`User home directory is --> ${homeDir}`, 'green');
};
export const getUserName = async () => {
    const user = userInfo().username;
    colorizedLog(`Current user --> ${user}`, 'green');
};
export const getArchitecture = async () => {
    const archInfo = arch();
    colorizedLog(`CPU architecture --> ${archInfo}`, 'green');
};
//# sourceMappingURL=get-os-info.js.map