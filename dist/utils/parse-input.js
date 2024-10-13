export const parseInput = (data) => {
    // change spaces inside '  '  or "   " on separator sign
    const separator = '_sep_';
    const dataWithoutSpacesInside = data.replace(/(['"])(.*?)\1/g, (_, quote, content) => {
        return quote + content.replace(/ /g, separator) + quote;
    });
    const [command, arg1, arg2] = dataWithoutSpacesInside.split(' ');
    if (!arg1) {
        return [command];
    }
    if (!arg2 && arg1) {
        return [command, prepareArgs(arg1, separator)];
    }
    return [command, prepareArgs(arg1, separator), prepareArgs(arg2, separator)];
};
function prepareArgs(arg, sep) {
    const regExp = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
    const params = arg.match(regExp) || [];
    const sepRegExp = new RegExp(sep, 'g');
    return params
        .map((arg) => {
        arg
            .replace(/(^['"]|['"]$)/g, '')
            .trim()
            .replace(/,/g, '');
        if (arg.includes(sep)) {
            arg = arg.replace(sepRegExp, ' ');
        }
        return arg;
    })
        .join('')
        .replace(/['"]/g, '');
}
/* some regExp for checking correct command
[^\s"'] - matches sequence: !space character (\s), " or '

"([^"]*)" - matches a double-quoted string.
It starts with a double quotation mark ("),
followed by a group (...) that matches characters - not a ", and ends with ".

'([^']*)' - the same for single quote
*/
//# sourceMappingURL=parse-input.js.map