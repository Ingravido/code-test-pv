const assert = require('assert')
const fileReader = require('../../../components/file-reader')
const fs = require('fs')

function isAnError (error) {
  return (error instanceof Error)
}

describe('file-reader', () => {
  it('Should return an Error if provided file path is not found', async function () {
    // Given
    fileReader.init({ fs })

    // Then
    assert.rejects(async () => fileReader.readFileLinesFromFilePath('/not/existent/file/path'), isAnError)
  })
})
