const normalizer = require('./components/normalizer')
const ordersParser = require('./components/orders-parser')
const fraudChecker = require('./components/fraud-check-engine')

async function Check (filePath) {
  const orders = await ordersParser.parseOrders(filePath)
  normalizer.normalize(orders)

  return fraudChecker.findFraudulentOrders(orders)
}

module.exports = { Check }
