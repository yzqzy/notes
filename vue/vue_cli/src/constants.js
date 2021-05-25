const { version } = require('../package.json');

const downloadDest = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`;

console.log(downloadDest);

module.exports = {
  version,
  downloadDest
}