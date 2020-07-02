const normalizerConfig = require('../../../config/normalizer/replacements.json')

function normalize (street) {
  Object.keys(normalizerConfig.street).forEach(key => {
    street = street.replace(key, normalizerConfig.street[key])
  })

  return street
}

module.exports = { normalize }