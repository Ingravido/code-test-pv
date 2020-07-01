function normalize (street) {
  if (!street || street.length === 0) {
    return
  }

  return street
    .replace('st.', 'street')
    .replace('rd.', 'road')
}

module.exports = { normalize }