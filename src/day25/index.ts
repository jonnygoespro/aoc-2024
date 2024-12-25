import { Day } from '../day'

type Lock = {
  heights: number[]
}

type Key = {
  heights: number[]
}

class Day25 extends Day {
  constructor () {
    super(25)
  }

  solveForPartOne (input: string): number {
    const { locks, keys } = this.parseInput(input)

    let count = 0
    for (const lock of locks) {
      for (const key of keys) {
        let valid = true
        for (let i = 0; i < lock.heights.length; i++) {
          if (lock.heights[i] + key.heights[i] > 5) {
            valid = false
            break
          }
        }

        if (valid) {
          count++
        }
      }
    }

    return count
  }

  solveForPartTwo (input: string): number {
    return input.length
  }

  parseInput (input: string): { locks: Lock[], keys: Key[] } {
    const locks: Lock[] = []
    const keys: Key[] = []

    const blocks = input.split('\n\n')
    blocks.forEach(block => {
      const heights: number[] = []
      const lines = block.split('\n')

      // lock
      if (lines[0].split('').every(char => char === '#') && lines[lines.length - 1].split('').every(char => char === '.')) {
        // count amount of # pro column and add it to the heights array
        for (let i = 0; i < lines[0].length; i++) {
          let count = 0
          for (let j = 1; j < lines.length - 1; j++) {
            if (lines[j][i] === '#') {
              count++
            }
          }
          heights.push(count)
        }

        locks.push({ heights })
      }

      if (lines[0].split('').every(char => char === '.') && lines[lines.length - 1].split('').every(char => char === '#')) {
        // count amount of # pro column and add it to the heights array
        for (let i = 0; i < lines[0].length; i++) {
          let count = 0
          for (let j = 1; j < lines.length - 1; j++) {
            if (lines[j][i] === '#') {
              count++
            }
          }
          heights.push(count)
        }

        keys.push({ heights })
      }
    })

    return { locks, keys }
  }
}

export default new Day25()
