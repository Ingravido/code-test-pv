function normalize (state) {
  return state
    .replace('il', 'illinois')
    .replace('ca', 'california')
    .replace('ny', 'new york')
}

module.exports = { normalize }