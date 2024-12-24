import day23 from './index'

const testInput = 'kh-tc\n' +
    'qp-kh\n' +
    'de-cg\n' +
    'ka-co\n' +
    'yn-aq\n' +
    'qp-ub\n' +
    'cg-tb\n' +
    'vc-aq\n' +
    'tb-ka\n' +
    'wh-tc\n' +
    'yn-cg\n' +
    'kh-ub\n' +
    'ta-co\n' +
    'de-co\n' +
    'tc-td\n' +
    'tb-wq\n' +
    'wh-td\n' +
    'ta-ka\n' +
    'td-qp\n' +
    'aq-cg\n' +
    'wq-ub\n' +
    'ub-vc\n' +
    'de-ta\n' +
    'wq-aq\n' +
    'wq-vc\n' +
    'wh-yn\n' +
    'ka-de\n' +
    'kh-ta\n' +
    'co-tc\n' +
    'wh-qp\n' +
    'tb-vc\n' +
    'td-yn'

describe('On Day 23', () => {
  it('part1 runs with test input', () => {
    expect(day23.solveForPartOne(testInput)).toBe(7)
  })

  it('part2 runs with test input', () => {
    expect(day23.solveForPartTwo(testInput)).toBe('co,de,ka,ta')
  })
})
