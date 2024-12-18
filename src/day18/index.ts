import { Day } from '../day'

type Position = {
    x: number
    y: number
}

class Day18 extends Day {
  private boardSize: number = 71
  private bytes: number = 1024

  constructor () {
    super(18)
  }

  solveForPartOne (input: string): number {
    const positions = this.parseInput(input)
    const board = this.simulateFalling(positions)

    const start = {
      x: 0,
      y: 0
    }

    const end = {
      x: this.boardSize - 1,
      y: this.boardSize - 1
    }

    const result = this.dijkstraAlgorithm(board, start, end)
    return result[end.y][end.x]
  }

  solveForPartTwo (input: string): string {
    const positions = this.parseInput(input)

    const start = {
      x: 0,
      y: 0
    }
    const end = {
      x: this.boardSize - 1,
      y: this.boardSize - 1
    }

    let bytes = this.bytes
    while (true) {
      const board = this.simulateFalling(positions, bytes)
      const result = this.dijkstraAlgorithm(board, start, end)
      if (result[end.y][end.x] === Number.MAX_VALUE) {
        return `${positions[bytes - 1].x},${positions[bytes - 1].y}`
      }
      bytes++
    }
  }

  parseInput (input: string): Position[] {
    return input.split('\n').map((line) => {
      const [x, y] = line.split(',').map(Number)
      return { x, y }
    })
  }

  simulateFalling (positions: Position[], bytes: number = this.bytes): string[][] {
    const board = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill('.'))
    for (let i = 0; i < bytes; i++) {
      if (i >= positions.length) {
        throw new Error('Not enough positions')
      }
      const { x, y } = positions[i]
      board[y][x] = '#'
    }
    return board
  }

  dijkstraAlgorithm (board: string[][], start: Position, end: Position): number[][] {
    const distances: number[][] = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(Number.MAX_VALUE))
    const visited = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(false))
    distances[start.y][start.x] = 0

    while (true) {
      let shortestDistance = Number.MAX_VALUE
      let shortestIndex = -1
      for (let y = 0; y < this.boardSize; y++) {
        for (let x = 0; x < this.boardSize; x++) {
          if (distances[y][x] < shortestDistance && !visited[y][x]) {
            shortestDistance = distances[y][x]
            shortestIndex = y * this.boardSize + x
          }
        }
      }

      if (shortestIndex === -1) {
        return distances
      }

      const y = Math.floor(shortestIndex / this.boardSize)
      const x = shortestIndex % this.boardSize

      const neighbors = this.getNeighbors(board, x, y)
      for (const neighbor of neighbors) {
        const [nx, ny] = neighbor
        if (distances[ny][nx] > distances[y][x] + 1) {
          distances[ny][nx] = distances[y][x] + 1
        }
      }

      visited[y][x] = true
    }
  }

  getNeighbors (board: string[][], x: number, y: number): number[][] {
    const neighbors = []
    if (x > 0 && board[y][x - 1] === '.') {
      neighbors.push([x - 1, y])
    }
    if (x < this.boardSize - 1 && board[y][x + 1] === '.') {
      neighbors.push([x + 1, y])
    }
    if (y > 0 && board[y - 1][x] === '.') {
      neighbors.push([x, y - 1])
    }
    if (y < this.boardSize - 1 && board[y + 1][x] === '.') {
      neighbors.push([x, y + 1])
    }
    return neighbors
  }
}

export default new Day18()
