import { getUserName } from '../utils/get-user-name.js';
import { colorizedLog } from '../utils/colorized-log.js';
export const greeting = (msg = 'hello') => {
    const user = getUserName();
    if (msg === 'bye') {
        colorizedLog(`Thank you for using File Manager, ${user}, goodbye!`, 'yellow');
        return;
    }
    colorizedLog(`Welcome to the File Manager, ${user}!`, 'yellow');
};
//# sourceMappingURL=greeting.js.map