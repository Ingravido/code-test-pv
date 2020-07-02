const FraudRadar = require('../index.js')
const path = require('path')
const assert = require('assert')

describe('Fraud Radar', function () {
  it('Should process the one line file', async () => {
    const result = await FraudRadar.Check(path.join(__dirname, 'fixtures', 'OneLineFile.txt'))
    assert.ok(result)
    assert.equal(result.length, 0)
  })

  it('Should process the two line file in which the second is fraudulent', async () => {
    const result = await FraudRadar.Check(path.join(__dirname, 'fixtures', 'TwoLines_FraudulentSecond.txt'))
    assert.ok(result)
    assert.equal(result.length, 1)
    assert.equal(result[0].isFraudulent, true)
    assert.equal(result[0].orderId, 2)
  })

  it('Should process the three line file in which the second is fraudulent', async () => {
    const result = await FraudRadar.Check(path.join(__dirname, 'fixtures', 'ThreeLines_FraudulentSecond.txt'))
    assert.ok(result)
    assert.equal(result.length, 1)
    assert.equal(result[0].isFraudulent, true)
    assert.equal(result[0].orderId, 2)
  })

  it('Should process the four line file in which more than one order is fraudulent', async () => {
    const result = await FraudRadar.Check(path.join(__dirname, 'fixtures', 'FourLines_MoreThanOneFraudulent.txt'))
    assert.ok(result)
    assert.equal(result.length, 2)
  })
})
