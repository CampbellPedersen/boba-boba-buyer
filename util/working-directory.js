const path = require('path');

const getCurrentWorkingDirectory = () => {
  const isInExecutable = process.pkg;
  const currentWorkingDirectory = isInExecutable ? path.join(process.argv0, '../') : process.cwd();
  return currentWorkingDirectory;
}

module.exports = {getCurrentWorkingDirectory};