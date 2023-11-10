const path = require('path');

function makePath(file) {
  return path.join(path.resolve(process.cwd()), file);
}

module.exports = makePath;
