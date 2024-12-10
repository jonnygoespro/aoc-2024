import { Day } from '../day'

type Point = {
    x: number
    y: number
    value: number
}

type TrailEnd = {
    x: number
    y: number
    ranking: number
}

class Day10 extends Day {
  constructor () {
    super(10)
  }

  solveForPartOne (input: string): string {
    const map = this.parseInput(input)
    let result = 0
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] !== 0) {
          continue
        }

        result += this.breadthFirstSearch(map, { x, y, value: 0 })
      }
    }
    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const map = this.parseInput(input)
    let result = 0
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] !== 0) {
          continue
        }

        result += this.breadthFirstSearch(map, { x, y, value: 0 }, false)
      }
    }
    return result.toString()
  }

  parseInput (input: string): number[][] {
    return input.split('\n').map(line => line.split('').map(Number))
  }

  breadthFirstSearch (map: number[][], start: Point, isPart1: boolean = true): number {
    const queue: Point[] = []
    const visited: boolean[][] = map.map(row => row.map(() => false))
    const localTrailEnds: TrailEnd[] = []

    queue.push({ x: start.x, y: start.y, value: start.value })
    while (queue.length > 0) {
      const { x, y, value } = queue.shift() as Point

      if (map[y][x] === 9) {
        // console.log(`Found trail end at ${x}, ${y} starting from ${start.x}, ${start.y}`)
        if (!localTrailEnds.some(point => point.x === x && point.y === y)) {
          localTrailEnds.push({ x, y, ranking: 1 })
        } else {
          const trailEnd = localTrailEnds.find(point => point.x === x && point.y === y) as TrailEnd
          trailEnd.ranking++
        }
      }

      this.addNeighbors(map, y, x, value, queue, visited)

      visited[y][x] = true
    }

    if (isPart1) {
      return localTrailEnds.length
    } else {
      return localTrailEnds.reduce((acc, trailEnd) => acc + trailEnd.ranking, 0)
    }
  }

  addNeighbors (map: number[][], y: number, x: number, value:number, queue: Point[], visited: boolean[][]): void {
    const neighbors = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 }
    ]

    for (const neighbor of neighbors) {
      if (this.neighborExists(map, neighbor.y, neighbor.x) && !visited[neighbor.y][neighbor.x] && map[neighbor.y][neighbor.x] === value + 1) {
        queue.push({
          x: neighbor.x,
          y: neighbor.y,
          value: value + 1
        })
      }
    }
  }

  neighborExists (map: number[][], y: number, x: number): boolean {
    return y >= 0 && y < map.length && x >= 0 && x < map[0].length
  }
}

export default new Day10()
