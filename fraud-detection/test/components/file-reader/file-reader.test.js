const fileReader = require('../../../components/file-reader')
const assert = require('assert')

function isAnError (error) {
  return (error instanceof Error)
}

describe('file-reader', () => {
  it('Should return an Error if provided file path is not found', async function () {
    assert.rejects(async () => fileReader.readFileLinesFromFilePath('/not/existent/file/path'), isAnError)
  })
})
