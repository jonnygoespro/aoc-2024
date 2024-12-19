import day19 from './index'

const testInput = 'r, wr, b, g, bwu, rb, gb, br\n' +
    '\n' +
    'brwrr\n' +
    'bggr\n' +
    'gbbr\n' +
    'rrbgbr\n' +
    'ubwu\n' +
    'bwurrg\n' +
    'brgr\n' +
    'bbrgwb'

describe('On Day 19', () => {
  it('part1 runs with test input', () => {
    expect(day19.solveForPartOne(testInput)).toBe(6)
  })

  it('part2 runs with test input', () => {
    expect(day19.solveForPartTwo(testInput)).toBe(16)
  })
})
