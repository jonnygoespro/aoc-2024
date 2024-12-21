import { Day } from '../day'

type Position = {
  x: number
  y: number
}

const keypad: string[][] = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['', '0', 'A']
]

const robopad: string[][] = [
  ['', '^', 'A'],
  ['<', 'v', '>']
]

class Day21 extends Day {
  private memo: Map<string, string> = new Map()

  constructor () {
    super(21)
  }

  solveForPartOne (input: string): number {
    const codes = input.split('\n')

    let result = 0
    for (const code of codes) {
      const numericPart = parseInt(code.slice(0, 3))
      const roboResult = this.secondRobot(this.secondRobot(this.firstRobot(code)))
      result += numericPart * roboResult.length
    }

    return result
  }

  solveForPartTwo (input: string): number {
    const codes = input.split('\n')

    let result = 0
    for (const code of codes) {
      const numericPart = parseInt(code.slice(0, 3))

      let currentCode = this.firstRobot(code)
      for (let i = 0; i < 5; i++) {
        currentCode = this.secondRobot(currentCode)
        console.log(i, currentCode.length)
      }

      result += numericPart * currentCode.length
    }

    return result
  }

  firstRobot (code: string): string {
    const charArray = code.split('')
    const targetArray: string[] = []

    const currentPosition = {
      x: 2,
      y: 3
    }

    for (const target of charArray) {
      const targetPosition = this.findPosition(target, keypad)

      while (currentPosition.x !== targetPosition.x || currentPosition.y !== targetPosition.y) {
        if (currentPosition.x > targetPosition.x && !(targetPosition.x === 0 && currentPosition.y === 3)) {
          while (currentPosition.x !== targetPosition.x) {
            currentPosition.x--
            targetArray.push('<')
          }
        } else if (currentPosition.y > targetPosition.y) {
          while (currentPosition.y !== targetPosition.y) {
            currentPosition.y--
            targetArray.push('^')
          }
        } else if (currentPosition.y < targetPosition.y && !(targetPosition.y === 3 && currentPosition.x === 0)) {
          while (currentPosition.y !== targetPosition.y) {
            currentPosition.y++
            targetArray.push('v')
          }
        } else if (currentPosition.x < targetPosition.x) {
          while (currentPosition.x !== targetPosition.x) {
            currentPosition.x++
            targetArray.push('>')
          }
        }
      }

      targetArray.push('A')
    }

    return targetArray.join('')
  }

  secondRobot (code: string): string {
    const charArray = code.split('')
    const targetArray: string[] = []

    const currentPosition = {
      x: 2,
      y: 0
    }

    for (const target of charArray) {
      const targetPosition = this.findPosition(target, robopad)

      while (currentPosition.x !== targetPosition.x || currentPosition.y !== targetPosition.y) {
        if (currentPosition.x > targetPosition.x && !(targetPosition.x === 0 && currentPosition.y === 0)) {
          while (currentPosition.x !== targetPosition.x) {
            currentPosition.x--
            targetArray.push('<')
          }
        } else if (currentPosition.y > targetPosition.y && !(targetPosition.y === 0 && currentPosition.x === 0)) {
          while (currentPosition.y !== targetPosition.y) {
            currentPosition.y--
            targetArray.push('^')
          }
        } else if (currentPosition.y < targetPosition.y) {
          while (currentPosition.y !== targetPosition.y) {
            currentPosition.y++
            targetArray.push('v')
          }
        } else if (currentPosition.x < targetPosition.x) {
          while (currentPosition.x !== targetPosition.x) {
            currentPosition.x++
            targetArray.push('>')
          }
        }
      }

      targetArray.push('A')
    }

    return targetArray.join('')
  }

  findPosition (target: string, array: string[][]): Position {
    for (let y = 0; y < array.length; y++) {
      for (let x = 0; x < array[y].length; x++) {
        if (array[y][x] === target) {
          return {
            x,
            y
          }
        }
      }
    }

    return { x: -1, y: -1 }
  }
}

export default new Day21()
