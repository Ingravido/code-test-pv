const normalizer = require('./components/normalizer')
const ordersParser = require('./components/orders-parser')

function Check (filePath) {
  // READ FRAUD LINES
  const orders = ordersParser.parseOrders(filePath)
  normalizer.normalize(orders)
  let fraudResults = []

  // CHECK FRAUD //TODO: EXTRACT TO COMPONENT
  for (let i = 0; i < orders.length; i++) {
    let current = orders[i]
    let isFraudulent = false

    for (let j = i + 1; j < orders.length; j++) { // forEach
      isFraudulent = false
      if (current.dealId === orders[j].dealId &&
        current.email === orders[j].email &&
        current.creditCard !== orders[j].creditCard) {
        isFraudulent = true
      }

      if (current.dealId === orders[j].dealId &&
        current.state === orders[j].state &&
        current.zipCode === orders[j].zipCode &&
        current.street === orders[j].street &&
        current.city === orders[j].city &&
        current.creditCard !== orders[j].creditCard) {
        isFraudulent = true
      }

      if (isFraudulent) {
        fraudResults.push({
          isFraudulent: true,
          orderId: orders[j].orderId
        })
      }
    }
  }

  return fraudResults
}

module.exports = { Check }
