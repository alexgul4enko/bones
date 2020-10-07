const path = require('path')
const fs = require('fs')

const packages = fs.readdirSync('./packages')

const currentPackage = process.argv.slice(-1)[0]
if(!packages.includes(currentPackage)) {
  throw 'testing all packages is not currently supported'
}

module.exports = {
  rootDir: `./packages/${currentPackage}`,
  testRegex: '/.*\\.spec.(js|jsx)$',
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  setupFilesAfterEnv: [path.resolve('./test-setup.js')],
  modulePaths: ['<rootDir>/node_modules'],
}
