import { Day } from '../day'

type Gate = {
  parameter1: string
  parameter2: string
  operator: 'AND' | 'OR' | 'XOR'
  output: string
}

type Values = Map<string, number>

class Day24 extends Day {
  constructor () {
    super(24)
  }

  solveForPartOne (input: string): number {
    const { gates, values } = this.parseInput(input)

    // execute gate if gate parameters are in values
    while (gates.length > 0) {
      for (let i = 0; i < gates.length; i++) {
        const gate = gates[i]

        if (values.has(gate.parameter1) && values.has(gate.parameter2)) {
          this.executeGate(gate, values)
          gates.splice(i, 1)
          i--
        }
      }
    }

    return this.calculateResult(values)
  }

  solveForPartTwo (input: string): number {
    return input.length
  }

  parseInput (input: string): { gates: Gate[], values: Values } {
    const values: Values = new Map()
    const gates: Gate[] = []

    const [valuesBlock, gatesBlock] = input.split('\n\n')
    valuesBlock.split('\n').forEach(value => {
      const [key, number] = value.split(': ')
      values.set(key, parseInt(number))
    })

    gatesBlock.split('\n').forEach(gate => {
      const [parameters, output] = gate.split(' -> ')
      const [parameter1, operator, parameter2] = parameters.split(' ')
      gates.push({
        parameter1,
        parameter2,
        operator: operator as 'AND' | 'OR' | 'XOR',
        output
      })
    })

    return { gates, values }
  }

  executeGate (gate: Gate, values: Values): void {
    if (!values.has(gate.parameter1) || !values.has(gate.parameter2)) {
      throw new Error('Value not in map yet')
    }

    const value1 = values.get(gate.parameter1)
    const value2 = values.get(gate.parameter2)

    let result: 0 | 1
    switch (gate.operator) {
      case 'AND':
        result = (value1 === 1) && (value2 === 1) ? 1 : 0
        break
      case 'OR':
        result = (value1 === 1) || (value2 === 1) ? 1 : 0
        break
      case 'XOR':
        result = ((value1 === 0) && (value2 === 1)) || ((value1 === 1) && (value2 === 0)) ? 1 : 0
        break
    }

    values.set(gate.output, result)
  }

  calculateResult (values: Values): number {
    const keys = Array.from(values.keys()).filter(key => key.startsWith('z')).sort()

    let result = 0
    for (let i = 0; i < keys.length; i++) {
      if (values.get(keys[i]) === 1) {
        result += 2 ** i
      }
    }

    return result
  }
}

export default new Day24()
