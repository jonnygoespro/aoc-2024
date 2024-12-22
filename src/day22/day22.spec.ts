import day22 from './index'

const testInput = '1\n' +
    '10\n' +
    '100\n' +
    '2024'

const testInputPart2 = '1\n' +
    '2\n' +
    '3\n' +
    '2024'

const test2 = '123'

describe('On Day 22', () => {
  it('part1 runs with test input', () => {
    expect(day22.solveForPartOne(testInput)).toBe(37327623)
  })

  it('part2 runs with test input', () => {
    expect(day22.solveForPartTwo(testInputPart2)).toBe(23)
  })

  // it('part2 runs with test input', () => {
  //   expect(day22.solveForPartTwo(test2)).toBe(23)
  // })
})
