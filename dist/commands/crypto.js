import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { pathResolver } from '../utils/helpers.js';
export const getHash = (content, algorithm = 'sha256') => {
    const hash = createHash(algorithm);
    const hashedData = hash.update(content, 'utf-8');
    return hashedData.digest('hex');
};
export const printHashToConsole = async (currentPath, pathToFile) => {
    const resolvedPath = pathResolver(currentPath, pathToFile);
    const myReadStream = createReadStream(resolvedPath, { encoding: 'utf-8' });
    let result = '';
    myReadStream.on('data', (chunk) => {
        result += chunk;
    });
    const waitEnd = new Promise((res, rej) => {
        myReadStream.on('end', () => {
            console.log(getHash(result));
            res();
        });
        myReadStream.on('error', () => {
            rej('Failed read file');
        });
    });
    await waitEnd;
};
//# sourceMappingURL=crypto.js.map