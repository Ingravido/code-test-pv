let normalizerConfig

function init (dependencies) {
  ({ normalizerConfig } = dependencies)
}

function normalize (street) {
  Object.keys(normalizerConfig.street).forEach(key => {
    street = street.replace(key, normalizerConfig.street[key])
  })

  return street
}

module.exports = { init, normalize }
