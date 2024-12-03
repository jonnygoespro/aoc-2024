import day3 from './index'

const testinput = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
const testinput2 = 'xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))'
describe('On Day 3', () => {
  it('part1 is identity function', () => {
    expect(day3.solveForPartOne(testinput)).toBe('161')
  })

  it('part2 is identity function', () => {
    expect(day3.solveForPartTwo(testinput2)).toBe('48')
  })
})
