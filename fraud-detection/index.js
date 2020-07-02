// Base modules
const normalizer = require('./components/normalizer')
const ordersParser = require('./components/orders-parser')
const fraudChecker = require('./components/fraud-check-engine')
const fileReader = require('./components/file-reader')

// Normalizer strategies
const email = require('./components/normalizer/strategies/email')
const state = require('./components/normalizer/strategies/state')
const street = require('./components/normalizer/strategies/street')
const identityNormalizer = require('./components/normalizer/strategies/indentity')

// Libs
const fs = require('fs')

// Config
const baseConfig = require('./config/base-config.json')

function bootstrap () {
  fileReader.init({ fs })

  const ordersParserDeps = { fileReader }
  ordersParser.init(ordersParserDeps)

  const normalizerDeps = {email, state, street, identityNormalizer}
  normalizer.init(normalizerDeps)
}

// Entry point
async function Check () {
  bootstrap()

  const orders = await ordersParser.parseOrders(baseConfig.ordersFilePath)
  normalizer.normalize(orders)

  return fraudChecker.findFraudulentOrders(orders)
}

module.exports = { Check }
