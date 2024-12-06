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

  // 422 wrong answer
  // 423 wrong answer
  solveForPartTwo (input: string): string {
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

    const walkingPath = visitedMatrix.flat(3).filter(cell => cell.step !== -1).sort((a, b) => b.step - a.step)
    // console.log(walkingPath)

    const obstPositions: {x: number, y: number}[] = []
    for (let i = 0; i < walkingPath.length - 1; i++) {
      const localPos = walkingPath[i].pos
      const localDir = walkingPath[i].dir
      const newDir = directions[(directions.indexOf(localDir) + 1) % 4]

      if (matrix[localPos.y + localDir.y][localPos.x + localDir.x] === 'W' || matrix[localPos.y + localDir.y][localPos.x + localDir.x] === '#') {
        continue
      }

      let tempPos = { x: localPos.x, y: localPos.y }
      while (true) {
        tempPos = {
          x: tempPos.x + newDir.x,
          y: tempPos.y + newDir.y
        }

        if (matrix[tempPos.y][tempPos.x] === 'W' || matrix[tempPos.y][tempPos.x] === '#') {
          break
        }

        if (visitedMatrix[tempPos.y][tempPos.x].some(cell => cell.dir === newDir && cell.step < walkingPath[i].step)) {
          const localObstPos = { x: localPos.x + localDir.x, y: localPos.y + localDir.y }
          if (!obstPositions.some(cell => cell.x === localObstPos.x && cell.y === localObstPos.y)) {
            obstPositions.push({ x: localPos.x + localDir.x, y: localPos.y + localDir.y })
          }
          break
        }
      }
    }

    const result = obstPositions.length
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
