export function parseData(data) {
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  const cliData = data.match(regex) || [];
  return cliData.map((item) => item.replace(/(^['"]|['"]$)/g, ''));
}

/* some regExp for checking correct command
[^\s"'] - matches sequence: !space character (\s), " or '

"([^"]*)" - matches a double-quoted string. 
It starts with a double quotation mark ("),
followed by a group (...) that matches characters - not a ", and ends with ".

'([^']*)' - the same for single quote
*/
