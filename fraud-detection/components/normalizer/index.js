const email = require('./strategies/email')
const state = require('./strategies/state')
const street = require('./strategies/street')
const identityNormalizer = require('./strategies/indentity')

const normalizers = {email, state, street}

function normalize (orders) {
  for (const order of orders) {
    normalizeFields(order)
  }
}

function normalizeFields (order) {
  Object.keys(order).forEach(property => {
    const normalizer = getNormalizer(property)
    order[property] = normalizer.normalize(order[property])
  })
}

function getNormalizer (field) {
  return normalizers[field] || identityNormalizer
}

module.exports = { normalize }
