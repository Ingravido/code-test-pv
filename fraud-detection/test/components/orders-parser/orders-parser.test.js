const ordersParser = require('../../../components/orders-parser')
const assert = require('assert')
const unroll = require('unroll')

unroll.use(it)

describe('orders-parser', () => {
  unroll('should protect order parsing ignoring incomplete or weird lines', (testArgs) => {
    // When
    const result = ordersParser.parseOrder(testArgs.inputLine)

    // Then
    assert.deepEqual(result, testArgs.expected)
  }, [
    ['inputLine', 'expected'],
    ['1,1,weird,stuff,,', false],
    ['2,2,rare,order', false],
    [',,,,,,,,,,,,', false],
    ['4,1,bugs@bunny.com,123 Sesame St.,New York,NY,10011,12345689010', {
      'orderId': 4,
      'dealId': 1,
      'email': 'bugs@bunny.com',
      'street': '123 sesame st.',
      'city': 'new york',
      'state': 'ny',
      'zipCode': '10011',
      'creditCard': '12345689010'
    }]
  ])
})
