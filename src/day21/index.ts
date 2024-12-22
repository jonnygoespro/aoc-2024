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

// code 3
// v<<A>>^AA<vA<A>>^AAvAA<^A>A<vA^>A<A>A<vA^>A<A>Av<<A>A^>AA<Av>A^A
//    <   AA  v <   AA >>  ^ A  v  A ^ A  v  A ^ A   < v  AA ^  > A
//        ^^        <<       A     >   A     >   A        vv      A
//

// code 1
// <vA<AA>>^AvAA<^A>Av<<A>>^AvA^Av<<A>>^AA<vA>A^A<A>Av<<A>A^>AAA<Av>A^A
//   v <<   A >>  ^ A   <   A > A   <   AA  v > A ^ A   < v  AAA ^  > A
//          <       A       ^   A       ^^      >   A        vvv      A

class Day21 extends Day {
  memoCache: Map<string, { newPosition: Position, newLength: number }> = new Map();

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

      let currentPosition = {
        x: 2,
        y: 0
      }

      for (let i = 0; i < codeAfterFirstRobot.length; i++) {
        const char = codeAfterFirstRobot[i]
        const { newPosition, newLength } = this.secondRobotRecursive(char, 2, currentPosition, true)
        totalLength += newLength
        currentPosition = newPosition
      }

      result += numericPart * totalLength
    }

    return result
  }

  // 171006003382129 -> too low
  // 415976987176676 -> too high
  solveForPartTwo (input: string): number {
    const codes = input.split('\n')

    let result = 0
    for (const code of codes) {
      const numericPart = parseInt(code.slice(0, 3))
      const codeAfterFirstRobot = this.firstRobot(code)
      let totalLength = 0

      let currentPosition = {
        x: 2,
        y: 0
      }

      for (let i = 0; i < codeAfterFirstRobot.length; i++) {
        const char = codeAfterFirstRobot[i]

        const { newPosition, newLength } = this.secondRobotRecursive(char, 26, currentPosition, true)
        totalLength += newLength
        currentPosition = newPosition
      }

      console.log(numericPart, totalLength)
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

  secondRobotRecursive (code: string, depth: number, currentPosition: Position, isFirst: boolean): { newPosition: Position, newLength: number } {
    if (depth === 0) {
      return { newPosition: { ...currentPosition }, newLength: 1 }
    }

    const targetArray: string[] = []
    const targetPosition = this.findPosition(code, robopad)

    const key = `${code}-${depth}-${JSON.stringify(currentPosition)}-${isFirst}-${targetPosition.x}-${targetPosition.y}`
    if (this.memoCache.has(key)) {
      return this.memoCache.get(key)!
    }

    const tempPosition = { ...currentPosition }

    while (tempPosition.x !== targetPosition.x || tempPosition.y !== targetPosition.y) {
      if (tempPosition.x > targetPosition.x && !(targetPosition.x === 0 && tempPosition.y === 0)) {
        while (tempPosition.x !== targetPosition.x) {
          tempPosition.x--
          targetArray.push('<')
        }
      } else if (tempPosition.y > targetPosition.y && !(targetPosition.y === 0 && tempPosition.x === 0)) {
        while (tempPosition.y !== targetPosition.y) {
          tempPosition.y--
          targetArray.push('^')
        }
      } else if (tempPosition.y < targetPosition.y) {
        while (tempPosition.y !== targetPosition.y) {
          tempPosition.y++
          targetArray.push('v')
        }
      } else if (tempPosition.x < targetPosition.x) {
        while (tempPosition.x !== targetPosition.x) {
          tempPosition.x++
          targetArray.push('>')
        }
      }
    }

    targetArray.push('A')

    let result = 0
    let positionResult = isFirst ? { x: 2, y: 0 } : { ...tempPosition }

    for (let i = 0; i < targetArray.length; i++) {
      const char = targetArray[i]

      const { newPosition, newLength } = this.secondRobotRecursive(char, depth - 1, { ...positionResult }, i === 0)

      result += newLength
      positionResult = newPosition
    }

    const resultObj = { newPosition: { ...tempPosition }, newLength: result }
    this.memoCache.set(key, resultObj)
    return resultObj
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
