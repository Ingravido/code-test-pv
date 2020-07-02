const sinon = require('sinon')
const ordersParser = require('../../../components/orders-parser')
const assert = require('assert')

const incompleteOrdersOneGood = [
  '1,1,weird,stuff,,',
  '2,2,rare,order',
  ',,,,,,,,,,,,',
  '',
  '4,1,bugs@bunny.com,123 Sesame St.,New York,NY,10011,12345689010'
]

describe('orders-parser', () => {
  it('should protect order parsing ignoring incomplete or weird lines', async () => {
    // Given
    const readFileLinesFromFilePath = sinon.stub().returns(incompleteOrdersOneGood)
    const fileReaderMock = {readFileLinesFromFilePath}
    ordersParser.init({fileReader: fileReaderMock})

    // When
    const result = await ordersParser.parseOrders()

    // Then
    assert.ok(result)
    assert.equal(result.length, 1)
  })
})
