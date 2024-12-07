import day7 from './index'

const testInput = '190: 10 19\n' +
    '3267: 81 40 27\n' +
    '83: 17 5\n' +
    '156: 15 6\n' +
    '7290: 6 8 6 15\n' +
    '161011: 16 10 13\n' +
    '192: 17 8 14\n' +
    '21037: 9 7 18 13\n' +
    '292: 11 6 16 20'

describe('On Day 7', () => {
  it('part1 is identity function', () => {
    expect(day7.solveForPartOne(testInput)).toBe('3749')
  })

  it('part2 is identity function', () => {
    expect(day7.solveForPartTwo(testInput)).toBe('11387')
  })

  const anotherTest = '3: 1 2 1000'
  it('part2 another test', () => {
    expect(day7.solveForPartTwo(anotherTest)).toBe('0')
  })
})
