import day20 from './index'

const testInput = '###############\n' +
    '#...#...#.....#\n' +
    '#.#.#.#.#.###.#\n' +
    '#S#...#.#.#...#\n' +
    '#######.#.#.###\n' +
    '#######.#.#...#\n' +
    '#######.#.###.#\n' +
    '###..E#...#...#\n' +
    '###.#######.###\n' +
    '#...###...#...#\n' +
    '#.#####.#.###.#\n' +
    '#.#...#.#.#...#\n' +
    '#.#.#.#.#.#.###\n' +
    '#...#...#...###\n' +
    '###############'

describe('On Day 20', () => {
  it('part1 runs with test input', () => {
    expect(day20.solveForPartOne(testInput)).toBe(44)
  })

  it('part2 runs with test input', () => {
    expect(day20.solveForPartTwo('1')).toBe(1)
  })
})
