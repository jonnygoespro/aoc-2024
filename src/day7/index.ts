import { Day } from '../day'

type Operation = {
    result: number,
    parameters: number[]
}

class Day7 extends Day {
  constructor () {
    super(7)
  }

  solveForPartOne (input: string): string {
    const operations = this.parseInput(input)

    const correctOperations = operations.filter(operation => this.multiplyAddRecursive(operation, 1, operation.parameters[0]))
    const result = correctOperations.reduce((acc, operation) => acc + operation.result, 0)
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const operations = this.parseInput(input)

    const correctOperations = operations.filter(operation => this.multiplyAddOrRecursive(operation, 1, operation.parameters[0]))
    const result = correctOperations.reduce((acc, operation) => acc + operation.result, 0)
    return result.toString()
  }

  private parseInput (input: string): Operation[] {
    return input.split('\n').map(line => {
      const [result, parameters] = line.split(': ')
      return {
        result: parseInt(result),
        parameters: parameters.split(' ').map(param => parseInt(param))
      }
    })
  }

  private multiplyAddRecursive (operation: Operation, index: number, result: number): boolean {
    if (result === operation.result) {
      return true
    }

    if (index >= operation.parameters.length) {
      return false
    }

    let isValid = false
    isValid = isValid || this.multiplyAddRecursive(operation, index + 1, result + operation.parameters[index])
    isValid = isValid || this.multiplyAddRecursive(operation, index + 1, result * operation.parameters[index])
    return isValid
  }

  private multiplyAddOrRecursive (operation: Operation, index: number, result: number): boolean {
    if (index === operation.parameters.length && result === operation.result) {
      return true
    }

    if (index >= operation.parameters.length) {
      return false
    }

    let isValid = false
    isValid = isValid || this.multiplyAddOrRecursive(operation, index + 1, result + operation.parameters[index])
    isValid = isValid || this.multiplyAddOrRecursive(operation, index + 1, result * operation.parameters[index])
    isValid = isValid || this.multiplyAddOrRecursive(operation, index + 1, parseInt(`${result}${operation.parameters[index]}`))
    return isValid
  }
}

export default new Day7()
