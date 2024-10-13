import { createReadStream, createWriteStream } from 'fs';
import { readdir, writeFile, rename, mkdir, unlink } from 'fs/promises';
import { isDirExist, pathResolver } from '../utils/helpers.js';
import { resolve, parse } from 'path';
import { pipeline } from 'stream/promises';
export const printFolderStructure = async (path) => {
    const filesList = await readdir(path, { withFileTypes: true });
    const sortedList = filesList
        .filter((file) => {
        if (file.isDirectory() || file.isFile())
            return true;
    })
        .map((elem) => ({ Name: elem.name, Type: elem.isDirectory() ? 'directory' : 'file' }))
        .sort(sortByNameProp)
        .sort((a, b) => b.Type.length - a.Type.length);
    function sortByNameProp(obj1, obj2) {
        if (obj1.Name > obj2.Name) {
            return 1;
        }
        if (obj1.Name < obj2.Name) {
            return -1;
        }
        return 0;
    }
    console.table(sortedList);
};
export const printFileToConsole = async (currentPath, pathToFile) => {
    try {
        const pathToRead = pathResolver(currentPath, pathToFile);
        const rs = createReadStream(pathToRead, 'utf-8');
        const waitEnd = new Promise((res) => {
            rs.on('end', () => {
                res();
            });
        });
        rs.on('data', (chunk) => {
            console.log(chunk.toString());
        });
        rs.on('error', (err) => {
            throw new Error(err.message);
        });
        await waitEnd;
    }
    catch {
        throw new Error('Failed Read');
    }
};
export const createEmptyFile = async (currentPath, [fileName]) => {
    const pathToNewFile = resolve(currentPath, fileName);
    await writeFile(pathToNewFile, '', { encoding: 'utf-8' });
};
export const renameFile = async (currentPath, [pathToFile, name]) => {
    const pathToRead = pathResolver(currentPath, [pathToFile]);
    const newPath = resolve(currentPath, name);
    await rename(pathToRead, newPath);
};
export const copyFile = async (currentPath, [pathToFile, pathWhere]) => {
    const pathFrom = pathResolver(currentPath, [pathToFile]);
    const pathDestinationDir = pathResolver(currentPath, [pathWhere]);
    const fileName = parse(pathFrom).base;
    const pathFileDestination = resolve(pathDestinationDir, fileName);
    const rs = createReadStream(pathFrom, 'utf-8');
    try {
        await isDirExist(pathDestinationDir);
    }
    catch {
        await mkdir(pathDestinationDir);
    }
    const ws = createWriteStream(pathFileDestination);
    await pipeline(rs, ws);
};
export const deleteFile = async (currentPath, pathToFile) => {
    const pathForDelete = pathResolver(currentPath, pathToFile);
    await unlink(pathForDelete);
};
export const moveFile = async (currentPath, [pathFrom, pathWhere]) => {
    await copyFile(currentPath, [pathFrom, pathWhere]);
    await deleteFile(currentPath, [pathFrom]);
};
//# sourceMappingURL=file-system.js.map