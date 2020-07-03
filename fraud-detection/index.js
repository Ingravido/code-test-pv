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
const normalizerConfig = require('./config/normalizer/replacements.json')

function bootstrap () {
  fileReader.init({ fs })
  state.init({ normalizerConfig })
  street.init({ normalizerConfig })

  const normalizers = {email, state, street, identityNormalizer}
  normalizer.init({ normalizers })
}

// Entry point
async function Check () {
  bootstrap()

  const orderLines = await fileReader.readFileLinesFromFilePath(baseConfig.ordersFilePath)

  const normalizedCorrectOrders = []
  orderLines.forEach(orderLine => {
    const parsedOrder = ordersParser.parseOrder(orderLine)
    if (parsedOrder) {
      normalizedCorrectOrders.push(normalizer.normalize(parsedOrder))
    }
  })

  return fraudChecker.findFraudulentOrders(normalizedCorrectOrders)
}

module.exports = { Check }
