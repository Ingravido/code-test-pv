const normalizerConfig = require('../../../config/normalizer/replacements.json')

function normalize (state) {
  Object.keys(normalizerConfig.state).forEach(key => {
    state = state.replace(key, normalizerConfig.state[key])
  })

  return state
}

module.exports = { normalize }
