import day21 from './index'

const code = '029A'
const code2 = '379A'
const code3 = '456A'

const codes = '029A\n' +
    '980A\n' +
    '179A\n' +
    '456A\n' +
    '379A'

describe('On Day 21', () => {
  it('parses code to first robot', () => {
    expect(day21.firstRobot(code).length).toBe(12)
  })

  it('parses code to second robot', () => {
    expect(day21.secondRobot(day21.firstRobot(code)).length).toBe(28)
  })

  it('parses code to third robot', () => {
    expect(day21.secondRobot(day21.secondRobot(day21.firstRobot(code))).length).toBe(68)
  })

  it('part1 runs with test code', () => {
    expect(day21.solveForPartOne(code)).toBe(68 * 29)
  })

  it('part1 runs with test codes', () => {
    expect(day21.solveForPartOne(codes)).toBe(126384)
  })

  it('parses code2 to third robot', () => {
    expect(day21.secondRobot(day21.secondRobot(day21.firstRobot(code2))).length).toBe(64)
  })

  it('parses code4 to third robot', () => {
    expect(day21.secondRobot(day21.secondRobot(day21.firstRobot('140A'))).length).toBe(70)
  })

  it('parses code3 to third robot', () => {
    expect(day21.solveForPartOne(code3)).toBe(29184)
  })

  it('part2 runs with test codes', () => {
    expect(day21.solveForPartTwo(code)).toBe(82050061710 * 29)
  })

  // it('part2 runs with test codes', () => {
  //   expect(day21.solveForPartTwo(codes)).toBe(154115708116294)
  // })
})
