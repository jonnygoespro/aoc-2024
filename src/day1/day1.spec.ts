import day1 from './index'

const input = '3   4\n' +
    '4   3\n' +
    '2   5\n' +
    '1   3\n' +
    '3   9\n' +
    '3   3'

describe('On Day 1', () => {
  it('part1 is identity function', () => {
    expect(day1.solveForPartOne(input)).toBe('11')
  })

  it('part2 is identity function', () => {
    expect(day1.solveForPartTwo(input)).toBe('31')
  })
})
