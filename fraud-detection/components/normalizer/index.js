// NORMALIZE //TODO: EXTRACT TO COMPONENT //DECORATOR? //APPLY DECORATORS CON REDUCE

function normalize (orders) {
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
}

module.exports = { normalize }
