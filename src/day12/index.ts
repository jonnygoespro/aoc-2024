import { Day } from '../day'
import { directions, getNeighbors, parseMatrixOfChars } from '../utils'

type Position = {
  x: number
  y: number
}

type Region = {
    positions: Position[]
    plant: string
}

type Fence = {
  position: Position,
  rotation: 'horizontal' | 'vertical'
  from: 'top' | 'right' | 'bottom' | 'left'
}

class Day12 extends Day {
  constructor () {
    super(12)
  }

  solveForPartOne (input: string): number {
    const garden = parseMatrixOfChars(input)
    const visited: boolean[][] = garden.map(row => row.map(() => false))

    let result = 0
    for (let y = 0; y < garden.length; y++) {
      for (let x = 0; x < garden[0].length; x++) {
        if (visited[y][x]) {
          continue
        }

        const region: Region = this.findRegion(garden, x, y)
        for (const position of region.positions) {
          visited[position.y][position.x] = true
        }

        const area = region.positions.length
        const perimeter = this.getPerimeter(region, garden)
        result += area * perimeter
      }
    }

    return result
  }

  solveForPartTwo (input: string): number {
    const garden = parseMatrixOfChars(input)
    const visited: boolean[][] = garden.map(row => row.map(() => false))

    let result = 0
    for (let y = 0; y < garden.length; y++) {
      for (let x = 0; x < garden[0].length; x++) {
        if (visited[y][x]) {
          continue
        }

        const region: Region = this.findRegion(garden, x, y)
        for (const position of region.positions) {
          visited[position.y][position.x] = true
        }

        const area = region.positions.length
        const amountSides = this.getAmountSides(region, garden)
        result += area * amountSides
      }
    }

    return result
  }

  findRegion (garden: string[][], x: number, y: number): Region {
    const positions: Position[] = []
    const plant = garden[y][x]

    const queue: Position[] = []
    queue.push({ x, y })

    while (queue.length > 0) {
      const current = queue.shift() as Position

      positions.push(current)
      const neighbors = getNeighbors(garden, current.x, current.y) as Position[]

      for (const neighbor of neighbors) {
        if (garden[neighbor.y][neighbor.x] === plant && !positions.some(position => position.x === neighbor.x && position.y === neighbor.y) && !queue.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
          queue.push(neighbor)
        }
      }
    }

    return {
      positions,
      plant
    }
  }

  getPerimeter (region: Region, garden: string[][]) {
    let perimeter = 0

    for (const position of region.positions) {
      for (const direction of directions) {
        const newX = position.x + direction.x
        const newY = position.y + direction.y
        if (newX < 0 || newX >= garden[0].length || newY < 0 || newY >= garden.length) {
          perimeter++
          continue
        }

        if (garden[newY][newX] !== region.plant) {
          perimeter++
        }
      }
    }

    return perimeter
  }

  private getAmountSides (region: Region, garden: string[][]) {
    const fences: Fence[] = []

    // create fences
    for (const position of region.positions) {
      for (const direction of directions) {
        const newX = position.x + direction.x
        const newY = position.y + direction.y
        const newFence: Fence = {
          position: {
            x: newX,
            y: newY
          },
          rotation: direction.y === 0 ? 'vertical' : 'horizontal',
          from: direction.y === 0 ? (direction.x === 1 ? 'left' : 'right') : (direction.y === 1 ? 'top' : 'bottom')
        }

        if (newX < 0 || newX >= garden[0].length || newY < 0 || newY >= garden.length) {
          if (!this.fenceIsInFences(newFence, fences)) {
            fences.push(newFence)
          }
          continue
        }

        if (garden[newY][newX] !== region.plant) {
          if (!this.fenceIsInFences(newFence, fences)) {
            fences.push(newFence)
          }
        }
      }
    }

    // merge fences that make a consecutive straight line
    let amountSides = 0
    while (fences.length > 0) {
      const queue: Fence[] = []
      const fence = fences[0]
      amountSides++
      queue.push(fence)

      while (queue.length > 0) {
        const current = queue.shift() as Fence
        // remove current from fences
        fences.splice(fences.indexOf(current), 1)

        const neighbors = fences.filter(f => {
          return (f.rotation === 'vertical' && f.position.x === current.position.x && Math.abs(f.position.y - current.position.y) === 1 && f.from === current.from) ||
                (f.rotation === 'horizontal' && f.position.y === current.position.y && Math.abs(f.position.x - current.position.x) === 1 && f.from === current.from)
        })

        for (const neighbor of neighbors) {
          queue.push(neighbor)
        }
      }
    }

    return amountSides
  }

  private fenceIsInFences (newFence: Fence, fences: Fence[]): boolean {
    return fences.some(fence =>
      fence.position.x === newFence.position.x &&
      fence.position.y === newFence.position.y &&
      fence.rotation === newFence.rotation &&
      fence.from === newFence.from)
  }
}

export default new Day12()
