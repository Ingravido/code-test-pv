const ordersParser = require('../../../components/orders-parser')
const assert = require('assert')

describe('orders-parser', () => {
  it('should protect order parsing ignoring incomplete or weird lines', async () => {
    const result = await ordersParser.parseOrders('test/fixtures/SomeWeirdOrdersAndOneGood.txt')
    assert.ok(result)
    assert.equal(result.length, 1)
  })
})
