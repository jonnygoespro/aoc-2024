import { Day } from '../day'

class Day2 extends Day {
  constructor () {
    super(2)
  }

  solveForPartOne (input: string): string {
    const reports = input.split('\n')

    let isSafe = 0
    for (let i = 0; i < reports.length; i++) {
      const localReport = reports[i].split(' ').map(Number)

      const safe = checkSafety2(localReport)
      if (safe) {
        isSafe++
      }
    }

    return isSafe.toString()
  }

  // 426 wrong
  solveForPartTwo (input: string): string {
    const reports = input.split('\n')

    let isSafe = 0
    for (let i = 0; i < reports.length; i++) {
      const wholeReport = reports[i].split(' ').map(Number)
      const safetyWhole = checkSafety2(wholeReport)
      if (safetyWhole) {
        isSafe++
        continue
      }

      // fake the whole thing
      let localSafeCount = 0
      for (let j = 0; j < wholeReport.length; j++) {
        const localReport = reports[i].split(' ').map(Number)
        localReport.splice(j, 1)

        const safe = checkSafety2(localReport)
        if (safe) {
          localSafeCount++
        }
      }

      if (localSafeCount >= 1) {
        isSafe++
      }
    }

    return isSafe.toString()
  }
}

export default new Day2()

const checkSafety2 = (report: number[]) => {
  let isIncreasing = true
  for (let i = 0; i < report.length - 2; i++) {
    if (report[i] > report[i + 1]) {
      isIncreasing = false
    }
  }

  let isDecreasing = true
  for (let i = 0; i < report.length - 2; i++) {
    if (report[i] < report[i + 1]) {
      isDecreasing = false
    }
  }

  // if it is neither increasing nor decreasing, it is not safe
  if (!isIncreasing && !isDecreasing) {
    return false
  }

  // if it is both i made an error -> could happen in part 2
  if (isIncreasing && isDecreasing) {
    // throw new Error('This should not happen')
    return false
  }

  // if it is increasing, check for the difference
  if (isIncreasing) {
    for (let i = 0; i < report.length - 1; i++) {
      const difference = report[i + 1] - report[i]
      if (difference > 3 || difference < 1) {
        return false
      }
    }

    return true
  }

  if (isDecreasing) {
    for (let i = 0; i < report.length - 1; i++) {
      const difference = report[i + 1] - report[i]
      if (difference < -3 || difference > -1) {
        return false
      }
    }

    return true
  }
}
