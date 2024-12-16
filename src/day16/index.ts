import { Day } from '../day'

enum Cell {
  WALL = '#',
  EMPTY = '.',
  START = 'S',
  END = 'E',
}

type Position = {
  row: number;
  col: number;
  direction: number; // 0: East, 1: South, 2: West, 3: North
};

type QueueItem = {
  position: Position;
  score: number;
  path: Position[];
};

type Result = {
  bestPaths: Position[][];
  bestScore: number;
};

class Day16 extends Day {
  constructor () {
    super(16)
  }

  // 98384 -> too high
  solveForPartOne (input: string): number {
    const map = this.parseInput(input)
    const result = this.findAllBestPaths(map)
    return result.bestScore
  }

  solveForPartTwo (input: string): number {
    const map = this.parseInput(input)
    const result = this.findAllBestPaths(map)

    const uniquePositions = new Set<string>()
    for (const path of result.bestPaths) {
      for (const position of path) {
        uniquePositions.add(`${position.row},${position.col}`)
      }
    }

    return uniquePositions.size
  }

  parseInput (input: string): Cell[][] {
    return input.split('\n').map((row) => row.split('') as Cell[])
  }

  findAllBestPaths (maze: Cell[][]): Result {
    const rows = maze.length
    const cols = maze[0].length
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]] // East, South, West, North

    let start: Position | null = null
    let end: Position | null = null

    // Find start and end positions
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (maze[i][j] === Cell.START) start = { row: i, col: j, direction: 0 }
        if (maze[i][j] === Cell.END) end = { row: i, col: j, direction: 0 }
      }
    }

    if (!start || !end) throw new Error('Start or end not found')

    const queue: QueueItem[] = [{ position: start, score: 0, path: [start] }]
    const bestScores = new Map<string, number>()
    let bestEndScore = Infinity
    const bestPaths: Position[][] = []

    while (queue.length > 0) {
      queue.sort((a, b) => a.score - b.score)
      const { position, score, path } = queue.shift()!

      const key = `${position.row},${position.col},${position.direction}`

      if (bestScores.has(key) && bestScores.get(key)! < score) continue
      bestScores.set(key, score)

      if (position.row === end.row && position.col === end.col) {
        if (score < bestEndScore) {
          bestEndScore = score
          bestPaths.length = 0
          bestPaths.push(path)
        } else if (score === bestEndScore) {
          bestPaths.push(path)
        }
        continue
      }

      if (score >= bestEndScore) continue

      // Move forward
      const [dr, dc] = directions[position.direction]
      const newRow = position.row + dr
      const newCol = position.col + dc

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && maze[newRow][newCol] !== Cell.WALL) {
        const newPosition = { row: newRow, col: newCol, direction: position.direction }
        queue.push({
          position: newPosition,
          score: score + 1,
          path: [...path, newPosition]
        })
      }

      // Rotate clockwise and counterclockwise
      for (const newDirection of [(position.direction + 1) % 4, (position.direction + 3) % 4]) {
        const newPosition = { row: position.row, col: position.col, direction: newDirection }
        queue.push({
          position: newPosition,
          score: score + 1000,
          path: [...path, newPosition]
        })
      }
    }

    return { bestPaths, bestScore: bestEndScore }
  }
}

export default new Day16()
