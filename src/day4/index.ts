import { Day } from '../day'

class Day4 extends Day {
  constructor () {
    super(4)
  }

  solveForPartOne (input: string): string {
    const matrix = input.split('\n').map(row => row.split(''))

    let result = 0
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 'X') {
          // check top
          try {
            if (matrix[i - 1][j] === 'M' && matrix[i - 2][j] === 'A' && matrix[i - 3][j] === 'S') {
              result += 1
            }
          } catch (e) {
            // ignore out of bounds
          }

          // check bottom
          try {
            if (matrix[i + 1][j] === 'M' && matrix[i + 2][j] === 'A' && matrix[i + 3][j] === 'S') {
              result += 1
            }
          } catch (e) {
            // ignore out of bounds
          }

          // check left
          try {
            if (matrix[i][j - 1] === 'M' && matrix[i][j - 2] === 'A' && matrix[i][j - 3] === 'S') {
              result += 1
            }
          } catch (e) {
            // ignore out of bounds
          }

          // check right
          try {
            if (matrix[i][j + 1] === 'M' && matrix[i][j + 2] === 'A' && matrix[i][j + 3] === 'S') {
              result += 1
            }
          } catch (e) {
            // ignore out of bounds
          }

          // check right bottom
          try {
            if (matrix[i + 1][j + 1] === 'M' && matrix[i + 2][j + 2] === 'A' && matrix[i + 3][j + 3] === 'S') {
              result += 1
            }
          } catch (e) {
            // ignore out of bounds
          }

          // check right top
          try {
            if (matrix[i - 1][j + 1] === 'M' && matrix[i - 2][j + 2] === 'A' && matrix[i - 3][j + 3] === 'S') {
              result += 1
            }
          } catch (e) {
            // ignore out of bounds
          }

          // check left bottom
          try {
            if (matrix[i + 1][j - 1] === 'M' && matrix[i + 2][j - 2] === 'A' && matrix[i + 3][j - 3] === 'S') {
              result += 1
            }
          } catch (e) {
            // ignore out of bounds
          }

          // check left top
          try {
            if (matrix[i - 1][j - 1] === 'M' && matrix[i - 2][j - 2] === 'A' && matrix[i - 3][j - 3] === 'S') {
              result += 1
            }
          } catch (e) {
            // ignore out of bounds
          }
        }
      }
    }

    return result.toString()
  }

  solveForPartTwo (input: string): string {
    const matrix = input.split('\n').map(row => row.split(''))

    let result = 0
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 'A') {
          // check left top and right bottom
          try {
            const firstDiagonalCorrect = (matrix[i - 1][j - 1] === 'M' && matrix[i + 1][j + 1] === 'S') || (matrix[i - 1][j - 1] === 'S' && matrix[i + 1][j + 1] === 'M')
            const secondDiagonalCorrect = (matrix[i - 1][j + 1] === 'M' && matrix[i + 1][j - 1] === 'S') || (matrix[i - 1][j + 1] === 'S' && matrix[i + 1][j - 1] === 'M')
            if (firstDiagonalCorrect && secondDiagonalCorrect) {
              result += 1
            }
          } catch (e) {
            // ignore out of bounds
          }
        }
      }
    }

    return result.toString()
  }
}

export default new Day4()
