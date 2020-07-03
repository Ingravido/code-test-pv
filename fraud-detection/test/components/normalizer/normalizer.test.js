const normalizer = require('../../../components/normalizer')
const assert = require('assert')
const unroll = require('unroll')

const email = require('../../../components/normalizer/strategies/email')
const state = require('../../../components/normalizer/strategies/state')
const street = require('../../../components/normalizer/strategies/street')
const identityNormalizer = require('../../../components/normalizer/strategies/indentity')
const normalizerConfig = require('../../../config/normalizer/replacements.json')

unroll.use(it)

describe('normalizer', () => {
  unroll('Should normalize #field accordingly to #expected',
    (testArgs) => {
      // Given
      state.init({ normalizerConfig })
      street.init({ normalizerConfig })

      const normalizers = {email, state, street, identityNormalizer}
      const dependencies = { normalizers }
      normalizer.init(dependencies)

      // When
      const normalizedOrder = normalizer.normalize(testArgs.inputOrder)

      // Then
      assert.ok(normalizedOrder)
      assert.equal(normalizedOrder[testArgs.field], testArgs.expected)
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

  it('should not try to normalize missing fields in an order', () => {
    const emptyDummyOrder = {}
    normalizer.normalize([emptyDummyOrder])
    assert.ok(emptyDummyOrder)
    assert.equal(emptyDummyOrder.email, undefined)
    assert.equal(emptyDummyOrder.order, undefined)
    assert.equal(emptyDummyOrder.state, undefined)
  })
})
