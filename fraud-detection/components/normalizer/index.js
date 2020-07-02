let normalizers

function init (dependencies) {
  ({ normalizers } = dependencies);
}

function normalize (orders) {
  const normalizedOrders = []

  for (const order of orders) {
    const normalizedOrder = normalizeFields(order)
    normalizedOrders.push(normalizedOrder)
  }

  return normalizedOrders
}

function normalizeFields (order) {
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
