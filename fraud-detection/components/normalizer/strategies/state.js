let normalizerConfig

function init (dependencies) {
  ({ normalizerConfig } = dependencies)
}

function normalize (state) {
  Object.keys(normalizerConfig.state).forEach(key => {
    state = state.replace(key, normalizerConfig.state[key])
  })

  return state
}

module.exports = { init, normalize }
