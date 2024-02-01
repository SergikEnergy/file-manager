import { readdir } from 'node:fs/promises';

export const printFileStructure = async (path) => {
  const filesList = await readdir(path, { withFileTypes: true });

  const sortedList = filesList
    .filter((file) => {
      if (file.isDirectory() || file.isFile()) return true;
    })
    .map((elem) => ({ Name: elem.name, Type: elem.isDirectory() ? 'directory' : 'file' }))
    .sort(sortByNameProp)
    .sort((a, b) => b.Type.length - a.Type.length);

  function sortByNameProp(prop1, prop2) {
    if (prop1.Name > prop2.Name) {
      return 1;
    }
    if (prop1.Name < prop2.Name) {
      return -1;
    }
    return 0;
  }

  console.table(sortedList);
};
