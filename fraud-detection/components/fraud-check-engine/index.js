function findFraudulentOrders (orders) {
  const fraudResults = []
  const ordersMap = new Map()

  orders.forEach(processOrder)

  function processOrder (order) {
    const emailKey = `${order.dealId}${order.email}`
    const streetKey = `${order.dealId}${order.state}${order.zipCode}${order.street}${order.city}`

    let isFraudulent = false
    triggerFraudFlagOrStoreOrder(emailKey)
    triggerFraudFlagOrStoreOrder(streetKey)

    if (isFraudulent) {
      markAndStoreFraudulentOrder(order)
    }

    function triggerFraudFlagOrStoreOrder (key) {
      const fraudCheckByEmail = ordersMap.has(key) &&
        ordersMap.get(key).creditCard !== order.creditCard

      if (fraudCheckByEmail) {
        isFraudulent = true
      } else {
        ordersMap.set(key, order)
      }
    }

    function markAndStoreFraudulentOrder (order) {
      fraudResults.push({
        isFraudulent: true,
        orderId: order.orderId
      })
    }
  }

  return fraudResults
}

module.exports = { findFraudulentOrders }
