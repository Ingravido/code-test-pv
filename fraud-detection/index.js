const normalizer = require('./components/normalizer')
const ordersParser = require('./components/orders-parser')
const fraudChecker = require('./components/fraud-check-engine')
const fileReader = require('./components/file-reader')

async function Check (filePath) {
  const ordersParserDeps = { fileReader }
  ordersParser.init(ordersParserDeps)

  const orders = await ordersParser.parseOrders(filePath)
  normalizer.normalize(orders)

  return fraudChecker.findFraudulentOrders(orders)
}

module.exports = { Check }
