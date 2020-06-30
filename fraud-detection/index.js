const fileReader = require('./components/file-reader')

function Check (filePath) {
  // READ FRAUD LINES
  let orders = []
  let fraudResults = []

  const lines = fileReader.readFileLinesFromFilePath(filePath)

  for (let line of lines) {
    // destruc items ?
    // blindar items[x]
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

  // NORMALIZE //TODO: EXTRACT TO COMPONENT //DECORATOR? //APPLY DECORATORS CON REDUCE
  for (let order of orders) {
    // Normalize email
    let aux = order.email.split('@')
    let atIndex = aux[0].indexOf('+')

    // refact in order to leave clear uniray
    // blindar aux[0]
    aux[0] = atIndex < 0 ? aux[0].replace('.', '') : aux[0].replace('.', '').substring(0, atIndex - 1)

    order.email = aux.join('@')

    // Normalize street
    order.street = order.street.replace('st.', 'street').replace('rd.', 'road')

    // Normalize state
    order.state = order.street.replace('il', 'illinois').replace('ca', 'california').replace('ny', 'new york')
  }

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
