import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { parse } from 'path';

import { pathResolver, isDirExist } from '../utils/helpers.js';

export const compressFile = async (currentPath: string, [pathToFile, pathToDestinationFile]: string[]) => {
  const pathForRead = pathResolver(currentPath, [pathToFile]);
  const pathToCompressedFile = pathResolver(currentPath, [pathToDestinationFile]);
  const pathToDestinationDir = parse(pathToCompressedFile).dir;

  try {
    try {
      await isDirExist(pathToDestinationDir);
    } catch {
      await mkdir(pathToDestinationDir);
    }

    const rs = createReadStream(pathForRead);

    const ws = createWriteStream(pathToCompressedFile);
    await pipeline(rs, createBrotliCompress(), ws);
  } catch {
    throw new Error('Operation failed');
  }
};

export const decompressFile = async (currentPath: string, [pathToFile, pathToDestinationFile]: string[]) => {
  const pathForRead = pathResolver(currentPath, [pathToFile]);
  const pathToDecompressedFile = pathResolver(currentPath, [pathToDestinationFile]);
  const pathToDestinationDir = parse(pathToDecompressedFile).dir;

  const rs = createReadStream(pathForRead);
  try {
    await isDirExist(pathToDestinationDir);
  } catch {
    await mkdir(pathToDestinationDir);
  }
  const ws = createWriteStream(pathToDecompressedFile);
  await pipeline(rs, createBrotliDecompress(), ws);
};
