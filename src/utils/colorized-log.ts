import { consoleColors } from '../constants/console-colors.js';

export function colorizedLog(msg: string, color = 'black') {
  if (color === 'black') return console.log(msg);
  return console.log(consoleColors[color] + msg + consoleColors.resetColor);
}
