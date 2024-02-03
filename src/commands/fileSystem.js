import { readdir } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
// import { pipeline } from 'node:stream/promises';

import { pathResolver } from '../utils/helpers.js';

export const printFolderStructure = async (path) => {
  const filesList = await readdir(path, { withFileTypes: true });

  const sortedList = filesList
    .filter((file) => {
      if (file.isDirectory() || file.isFile()) return true;
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
  } catch {
    throw new Error('Failed Read');
  }
};
