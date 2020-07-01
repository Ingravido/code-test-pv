function normalize (email) {
  let [username, domain] = email.split('@')

  const atIndex = username.indexOf('+')
  const plusSignNotFound = atIndex < 0

  username = plusSignNotFound
    ? removeDotFromString(username)
    : removeDotAndDropPlusSignPart(username, atIndex)

  return `${username}@${domain}`
}

function removeDotFromString (firstPartOfEmailAddr) {
  return firstPartOfEmailAddr.replace('.', '')
}

function removeDotAndDropPlusSignPart (firstPartOfEmailAddr, atIndex) {
  return removeDotFromString(firstPartOfEmailAddr).substring(0, atIndex - 1)
}

module.exports = { normalize }