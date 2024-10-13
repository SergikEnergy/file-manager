import { consoleMessages } from './constants/console-messages.js';
import * as osInfo from './commands/get-os-info.js';
import { colorizedLog } from './utils/colorized-log.js';
import { isArrayWithItems } from './utils/is-array-with-items.js';
import { createInterface } from 'readline';
import { parseInput } from './utils/parse-input.js';
import { logCurrentPath } from './utils/log-current-path.js';
import { changeCurrentDirectory, moveUpLevel } from './commands/path-commands.js';
import {
  copyFile,
  createEmptyFile,
  deleteFile,
  moveFile,
  printFileToConsole,
  printFolderStructure,
  renameFile,
} from './commands/file-system.js';
import { printHashToConsole } from './commands/crypto.js';
import { compressFile, decompressFile } from './commands/brothli.js';

class App {
  private currentPath: string;

  constructor(homeDir: string) {
    this.currentPath = homeDir;
  }

  _isValidCommand = async (command: string, args: unknown[]) => {
    try {
      switch (command.trim().toLowerCase()) {
        // operation without args
        case 'up':
        case 'ls':
        case '.exit':
          if (isArrayWithItems(args)) {
            return false;
          } else {
            return true;
          }

        // operation with single arg
        case 'cd':
        case 'cat':
        case 'add':
        case 'rm':
        case 'os':
        case 'hash':
          if (args.length >= 1 && args[0]) {
            return true;
          } else {
            return false;
          }

        // operation with double args
        case 'rn':
        case 'cp':
        case 'mv':
        case 'compress':
        case 'decompress':
          if (args.length >= 2 && args[0] && args[1]) {
            return true;
          } else {
            return false;
          }

        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  _logsProcessInfo = async ([flag]: string[]) => {
    try {
      switch (flag.toLowerCase()) {
        case '--eol':
          await osInfo.getEOLInfo();
          break;

        case '--cpus':
          await osInfo.getCPUInfo();
          break;

        case '--homedir':
          await osInfo.getHomeDir();
          break;

        case '--username':
          await osInfo.getUserName();
          break;

        case '--architecture':
          await osInfo.getArchitecture();
          break;

        default:
          colorizedLog(consoleMessages.WRONG_INPUT, 'cyan');
          break;
      }
    } catch {}
  };

  _commands = async (command: string, args: string[]) => {
    switch (command.trim().toLowerCase()) {
      case 'up':
        this.currentPath = await moveUpLevel(this.currentPath);
        break;

      case 'ls':
        await printFolderStructure(this.currentPath);
        break;

      case 'cd':
        this.currentPath = await changeCurrentDirectory(this.currentPath, args);
        break;

      case 'os':
        await this._logsProcessInfo(args);
        break;

      case 'cat':
        await printFileToConsole(this.currentPath, args);
        break;

      case 'add':
        await createEmptyFile(this.currentPath, args);
        break;

      case 'rn':
        await renameFile(this.currentPath, args);
        break;

      case 'cp':
        await copyFile(this.currentPath, args);
        break;

      case 'rm':
        await deleteFile(this.currentPath, args);
        break;

      case 'mv':
        await moveFile(this.currentPath, args);
        break;

      case 'hash':
        await printHashToConsole(this.currentPath, args);
        break;

      case 'compress':
        await compressFile(this.currentPath, args);
        break;

      case 'decompress':
        await decompressFile(this.currentPath, args);
        break;

      default:
        colorizedLog(consoleMessages.WRONG_INPUT, 'cyan');
        break;
    }
  };

  async run() {
    const readlineInterface = createInterface({ input: process.stdin, output: process.stdout });

    readlineInterface.on('line', async (data) => {
      if (data.includes('.exit')) {
        readlineInterface.close();
      }
      try {
        const [command, ...restParams] = parseInput(data.trim());
        const isCommandCorrect = await this._isValidCommand(command, restParams);
        if (isCommandCorrect) {
          await this._commands(command, restParams);
          //end in case success log
          logCurrentPath(this.currentPath);
        } else {
          colorizedLog(consoleMessages.WRONG_INPUT, 'cyan');
          logCurrentPath(this.currentPath);
        }
      } catch {
        colorizedLog(consoleMessages.ERROR, 'red');
        logCurrentPath(this.currentPath);
      }
    });

    readlineInterface.on('close', () => {
      process.exit(0);
    });
  }
}

export { App };
