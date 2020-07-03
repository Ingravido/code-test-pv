let normalizers

function init (dependencies) {
  ({ normalizers } = dependencies)
}

function normalize (order) {
  return Object.keys(order).reduce((acc, property) => {
    const normalizer = getNormalizer(property)

    const isFieldEmpty = !order[property] || order[property].length === 0
    acc[property] = isFieldEmpty ? order[property] : normalizer.normalize(order[property])

    return acc
  }, {})
}

function getNormalizer (field) {
  return normalizers[field] ? normalizers[field] : normalizers.identityNormalizer
}

module.exports = { init, normalize }
