import * as readline from 'node:readline/promises';
import { colorizedLog as log } from './utils/colorizedLog.js';

class App {
  constructor(homeDir) {
    this._homeDir = homeDir;
  }

  run() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.on('line', async (data) => {
      try {
        log(typeof data);

        if (data.includes('.exit')) {
          rl.close();
        }
      } catch {}
    });

    log("I'm running", 'green');

    rl.on('close', () => {
      process.exit(0);
    });
  }
}

export default App;
