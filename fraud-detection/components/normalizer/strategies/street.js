function normalize (street) {
  return street
    .replace('st.', 'street')
    .replace('rd.', 'road')
}

module.exports = { normalize }