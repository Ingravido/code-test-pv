const fileReader = require('../file-reader')

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

function parseOrders (filePath) {
  const lines = fileReader.readFileLinesFromFilePath(filePath)
  return parseOrdersFromCSVLines(lines)
}

module.exports = { parseOrders }