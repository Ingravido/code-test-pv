const fs = require('fs')

async function readFileLinesFromFilePath (filePath) {
  let fileContent

  try {
    fileContent = await new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => (err ? reject(err) : resolve(data)))
    })
  } catch (error) {
    throw error
  }

  return fileContent.split('\n')
}

module.exports = { readFileLinesFromFilePath }
