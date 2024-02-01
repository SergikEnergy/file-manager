import * as readline from 'node:readline/promises';
import { parseData } from './utils/parseData.js';
import * as osInfo from './commands/currentOsInfo.js';

import { colorizedLog as log } from './utils/colorizedLog.js';
import { logSuccess } from './utils/logSuccessMessage.js';
import { consoleMessages } from './constants/statusMessages.js';

class App {
  constructor(homeDir) {
    this._currentPath = homeDir;
  }

  _isValid = async (command, args) => {
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
        if (args.length === 1 && args[0]) {
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
        if (args.length === 2 && args[0] && args[1]) {
          return true;
        } else {
          return false;
        }

      default:
        return false;
    }
  };

  _logsProcessInfo = async ([flag]) => {
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
  };

  run() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.on('line', async (data) => {
      if (data.includes('.exit')) {
        rl.close();
      }

      const [command, ...restParams] = parseData(data.trim().toString());
      if (await this._isValid(command, restParams)) {
        try {
          //tbd

          //end in case success log
          logSuccess(this._currentPath);
        } catch {
          log(consoleMessages.ERROR, 'red');
        }
      } else {
        log(consoleMessages.WRONG_INPUT, 'cyan');
      }
    });

    rl.on('close', () => {
      process.exit(0);
    });
  }
}

export default App;
