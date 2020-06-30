const normalizer = require('../../../components/normalizer')
const assert = require('assert')
const unroll = require('unroll')

unroll.use(it)

describe('normalizer', function () {
  unroll('Should normalize #field accordingly to #expected',
    function (done, testArgs) {
      normalizer.normalize([testArgs.inputOrder])
      assert.ok(testArgs.inputOrder)
      assert.equal(testArgs.inputOrder[testArgs.field], testArgs.expected)
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

  it('should not try to normalize fields that are not coming', function () {
    const emptyDummyOrder = {}
    normalizer.normalize([emptyDummyOrder])
    assert.ok(emptyDummyOrder)
    assert.equal(emptyDummyOrder.email, undefined)
    assert.equal(emptyDummyOrder.order, undefined)
    assert.equal(emptyDummyOrder.state, undefined)
  })
})
