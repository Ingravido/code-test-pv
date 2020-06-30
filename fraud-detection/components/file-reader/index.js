const fs = require('fs')

function readFileLinesFromFilePath (filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8') // Async!! // Exists file? //Extract to CSV parser

  return fileContent.split('\n')
}

module.exports = { readFileLinesFromFilePath }
