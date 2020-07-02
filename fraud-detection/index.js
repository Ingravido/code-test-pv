// Base modules
const normalizer = require('./components/normalizer')
const ordersParser = require('./components/orders-parser')
const fraudChecker = require('./components/fraud-check-engine')

// Normalizer strategies
const email = require('./components/normalizer/strategies/email')
const state = require('./components/normalizer/strategies/state')
const street = require('./components/normalizer/strategies/street')
const identityNormalizer = require('./components/normalizer/strategies/indentity')

// Libs
const fs = require('fs')
const fileReader = require('./components/file-reader')

// Config
const baseConfig = require('./config/base-config.json')

function bootstrap () {
  fileReader.init({ fs })

  const normalizers = {email, state, street, identityNormalizer}
  normalizer.init({ normalizers })
}

// Entry point
async function Check () {
  bootstrap()

  const lines = await fileReader.readFileLinesFromFilePath(baseConfig.ordersFilePath)
  const orders = ordersParser.parseOrders(lines)
  const parsedOrders = normalizer.normalize(orders)
  const fraudOrders = fraudChecker.findFraudulentOrders(parsedOrders)

  return fraudOrders
}

module.exports = { Check }
