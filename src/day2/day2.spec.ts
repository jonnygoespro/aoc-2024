import day2 from './index'

const input = '7 6 4 2 1\n' +
    '1 2 7 8 9\n' +
    '9 7 6 2 1\n' +
    '1 3 2 4 5\n' +
    '8 6 4 4 1\n' +
    '1 3 6 7 9'

describe('On Day 2', () => {
  it('part1 is identity function', () => {
    expect(day2.solveForPartOne(input)).toBe(2)
  })

  it('part2 is identity function', () => {
    expect(day2.solveForPartOne('1 2 3 4 5')).toBe(1)
  })

  it('part2 is identity function', () => {
    expect(day2.solveForPartOne('2 4 6 8 10')).toBe(1)
  })

  it('part2 is identity function', () => {
    expect(day2.solveForPartOne('3 6 9 12 15')).toBe(1)
  })

  it('part2 is identity function', () => {
    expect(day2.solveForPartOne('5 4 3 2 1')).toBe(1)
  })

  it('part2 is identity function', () => {
    expect(day2.solveForPartOne('10 8 6 4 2')).toBe(1)
  })

  it('part2 is identity function', () => {
    expect(day2.solveForPartOne('15 12 9 6 3')).toBe(1)
  })

  it('part2 is identity function', () => {
    expect(day2.solveForPartOne('16 12 9 6 3')).toBe(0)
  })

  it('part2 is identity function', () => {
    expect(day2.solveForPartOne('15 12 9 6 2')).toBe(0)
  })

  it('part2 is identity function', () => {
    expect(day2.solveForPartTwo(input)).toBe(4)
  })
})
