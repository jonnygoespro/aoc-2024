import day11 from './index'

const testInput = '125 17'

describe('On Day 11', () => {
  it('part1 is identity function', () => {
    expect(day11.solveForPartOne(testInput)).toBe('55312')
  })

  it('part2 is identity function', () => {
    expect(day11.solveForPartTwo(testInput)).toBe('55312')
  })
})
