function parseOrder (line) {
  const [orderId, dealId, email, street, city, state, zipCode, creditCard] = line.split(',')

  const fieldsToCheck = [dealId, email, street, city, state, zipCode, creditCard]
  const invalidOrder = fieldsToCheck.some(field => typeof field === 'undefined' || field === '')

  return invalidOrder ? false : {
    orderId: Number(orderId),
    dealId: Number(dealId),
    email: email.toLowerCase(),
    street: street.toLowerCase(),
    city: city.toLowerCase(),
    state: state.toLowerCase(),
    zipCode: zipCode,
    creditCard
  }
}

module.exports = { parseOrder }
