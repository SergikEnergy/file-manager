import { resolve } from 'path';
import { isDirExist } from '../utils/helpers.js';
export const moveUpLevel = async (path) => {
    return resolve(path, '..');
};
export const changeCurrentDirectory = async (pathFrom, pathTo) => {
    const path = resolve(pathFrom, ...pathTo);
    await isDirExist(path);
    return path;
};
//# sourceMappingURL=path-commands.js.map