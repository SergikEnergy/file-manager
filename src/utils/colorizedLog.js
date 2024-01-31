import { consoleColors } from '../constants/consoleColors.js';

export function colorizedLog(msg, color = 'black') {
  if (color === 'black') return console.log(msg);
  return console.log(consoleColors[color] + msg + consoleColors.resetColor);
}
