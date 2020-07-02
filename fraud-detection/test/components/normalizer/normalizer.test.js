const normalizer = require('../../../components/normalizer')
const assert = require('assert')
const unroll = require('unroll')

const email = require('../../../components/normalizer/strategies/email')
const state = require('../../../components/normalizer/strategies/state')
const street = require('../../../components/normalizer/strategies/street')
const identityNormalizer = require('../../../components/normalizer/strategies/indentity')

unroll.use(it)

describe('normalizer', () => {
  unroll('Should normalize #field accordingly to #expected',
    (done, testArgs) => {
      normalizer.init({normalizers: { email, state, street, identityNormalizer }})
      const normalizedOrder = normalizer.normalize([testArgs.inputOrder])
      assert.ok(normalizedOrder)
      assert.equal(normalizedOrder[0][testArgs.field], testArgs.expected)
      done()
    },
    [
      ['field', 'inputOrder', 'expected'],
      [ 'email', {
        email: 'john.doe+extra@domain.com',
        street: '',
        state: ''
      }, 'johndoe@domain.com' ],
      [ 'street', {
        email: '',
        street: 'st.',
        state: ''
      }, 'street' ],
      [ 'state', {
        email: '',
        street: '',
        state: 'il'
      }, 'illinois' ],
      [ 'state', {
        email: '',
        street: '',
        state: 'ca'
      }, 'california' ],

      [ 'state', {
        email: '',
        street: '',
        state: 'ny'
      }, 'new york' ]
    ]
  )

  it('should not try to normalize fields that are not coming in order', () => {
    const emptyDummyOrder = {}
    normalizer.normalize([emptyDummyOrder])
    assert.ok(emptyDummyOrder)
    assert.equal(emptyDummyOrder.email, undefined)
    assert.equal(emptyDummyOrder.order, undefined)
    assert.equal(emptyDummyOrder.state, undefined)
  })
})
