const fileReader = require('./components/file-reader')
const normalizer = require('./components/normalizer')

function Check (filePath) {
  // READ FRAUD LINES
  const orders = parseOrdersFromFilePath(filePath)
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

function parseOrdersFromCSVLines (lines) {
  const orders = []

  for (let line of lines) {
    // destruc items ?
    // enforce items[x]
    let items = line.split(',')
    let order = {
      orderId: Number(items[0]),
      dealId: Number(items[1]),
      email: items[2].toLowerCase(),
      street: items[3].toLowerCase(),
      city: items[4].toLowerCase(),
      state: items[5].toLowerCase(),
      zipCode: items[6],
      creditCard: items[7]
    }
    orders.push(order)
  }

  return orders
}

function parseOrdersFromFilePath (filePath) {
  const lines = fileReader.readFileLinesFromFilePath(filePath)
  return parseOrdersFromCSVLines(lines)
}

module.exports = { Check }
