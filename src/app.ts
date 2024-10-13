import { consoleMessages } from './constants/console-messages.js';
import * as osInfo from './commands/get-os-info.js';
import { colorizedLog } from './utils/colorized-log.js';

class App {
  private currentPath: string;

  constructor(homeDir: string) {
    this.currentPath = homeDir;
  }

  hello() {
    console.log(this.currentPath);
  }

  _isValidCommand = async (command: string, args: unknown[]) => {
    try {
      switch (command.trim().toLowerCase()) {
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
}

export { App };
