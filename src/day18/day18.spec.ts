import day18 from './index'

describe('On Day 18', () => {
  const testInput = '5,4\n' +
      '4,2\n' +
      '4,5\n' +
      '3,0\n' +
      '2,1\n' +
      '6,3\n' +
      '2,4\n' +
      '1,5\n' +
      '0,6\n' +
      '3,3\n' +
      '2,6\n' +
      '5,1\n' +
      '1,2\n' +
      '5,5\n' +
      '2,5\n' +
      '6,5\n' +
      '1,4\n' +
      '0,4\n' +
      '6,4\n' +
      '1,1\n' +
      '6,1\n' +
      '1,0\n' +
      '0,5\n' +
      '1,6\n' +
      '2,0'

  it('part1 runs with test input', () => {
    expect(day18.solveForPartOne(testInput)).toBe(22)
  })

  it('part2 runs with test input', () => {
    expect(day18.solveForPartTwo(testInput)).toBe('6,1')
  })
})
