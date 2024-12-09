import day9 from './index'

const testInput = '2333133121414131402'

describe('On Day 9', () => {
  it('part1 is identity function', () => {
    expect(day9.solveForPartOne(testInput)).toBe('1928')
  })

  it('part2 is identity function', () => {
    expect(day9.solveForPartTwo(testInput)).toBe('2858')
  })
})
