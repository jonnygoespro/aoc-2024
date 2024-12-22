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
  memo: Map<string, number> = new Map()

  constructor () {
    super(21)
  }

  solveForPartOne (input: string): number {
    const codes = input.split('\n')

    let result = 0
    for (const code of codes) {
      const numericPart = parseInt(code.slice(0, 3))

      const codeAfterFirstRobot = this.firstRobot(code)

      let totalLength = 0
      this.splitStringAfterA(codeAfterFirstRobot).forEach((subcode) => {
        const newLength = this.secondRobotRecursive2(`${subcode}`, 2)
        totalLength += newLength
      })

      result += numericPart * totalLength
    }

    return result
  }

  solveForPartTwo (input: string): number {
    const codes = input.split('\n')

    let result = 0
    for (const code of codes) {
      const numericPart = parseInt(code.slice(0, 3))

      const codeAfterFirstRobot = this.firstRobot(code)

      let totalLength = 0
      this.splitStringAfterA(codeAfterFirstRobot).forEach((subcode) => {
        const newLength = this.secondRobotRecursive2(`${subcode}`, 25)
        totalLength += newLength
      })

      result += numericPart * totalLength
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

  secondRobotRecursive2 (code: string, depth: number): number {
    if (depth === 0) {
      return code.length
    }

    const key = `${code}-${depth}`
    if (this.memo.has(key)) {
      return this.memo.get(key)!
    }

    const current = {
      x: 2,
      y: 0
    }

    let result = 0
    const targetArray: string[] = []
    for (const char of code) {
      const target = this.findPosition(char, robopad)

      while (current.x !== target.x || current.y !== target.y) {
        if (current.x > target.x && !(target.x === 0 && current.y === 0)) {
          while (current.x !== target.x) {
            current.x--
            targetArray.push('<')
          }
        } else if (current.y > target.y && !(target.y === 0 && current.x === 0)) {
          while (current.y !== target.y) {
            current.y--
            targetArray.push('^')
          }
        } else if (current.y < target.y) {
          while (current.y !== target.y) {
            current.y++
            targetArray.push('v')
          }
        } else if (current.x < target.x) {
          while (current.x !== target.x) {
            current.x++
            targetArray.push('>')
          }
        }
      }
      targetArray.push('A')
    }

    this.splitStringAfterA(targetArray.join('')).forEach((subcode) => {
      const newLength = this.secondRobotRecursive2(`${subcode}`, depth - 1)
      result += newLength
    })
    this.memo.set(key, result)

    return result
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

  splitStringAfterA (str: string): string[] {
    return str.match(/.*?A/g) || []
  }
}

export default new Day21()
