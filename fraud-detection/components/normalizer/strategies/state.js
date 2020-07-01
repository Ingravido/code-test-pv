function normalize (state) {
  if (!state || state.length === 0) {
    return
  }

  return state
    .replace('il', 'illinois')
    .replace('ca', 'california')
    .replace('ny', 'new york')
}

module.exports = { normalize }