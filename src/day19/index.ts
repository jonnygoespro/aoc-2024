import { Day } from '../day'

class Day19 extends Day {
  memo: Record<number, boolean> = {}

  constructor () {
    super(19)
  }

  solveForPartOne (input: string): number {
    const { patterns, towels } = this.parseInput(input)

    const filteredTowels = towels.filter(towel => this.isPossibleTowel(towel, patterns))
    return filteredTowels.length
  }

  solveForPartTwo (input: string): number {
    const { patterns, towels } = this.parseInput(input)

    const possibleTowels = towels.reduce((acc, towel) => acc + this.amountPossibleTowels(towel, patterns), 0)
    return possibleTowels
  }

  parseInput (input: string) {
    const [patterns, towels] = input.split('\n\n')

    return {
      patterns: patterns.split(', '),
      towels: towels.split('\n')
    }
  }

  isPossibleTowel (towel: string, patterns: string[], index: number = 0, memo: Record<number, boolean> = {}): boolean {
    if (index === towel.length) return true
    if (index in memo) return memo[index]

    const matchingPatterns = patterns.filter(pattern => towel.slice(index).startsWith(pattern))

    for (const pattern of matchingPatterns) {
      if (this.isPossibleTowel(towel, patterns, index + pattern.length, memo)) {
        return (memo[index] = true)
      }
    }

    return (memo[index] = false)
  }

  amountPossibleTowels (towel: string, patterns: string[], index: number = 0, memo: Record<number, number> = {}): number {
    if (index === towel.length) return 1
    if (index in memo) return memo[index]

    let count = 0
    const matchingPatterns = patterns.filter(pattern => towel.slice(index).startsWith(pattern))
    for (const pattern of matchingPatterns) {
      count += this.amountPossibleTowels(towel, patterns, index + pattern.length, memo)
    }

    memo[index] = count
    return count
  }
}

export default new Day19()
