import { Day } from '../day'

class Day22 extends Day {
  memo = new Map<string, number>()

  constructor () {
    super(22)
  }

  solveForPartOne (input: string): number {
    const secrets = input.split('\n').map(Number)

    let total = 0
    for (const secret of secrets) {
      let result = secret
      for (let i = 0; i < 2000; i++) {
        result = this.prune(this.mix(result * 64, result))
        result = this.prune(this.mix(Math.floor(result / 32), result))
        result = this.prune(this.mix(Math.floor(result * 2048), result))
      }
      total += result
    }

    return total
  }

  solveForPartTwo (input: string): number {
    const secrets = input.split('\n').map(Number)
    this.precomputeCache(secrets)
    const result = this.testSequence([], secrets)

    return result
  }

  mix (value: number, secret: number): number {
    return Number(BigInt(value) ^ BigInt(secret))
  }

  prune (secret: number): number {
    return secret % 16777216
  }

  testSequence (sequence: number[], secrets: number[]): number {
    if (sequence.length === 4) {
      let total = 0
      for (const secret of secrets) {
        const secretCacheKey = `${secret};${sequence.join(',')}`
        if (this.memo.has(secretCacheKey)) {
          total += this.memo.get(secretCacheKey)!
        }
      }

      return total
    }

    let lowestResult = 0

    for (let i = -9; i <= 9; i++) {
      const result = this.testSequence([...sequence, i], secrets)
      if (result > lowestResult && result !== 0) {
        lowestResult = result
      }
    }

    return lowestResult
  }

  precomputeCache (secrets: number[]): void {
    for (const secret of secrets) {
      let local = secret
      const secetLastDigit = secret % 10

      const lastDigits = [secetLastDigit]
      const differences = []

      for (let i = 0; i < 2000; i++) {
        local = this.prune(this.mix(local * 64, local))
        local = this.prune(this.mix(Math.floor(local / 32), local))
        local = this.prune(this.mix(Math.floor(local * 2048), local))

        const lastDigit = local % 10

        const prevLastDigit = lastDigits[lastDigits.length - 1]
        differences.push(lastDigit - prevLastDigit)
        lastDigits.push(lastDigit)

        // Maintain only the last 4 elements in differences
        if (differences.length > 4) {
          differences.shift()
        }

        // Cache all 4-length sequences with their next digit
        if (differences.length === 4) {
          const diffKey = `${secret};${differences.join(',')}`
          if (!this.memo.has(diffKey)) {
            this.memo.set(diffKey, lastDigit)
          }
        }
      }
    }
  }
}

export default new Day22()
