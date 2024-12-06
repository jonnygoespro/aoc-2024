import day6 from './index'

const testInput = '....#.....\n' +
    '.........#\n' +
    '..........\n' +
    '..#.......\n' +
    '.......#..\n' +
    '..........\n' +
    '.#..^.....\n' +
    '........#.\n' +
    '#.........\n' +
    '......#...'

describe('On Day 6', () => {
  it('part1 is identity function', () => {
    expect(day6.solveForPartOne(testInput)).toBe('41')
  })

  it('part2 is identity function', () => {
    expect(day6.solveForPartTwo(testInput)).toBe('6')
  })
})
