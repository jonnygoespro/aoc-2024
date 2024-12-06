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

  solveForPartOne (input: string): string {
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
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const matrix = this.parseInput(input)
    const visitedMatrix: any[][][] = Array(matrix.length).fill(null).map(() => Array(matrix[0].length).fill([]))
    const obstMatrix = [...matrix]

    const startY = matrix.findIndex(row => row.includes('^'))
    const startX = matrix[startY].findIndex(cell => cell === '^')

    const pos = { x: startX, y: startY }
    let dir = directions[0]
    while (true) {
      if (matrix[pos.y][pos.x] !== 'O') {
        matrix[pos.y][pos.x] = 'X'
      }
      visitedMatrix[pos.y][pos.x] = [...visitedMatrix[pos.y][pos.x], dir]

      if (matrix[pos.y + dir.y][pos.x + dir.x] === 'W') {
        break
      }

      // check if we would place an obstacle in from of us, a loop would be created
      if (matrix[pos.y + dir.y][pos.x + dir.x] === 'X' || matrix[pos.y + dir.y][pos.x + dir.x] === '.') {
        let theoreticalDir = directions[(directions.indexOf(dir) + 1) % 4]
        const theoreticalPos = { x: pos.x + theoreticalDir.x, y: pos.y + theoreticalDir.y }
        while (true) {
          if (matrix[theoreticalPos.y + theoreticalDir.y][theoreticalPos.x + theoreticalDir.x] === 'W') {
            break
          }

          if (visitedMatrix[theoreticalPos.y + theoreticalDir.y][theoreticalPos.x + theoreticalDir.x].includes(theoreticalDir)) {
            matrix[pos.y][pos.x] = 'O'
            break
          }

          if (matrix[theoreticalPos.y + theoreticalDir.y][theoreticalPos.x + theoreticalDir.x] === '#') {
            theoreticalDir = directions[(directions.indexOf(theoreticalDir) + 1) % 4]
          }

          theoreticalPos.x += theoreticalDir.x
          theoreticalPos.y += theoreticalDir.y
        }
      }

      if (matrix[pos.y + dir.y][pos.x + dir.x] === '#') {
        dir = directions[(directions.indexOf(dir) + 1) % 4]
        visitedMatrix[pos.y][pos.x] = [...visitedMatrix[pos.y][pos.x], dir]
      }

      if (matrix[pos.y + dir.y][pos.x + dir.x] === '.' || matrix[pos.y + dir.y][pos.x + dir.x] === 'X' || matrix[pos.y + dir.y][pos.x + dir.x] === 'O') {
        pos.x += dir.x
        pos.y += dir.y
      }
    }

    // console.log(matrix)

    const result = obstMatrix.reduce((acc, row) => acc + row.filter(cell => cell === 'O').length, 0)
    return result.toString()
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
