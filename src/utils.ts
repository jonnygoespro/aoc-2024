
export const parseMatrixOfNumbers = (input: string): number[][] => {
  return input.split('\n').map(row => row.split(' ').map(Number))
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
