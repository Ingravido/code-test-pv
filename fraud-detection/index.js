const normalizer = require('./components/normalizer')
const ordersParser = require('./components/orders-parser')
const fraudChecker = require('./components/fraud-check-engine')

function Check (filePath) {
  const orders = ordersParser.parseOrders(filePath)
  normalizer.normalize(orders)

  return fraudChecker.findFraudulentOrders(orders)
}

module.exports = { Check }
