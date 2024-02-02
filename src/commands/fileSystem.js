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
