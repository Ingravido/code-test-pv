const PositiveBitCounter = require('../PositiveBitCounter')

const RUNS_NUMBER = 500

function runBenchmark () {
  const results = runManyTimesTimes()

  const sum = results.reduce((acc, curr) => acc + curr[1], 0)
  const avg = (sum / results.length) || 0

  showResults(avg)
}

function runManyTimesTimes () {
  let i = 0
  const results = []

  do {
    results.push(measureExecution())
  } while (++i < RUNS_NUMBER)

  return results
}

function measureExecution () {
  const hrstart = process.hrtime()

  runSystemUnderBenchmark()

  return process.hrtime(hrstart)
}

function runSystemUnderBenchmark () {
  PositiveBitCounter.Count(161243242)
}

function showResults (hrend) {
  console.info('Execution time: %dms', hrend / 1000000)
}

runBenchmark()
