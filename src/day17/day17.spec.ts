import day17 from './index'

const testInput = 'Register A: 729\n' +
      'Register B: 0\n' +
      'Register C: 0\n' +
      '\n' +
      'Program: 0,1,5,4,3,0'

describe('On Day 17', () => {
  it('part1 runs with test input', () => {
    expect(day17.solveForPartOne(testInput)).toBe('4,6,3,5,6,3,5,2,1,0')
  })

  // it('part2 runs with test input', () => {
  //   expect(day17.solveForPartTwo(testInput)).toBe(1)
  // })
})
