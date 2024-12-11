import day0 from './index'

describe('On Day 0', () => {
  const testInput = '0'
  it('part1 runs with test input', () => {
    expect(day0.solveForPartOne(testInput)).toBe(1)
  })

  it('part2 runs with test input', () => {
    expect(day0.solveForPartTwo(testInput)).toBe(1)
  })
})
