function Count (input) {
  if (input < 0) {
    throw new RangeError()
  }

  let onesSum = 0
  const oneBitFoundList = []
  const binaryRepresentation = intToBinaryString(input);

  [...binaryRepresentation].forEach(getSumAndOnesPositions)

  function getSumAndOnesPositions (bitString, position) {
    const bitNumber = Number(bitString)
    onesSum += bitNumber
    storeIfOneInReversedOrder(bitNumber, position)
  }

  function storeIfOneInReversedOrder (bitNumber, position) {
    if (bitNumber === 1) {
      const reversedPosition = (binaryRepresentation.length - 1) - position
      oneBitFoundList.unshift(reversedPosition)
    }
  }

  return [onesSum, ...oneBitFoundList]
}

function intToBinaryString (input) {
  return input.toString(2)
}

module.exports = { Count }
