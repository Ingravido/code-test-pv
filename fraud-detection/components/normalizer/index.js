function normalize (orders) {
  for (let order of orders) {
    // Normalize email
    normalizeEmail(order)
    normalizeStreet(order)
    normalizeState(order)
  }
}

function normalizeEmail (order) {
  if (!order.email || order.email.length === 0) {
    return
  }

  let [username, domain] = order.email.split('@')

  const atIndex = username.indexOf('+')
  const plusSignNotFound = atIndex < 0

  username = plusSignNotFound
    ? removeDotFromString(username)
    : removeDotAndDropPlusSignPart(username, atIndex)

  order.email = `${username}@${domain}`
}

function removeDotFromString (firstPartOfEmailAddr) {
  return firstPartOfEmailAddr.replace('.', '')
}

function removeDotAndDropPlusSignPart (firstPartOfEmailAddr, atIndex) {
  return removeDotFromString(firstPartOfEmailAddr).substring(0, atIndex - 1)
}

function normalizeStreet (order) {
  if (!order.street || order.street.length === 0) {
    return
  }

  order.street = order.street
    .replace('st.', 'street')
    .replace('rd.', 'road')
}

function normalizeState (order) {
  if (!order.state || order.state.length === 0) {
    return
  }

  order.state = order.state
    .replace('il', 'illinois')
    .replace('ca', 'california')
    .replace('ny', 'new york')
}

module.exports = { normalize }
