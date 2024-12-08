import day8 from './index'

const testInput = '............\n' +
    '........0...\n' +
    '.....0......\n' +
    '.......0....\n' +
    '....0.......\n' +
    '......A.....\n' +
    '............\n' +
    '............\n' +
    '........A...\n' +
    '.........A..\n' +
    '............\n' +
    '............'

describe('On Day 8', () => {
  it('part1 is identity function', () => {
    expect(day8.solveForPartOne(testInput)).toBe('14')
  })

  it('part2 is identity function', () => {
    expect(day8.solveForPartTwo(testInput)).toBe('34')
  })
})
