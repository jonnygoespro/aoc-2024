import { Day } from '../day'

class Day5 extends Day {
  constructor () {
    super(5)
  }

  solveForPartOne (input: string): number {
    const { rules, updates } = this.parseInput(input)

    const correctUpdates = updates.filter(update => {
      return rules.every(rule => {
        if (!update.includes(rule[0]) || !update.includes(rule[1])) {
          return true
        }

        return update.indexOf(rule[0]) < update.indexOf(rule[1])
      })
    })

    const result = correctUpdates.reduce((acc, update) => {
      return acc + update[Math.floor(update.length / 2)]
    }, 0)

    return result
  }

  solveForPartTwo (input: string): number {
    const { rules, updates } = this.parseInput(input)

    const incorrectUpdates = updates.filter(update => {
      return !rules.every(rule => {
        if (!update.includes(rule[0]) || !update.includes(rule[1])) {
          return true
        }

        return update.indexOf(rule[0]) < update.indexOf(rule[1])
      })
    })

    const resolvedUpdates = incorrectUpdates.map(incorrectUpdate => {
      let i = 0
      while (i < incorrectUpdate.length - 1) {
        let j = i + 1

        while (j < incorrectUpdate.length) {
          const localRules: number[][] = rules.filter(rule => rule.includes(incorrectUpdate[i]) && rule.includes(incorrectUpdate[j]))
          localRules?.forEach(rule => {
            if (incorrectUpdate.indexOf(rule[0]) > incorrectUpdate.indexOf(rule[1])) {
              const temp = incorrectUpdate[i]
              incorrectUpdate[i] = incorrectUpdate[j]
              incorrectUpdate[j] = temp
            }
          })
          j++
        }

        i++
      }

      return incorrectUpdate
    })

    const result = resolvedUpdates.reduce((acc, update) => {
      return acc + update[Math.floor(update.length / 2)]
    }, 0)

    return result
  }

  parseInput (input: string) {
    const [rulesString, updatesString] = input.split('\n\n')

    const rules = rulesString.split('\n').map(rule => rule.split('|').map(num => parseInt(num)))
    const updates = updatesString.split('\n').map(update => update.split(',').map(num => parseInt(num)))

    return {
      rules: rules,
      updates: updates
    }
  }
}

export default new Day5()
