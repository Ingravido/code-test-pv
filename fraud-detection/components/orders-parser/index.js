const fileReader = require('../file-reader')

function parseOrdersFromCSVLines (lines) {
  const orders = []

  for (let line of lines) {
    const [orderId, dealId, email, street, city, state, zipCode, creditCard] = line.split(',')

    const fieldsToCheck = [dealId, email, street, city, state, zipCode, creditCard]
    const invalidOrder = fieldsToCheck.some(field => typeof field === 'undefined' || field === '')

    if (!invalidOrder) {
      const order = {
        orderId: Number(orderId),
        dealId: Number(dealId),
        email: email.toLowerCase(),
        street: street.toLowerCase(),
        city: city.toLowerCase(),
        state: state.toLowerCase(),
        zipCode: zipCode,
        creditCard
      }

      orders.push(order)
    }
  }

  return orders
}

async function parseOrders (filePath) {
  const lines = await fileReader.readFileLinesFromFilePath(filePath)
  return parseOrdersFromCSVLines(lines)
}

module.exports = { parseOrders }
