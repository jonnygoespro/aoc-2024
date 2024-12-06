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

  it('part2 real input is identity function', () => {
    expect(day6.solveForPartTwo(testInput)).toBe('6')
  })

  const testInput2 = '..#.\n' +
      '...#\n' +
      '..^.'
  it('part2 is identity function', () => {
    expect(day6.solveForPartTwo(testInput2)).toBe('0')
  })

  const testInput3 = '.#.\n' +
      '#.#\n' +
      '#^.\n' +
      '...'
  it('part2 test 1 is identity function', () => {
    expect(day6.solveForPartTwo(testInput3)).toBe('1')
  })

  // const testInput4 = '.#.\n' +
  //     '..#\n' +
  //     '#^.\n' +
  //     '...'
  // it('part2 test 2 is identity function', () => {
  //   expect(day6.solveForPartTwo(testInput4)).toBe('1')
  // })
})
