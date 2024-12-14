import day14 from './index'

describe('On Day 14', () => {
  const testInput = 'p=0,4 v=3,-3\n' +
      'p=6,3 v=-1,-3\n' +
      'p=10,3 v=-1,2\n' +
      'p=2,0 v=2,-1\n' +
      'p=0,0 v=1,3\n' +
      'p=3,0 v=-2,-2\n' +
      'p=7,6 v=-1,-3\n' +
      'p=3,0 v=-1,-2\n' +
      'p=9,3 v=2,3\n' +
      'p=7,3 v=-1,2\n' +
      'p=2,4 v=2,-3\n' +
      'p=9,5 v=-3,-3'

  it('part1 runs with test input', () => {
    expect(day14.solveForPartOne(testInput)).toBe(12)
  })

  it('part2 runs with test input', () => {
    expect(day14.solveForPartTwo('1')).toBe(1)
  })
})
