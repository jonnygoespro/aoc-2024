
export const parseMatrixOfNumbers = (input: string): number[][] => {
  return input.split('\n').map(row => row.split(' ').map(Number))
}

export const parseLineOfNumbers = (input: string): number[] => {
  return input.split(' ').map(Number)
}
