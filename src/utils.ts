
export const parseMatrixOfNumbers = (input: string): number[][] => {
  return input.split('\n').map(row => row.split(' ').map(Number))
}

export const parseMatrixOfChars = (input: string): string[][] => {
  return input.split('\n').map(row => row.split(''))
}

export const parseLineOfNumbers = (input: string): number[] => {
  return input.split(' ').map(Number)
}

// source: https://retz.dev/blog/typescript-memoization
export const memo = <T extends unknown[], A>(fn: (...args: T) => A) => {
  const cache = new Map()

  return function (...args: T) {
    const key = args.map((arg) => `${arg}_${typeof arg}`).join('|')

    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)

    cache.set(key, result)
    return result
  }
}

export const directions = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 }
]

export const directionsWithDiagonals = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 1 },
  { x: -1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: -1 }
]

export const getNeighbors = (matrix: any[][], x: number, y: number): {x: number, y: number}[] => {
  const neighbors: {x: number, y: number}[] = []

  if (x - 1 >= 0) {
    neighbors.push({ x: x - 1, y })
  }

  if (x + 1 < matrix[0].length) {
    neighbors.push({ x: x + 1, y })
  }

  if (y - 1 >= 0) {
    neighbors.push({ x, y: y - 1 })
  }

  if (y + 1 < matrix.length) {
    neighbors.push({ x, y: y + 1 })
  }

  return neighbors
}
