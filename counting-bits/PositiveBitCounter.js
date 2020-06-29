function Count (input) {
  if (input < 0) {
    throw new RangeError()
  }

  let onesSum = 0
  const oneBitFoundList = []
  const binaryRepresentation = intToBinaryString(input)

  const binaryRepresentationArr = [...binaryRepresentation]
  let position = binaryRepresentationArr.length - 1

  do {
    const bitString = binaryRepresentationArr[position]
    const bitNumber = Number(bitString)
    onesSum += bitNumber
    if (bitNumber === 1) {
      const reversedPosition = (binaryRepresentation.length - 1) - position
      oneBitFoundList.push(reversedPosition)
    }
  } while (--position >= 0)

  return [onesSum, ...oneBitFoundList]
}

function intToBinaryString (input) {
  return input.toString(2)
}

module.exports = { Count }


