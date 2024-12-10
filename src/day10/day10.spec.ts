import day10 from './index'

const testInput = '89010123\n' +
    '78121874\n' +
    '87430965\n' +
    '96549874\n' +
    '45678903\n' +
    '32019012\n' +
    '01329801\n' +
    '10456732'

const testInput2 = '0123\n' +
    '1234\n' +
    '8765\n' +
    '9876'

describe('On Day 10', () => {
  it('part1 is identity function', () => {
    expect(day10.solveForPartOne(testInput)).toBe('36')
  })

  it('part1 test 2', () => {
    expect(day10.solveForPartOne(testInput2)).toBe('1')
  })

  it('part2 is identity function', () => {
    expect(day10.solveForPartTwo(testInput)).toBe('81')
  })
})
