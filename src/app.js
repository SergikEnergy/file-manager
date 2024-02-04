import * as readline from 'node:readline/promises';
import { parseData } from './utils/parseData.js';
import * as osInfo from './commands/currentOsInfo.js';
import { moveUpLevel, changeCurrentDirectory } from './commands/navigation.js';
import {
  printFolderStructure,
  printFileToConsole,
  createEmptyFile,
  renameFile,
  copyFile,
  deleteFile,
  moveFile,
} from './commands/fileSystem.js';
import { printHashToConsole } from './commands/crypto.js';

import { colorizedLog as log } from './utils/colorizedLog.js';
import { logSuccess } from './utils/logSuccessMessage.js';
import { consoleMessages } from './constants/statusMessages.js';

class App {
  constructor(homeDir) {
    this._currentPath = homeDir;
  }

  _isValid = async (command, args) => {
    try {
      switch (command.toLowerCase()) {
        // operation without args
        case 'up':
        case 'ls':
        case '.exit':
          if (args.length > 0) {
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

  _logsProcessInfo = async ([flag]) => {
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
          log(consoleMessages.WRONG_INPUT, 'cyan');
          break;
      }
    } catch {}
  };

  _commands = async (command, args) => {
    switch (command.toLowerCase()) {
      case 'up':
        this._currentPath = await moveUpLevel(this._currentPath);
        break;

      case 'ls':
        await printFolderStructure(this._currentPath);
        break;

      case 'cd':
        this._currentPath = await changeCurrentDirectory(this._currentPath, args);
        break;

      case 'cat':
        await printFileToConsole(this._currentPath, args);
        break;

      case 'add':
        await createEmptyFile(this._currentPath, args);
        break;

      case 'rn':
        await renameFile(this._currentPath, args);
        break;

      case 'cp':
        await copyFile(this._currentPath, args);
        break;

      case 'rm':
        await deleteFile(this._currentPath, args);
        break;

      case 'mv':
        await moveFile(this._currentPath, args);
        break;

      case 'os':
        await this._logsProcessInfo(args);
        break;

      case 'hash':
        await printHashToConsole(this._currentPath, args);
        break;

      default:
        log(consoleMessages.WRONG_INPUT, 'cyan');
        break;
    }
  };

  async run() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.on('line', async (data) => {
      if (data.includes('.exit')) {
        rl.close();
      }
      const dataForChecking = data.trim();
      try {
        const [command, ...restParams] = parseData(dataForChecking);
        if (await this._isValid(command, restParams)) {
          await this._commands(command, restParams);
          //end in case success log
          logSuccess(this._currentPath);
        } else {
          log(consoleMessages.WRONG_INPUT, 'cyan');
          logSuccess(this._currentPath);
        }
      } catch {
        log(consoleMessages.ERROR, 'red');
        logSuccess(this._currentPath);
      }
    });

    rl.on('close', () => {
      process.exit(0);
    });
  }
}

export default App;
