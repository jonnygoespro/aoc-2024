import { Day } from '../day'

class Day1 extends Day {
  constructor () {
    super(1)
  }

  solveForPartOne (input: string): number {
    const lines = input.split('\n')
    lines.map((line) =>
      line.split(/\s+/)
    )

    const column1 = lines.map((line) => parseInt(line.split('   ')[0])).sort()
    const column2 = lines.map((line) => parseInt(line.split('   ')[1])).sort()

    // loop over column
    let result = 0
    for (let i = 0; i < column1.length; i++) {
      result += Math.abs(column1[i] - column2[i])
    }

    return result
  }

  solveForPartTwo (input: string): number {
    const lines = input.split('\n')
    lines.map((line) =>
      line.split('   ')
    )

    const column1 = lines.map((line) => parseInt(line.split('   ')[0])).sort()
    const column2 = lines.map((line) => parseInt(line.split('   ')[1])).sort()

    const set1 = new Set(column1)

    let result = 0
    for (let i = 0; i < column1.length; i++) {
      if (!set1.has(column1[i])) {
        continue
      }

      const value = column1[i]

      if (column2.includes(value)) {
        const amount = column2.filter((v) => v === value).length
        // console.log(value, amount)
        result += amount * value
      }
    }

    return result
  }
}

export default new Day1()
