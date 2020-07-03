const FraudRadar = require('../index.js')
const path = require('path')
const assert = require('assert')
const baseConfig = require('../config/base-config.json')

describe('Fraud Radar', function () {
  it('Should process the one line file', async () => {
    // Given
    baseConfig.ordersFilePath = path.join(__dirname, 'fixtures', 'OneLineFile.txt')

    // When
    const result = await FraudRadar.Check()

    // Then
    assert.ok(result)
    assert.equal(result.length, 0)
  })

  it('Should process the two line file in which the second is fraudulent', async () => {
    // Given
    baseConfig.ordersFilePath = path.join(__dirname, 'fixtures', 'TwoLines_FraudulentSecond.txt')

    // When
    const result = await FraudRadar.Check()

    // Then
    assert.ok(result)
    assert.equal(result.length, 1)
    assert.equal(result[0].isFraudulent, true)
    assert.equal(result[0].orderId, 2)
  })

  it('Should process the three line file in which the second is fraudulent', async () => {
    // Given
    baseConfig.ordersFilePath = path.join(__dirname, 'fixtures', 'ThreeLines_FraudulentSecond.txt')

    // When
    const result = await FraudRadar.Check()

    // Then
    assert.ok(result)
    assert.equal(result.length, 1)
    assert.equal(result[0].isFraudulent, true)
    assert.equal(result[0].orderId, 2)
  })

  it('Should process the four line file in which more than one order is fraudulent', async () => {
    // Given
    baseConfig.ordersFilePath = path.join(__dirname, 'fixtures', 'FourLines_MoreThanOneFraudulent.txt')

    // When
    const result = await FraudRadar.Check()

    // Then
    assert.ok(result)
    assert.equal(result.length, 2)
  })

  it('Should process only correct and complete orders', async () => {
    // Given
    baseConfig.ordersFilePath = path.join(__dirname, 'fixtures', 'SomeWeirdOrdersAndOneFraudulent.txt')

    // When
    const result = await FraudRadar.Check()

    // Then
    assert.ok(result)
    assert.equal(result.length, 1)
  })
})
