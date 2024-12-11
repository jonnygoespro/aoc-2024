import { Day } from '../day'

const directions = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
]

class Day6 extends Day {
  constructor () {
    super(6)
  }

  solveForPartOne (input: string): number {
    const matrix = this.parseInput(input)

    const startY = matrix.findIndex(row => row.includes('^'))
    const startX = matrix[startY].findIndex(cell => cell === '^')

    const pos = { x: startX, y: startY }
    let dir = directions[0]
    while (true) {
      matrix[pos.y][pos.x] = 'X'

      if (matrix[pos.y + dir.y][pos.x + dir.x] === 'W') {
        break
      }

      if (matrix[pos.y + dir.y][pos.x + dir.x] === '#') {
        dir = directions[(directions.indexOf(dir) + 1) % 4]
      }

      if (matrix[pos.y + dir.y][pos.x + dir.x] === '.' || matrix[pos.y + dir.y][pos.x + dir.x] === 'X') {
        pos.x += dir.x
        pos.y += dir.y
      }
    }

    const result = matrix.reduce((acc, row) => acc + row.filter(cell => cell === 'X').length, 0)
    return result
  }

  // 422 wrong answer
  // 423 wrong answer
  solveForPartTwo (input: string): number {
    const matrix = this.parseInput(input)
    const visitedMatrix: { step: number, dir: {x: number, y: number}, pos: {x: number, y: number} }[][][] = Array(matrix.length)
      .fill(null)
      .map(() =>
        Array(matrix[0].length).fill(null).map(() => [])
      )

    const startY = matrix.findIndex(row => row.includes('^'))
    const startX = matrix[startY].findIndex(cell => cell === '^')

    let pos = { x: startX, y: startY }
    let dir = directions[0]
    let step = 0
    while (true) {
      matrix[pos.y][pos.x] = 'X'
      if (!visitedMatrix[pos.y][pos.x].some(cell => cell.dir.x === dir.x && cell.dir.y === dir.y)) {
        visitedMatrix[pos.y][pos.x].push({ step: step++, dir: dir, pos: pos })
      }

      if (matrix[pos.y + dir.y][pos.x + dir.x] === 'W') {
        break
      }

      if (matrix[pos.y + dir.y][pos.x + dir.x] === '#') {
        dir = directions[(directions.indexOf(dir) + 1) % 4]
        if (!visitedMatrix[pos.y][pos.x].some(cell => cell.dir.x === dir.x && cell.dir.y === dir.y)) {
          visitedMatrix[pos.y][pos.x].push({ step: step++, dir: dir, pos: pos })
        }
      }

      if (matrix[pos.y + dir.y][pos.x + dir.x] === '.' || matrix[pos.y + dir.y][pos.x + dir.x] === 'X') {
        pos = {
          x: pos.x + dir.x,
          y: pos.y + dir.y
        }
      }
    }

    const walkingPath = visitedMatrix.flat(3).filter(cell => cell.step !== -1).sort((a, b) => a.step - b.step)

    const obstPositions: {x: number, y: number}[] = []

    for (let i = 0; i < walkingPath.length - 1; i++) {
      const futureObstPos = walkingPath[i + 1].pos
      if (obstPositions.includes(futureObstPos)) {
        continue
      }

      const localMatrix = JSON.parse(JSON.stringify(matrix))
      if (futureObstPos.x !== startX || futureObstPos.y !== startY) {
        localMatrix[futureObstPos.y][futureObstPos.x] = '#'
      } else {
        continue
      }

      const localVisited: { step: number, dir: {x: number, y: number}, pos: {x: number, y: number} }[][][] = Array(localMatrix.length)
        .fill(null)
        .map(() =>
          Array(localMatrix[0].length).fill(null).map(() => [])
        )

      let localDir = directions[0]
      let localPos = { x: startX, y: startY }
      let localStep = 0
      while (true) {
        if (!localVisited[localPos.y][localPos.x].some(cell => cell.dir.x === localDir.x && cell.dir.y === localDir.y)) {
          localVisited[localPos.y][localPos.x].push({ step: localStep++, dir: localDir, pos: localPos })
        }

        if (localMatrix[localPos.y + localDir.y][localPos.x + localDir.x] === 'W') {
          break
        }

        if (localMatrix[localPos.y + localDir.y][localPos.x + localDir.x] === '#') {
          localDir = directions[(directions.indexOf(localDir) + 1) % 4]
          if (!localVisited[localPos.y][localPos.x].some(cell => cell.dir.x === localDir.x && cell.dir.y === localDir.y)) {
            localVisited[localPos.y][localPos.x].push({ step: localStep++, dir: localDir, pos: localPos })
          }
        }

        if (localVisited[localPos.y + localDir.y][localPos.x + localDir.x].some(cell => cell.dir.x === localDir.x && cell.dir.y === localDir.y)) {
          if (!obstPositions.some(elem => elem.x === futureObstPos.x && elem.y === futureObstPos.y)) {
            obstPositions.push(futureObstPos)
          }
          break
        }

        if (localMatrix[localPos.y + localDir.y][localPos.x + localDir.x] === '.' || localMatrix[localPos.y + localDir.y][localPos.x + localDir.x] === 'X') {
          localPos = {
            x: localPos.x + localDir.x,
            y: localPos.y + localDir.y
          }
        }
      }
    }

    const result = obstPositions.length
    return result
  }

  parseInput (input: string): string[][] {
    const matrix = input.split('\n')
      .map(row => row.split(''))
      .map(row => ['W', ...row, 'W'])

    const paddedMatrix: string[][] = ['W'.repeat(matrix[0].length).split(''), ...matrix, 'W'.repeat(matrix[0].length).split('')]

    return paddedMatrix
  }
}

export default new Day6()
