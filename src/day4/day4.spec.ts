import day4 from './index'

const testInput = 'MMMSXXMASM\n' +
    'MSAMXMSMSA\n' +
    'AMXSXMAAMM\n' +
    'MSAMASMSMX\n' +
    'XMASAMXAMM\n' +
    'XXAMMXXAMA\n' +
    'SMSMSASXSS\n' +
    'SAXAMASAAA\n' +
    'MAMMMXMMMM\n' +
    'MXMXAXMASX'

describe('On Day 4', () => {
  it('part1 is identity function', () => {
    expect(day4.solveForPartOne(testInput)).toBe('18')
  })

  it('part2 is identity function', () => {
    expect(day4.solveForPartTwo(testInput)).toBe('9')
  })
})
