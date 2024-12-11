import { Day } from '../day'
import { parseLineOfNumbers, memo } from '../utils'

class Day11 extends Day {
  private readonly memoizedBlinkRecursive: (num: number, result: number, depth: number) => number

  constructor () {
    super(11)
    this.memoizedBlinkRecursive = memo(this.blinkRecursive.bind(this))
  }

  solveForPartOne (input: string): number {
    const numbers = parseLineOfNumbers(input)

    let current = numbers
    for (let i = 0; i < 25; i++) {
      current = current.flatMap((num: number) => this.blink(num))
    }

    return current.length
  }

  solveForPartTwo (input: string): number {
    const numbers = parseLineOfNumbers(input)

    let result = 0
    for (const num of numbers) {
      result += this.memoizedBlinkRecursive(num, 0, 75)
    }

    return result
  }

  blink (num: number): number[] {
    const amountDigits = num.toString().length
    if (num === 0) {
      return [1]
    } else if ((amountDigits % 2) === 0) {
      return [parseInt(num.toString().slice(0, amountDigits / 2)), parseInt(num.toString().slice(amountDigits / 2, num.toString().length))]
    } else {
      return [num * 2024]
    }
  }

  blinkRecursive (num: number, result: number, depth: number): number {
    if (depth === 1) {
      return this.calculateAmountOfStonesAfterBlink(num)
    }

    const newNumbers = this.blink(num)

    result = this.memoizedBlinkRecursive(newNumbers[0], result, depth - 1)
    if (newNumbers.length === 2) {
      result += this.memoizedBlinkRecursive(newNumbers[1], result, depth - 1)
    }

    return result
  }

  calculateAmountOfStonesAfterBlink (num: number): number {
    const amountDigits = num.toString().length
    if (num === 0) {
      return 1
    } else if ((amountDigits % 2) === 0) {
      return 2
    } else {
      return 1
    }
  }
}

export default new Day11()
