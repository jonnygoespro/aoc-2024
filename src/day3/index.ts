import { Day } from '../day'

class Day3 extends Day {
  constructor () {
    super(3)
  }

  solveForPartOne (input: string): string {
    const multipliers = input.match(/mul\(([1-9][0-9][0-9]|[1-9][0-9]|[0-9]),([1-9][0-9][0-9]|[1-9][0-9]|[0-9])\)/g)
    const numbers = multipliers?.map((multiplier) => multiplier.replace('mul(', '').replace(')', ''))
    const result = numbers?.reduce((acc, curr) => {
      const [a, b] = curr.split(',')
      return acc + parseInt(a) * parseInt(b)
    }, 0)

    return result?.toString() ?? '0'
  }

  solveForPartTwo (input: string): string {
    const multipliers = input.match(/(mul\(([1-9][0-9][0-9]|[1-9][0-9]|[0-9]),([1-9][0-9][0-9]|[1-9][0-9]|[0-9])\))|(do\(\))|(don't\(\))/g)

    if (!multipliers) {
      return '0'
    }

    let enabled = true
    let result = 0
    for (let i = 0; i < multipliers?.length; i++) {
      const multiplier = multipliers[i]
      if (multiplier === 'do()') {
        enabled = true
        continue
      }

      if (multiplier === 'don\'t()') {
        enabled = false
        continue
      }

      if (enabled) {
        const [a, b] = multiplier.replace('mul(', '').replace(')', '').split(',')
        result += parseInt(a) * parseInt(b)
      }
    }
    return result.toString()
  }
}

export default new Day3()
