import { Day } from '../day'
import { directions, getNeighbors, parseMatrixOfChars } from '../utils'
import { sec } from 'mathjs'

type Position = {
    x: number
    y: number
    distance?: number
}

class Day20 extends Day {
  constructor () {
    super(20)
  }

  // 1367 -> too low
  solveForPartOne (input: string): number {
    const map = parseMatrixOfChars(input)

    const start: Position = {
      x: map[map.findIndex(row => row.includes('S'))].indexOf('S'),
      y: map.findIndex(row => row.includes('S')),
      distance: 0
    }

    const end = {
      x: map[map.findIndex(row => row.includes('E'))].indexOf('E'),
      y: map.findIndex(row => row.includes('E'))
    }

    const allPaths: Map<string, number> = new Map()

    const ogDistance = this.ogDijkstra(map, start, end)
    const queue: Position[] = [{ ...start, distance: 0 }]
    const visited: boolean[][] = map.map(row => row.map(() => false))

    while (queue.length) {
      const current = queue.shift() as Position

      if (current.x === end.x && current.y === end.y) {
        break
      }

      for (const direction of directions) {
        const nextChar = map[current.y + direction.y]?.[current.x + direction.x] ?? 'X'
        const secondChar = map[current.y + direction.y * 2]?.[current.x + direction.x * 2] ?? 'X'
        const thirdChar = map[current.y + direction.y * 3]?.[current.x + direction.x * 3] ?? 'X'

        if (nextChar === '#' && secondChar === '#' && (thirdChar === '.' || thirdChar === 'E')) {
          const key = `from-${current.x}-${current.y}-to${current.x + direction.x * 2}-${current.y + direction.y * 2}`
          const distance = this.ogDijkstra(map, { x: current.x + direction.x * 2, y: current.y + direction.y * 2, distance: current.distance! + 2 }, end)
          if ((!allPaths.has(key) || (allPaths.get(key) !== undefined && allPaths.get(key)! > distance)) && distance < ogDistance) {
            allPaths.set(key, distance)
          }
        } else if (nextChar === '#' && (secondChar === '.' || secondChar === 'E')) {
          const key = `from-${current.x}-${current.y}-to${current.x + direction.x}-${current.y + direction.y}`
          const distance = this.ogDijkstra(map, { x: current.x + direction.x, y: current.y + direction.y, distance: current.distance! + 1 }, end)
          if ((!allPaths.has(key) || (allPaths.get(key) !== undefined && allPaths.get(key)! > distance)) && distance < ogDistance) {
            allPaths.set(key, distance)
          }
        } else if (nextChar === '.' && visited[current.y + direction.y][current.x + direction.x] === false) {
          queue.push({ x: current.x + direction.x, y: current.y + direction.y, distance: current.distance! + 1 })
        }
      }

      visited[current.y][current.x] = true
    }

    const filteredPaths = Array.from(allPaths.entries()).filter(([key, value]) => value <= ogDistance - 100)
    console.log('Filtered Paths: ', filteredPaths.length)
    // const groupedPaths = Array.from(allPaths.values()).reduce((acc, cur) => {
    //   if (!acc[cur]) {
    //     acc[cur] = 1
    //   } else {
    //     acc[cur]++
    //   }
    //
    //   return acc
    // }, {} as Record<string, number>)
    // console.log('Grouped Paths: ', groupedPaths)

    return filteredPaths.length
  }

  solveForPartTwo (input: string): number {
    return input.length
  }

  ogDijkstra (map: string[][], start: Position, end: Position): number {
    const visited: boolean[][] = map.map(row => row.map(() => false))
    const distances: number[][] = map.map(row => row.map(() => Infinity))
    const queue: Position[] = [start]

    if (map[start.y][start.x] === 'E') {
      return start.distance as number
    }

    distances[start.y][start.x] = start.distance as number

    while (queue.length) {
      const current = queue.shift() as Position

      if (!current) {
        break
      }

      const neighbors = getNeighbors(map, current.x, current.y)

      for (const neighbor of neighbors) {
        if (visited[neighbor.y][neighbor.x] || map[neighbor.y][neighbor.x] === '#') {
          continue
        }

        const distance = distances[current.y][current.x] + 1

        if (distance < distances[neighbor.y][neighbor.x]) {
          distances[neighbor.y][neighbor.x] = distance
          queue.push(neighbor)
        }
      }

      visited[current.y][current.x] = true
    }

    return distances[end.y][end.x]
  }
}

export default new Day20()
