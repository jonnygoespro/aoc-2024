import day25 from './index'

const testInput = '#####\n' +
    '.####\n' +
    '.####\n' +
    '.####\n' +
    '.#.#.\n' +
    '.#...\n' +
    '.....\n' +
    '\n' +
    '#####\n' +
    '##.##\n' +
    '.#.##\n' +
    '...##\n' +
    '...#.\n' +
    '...#.\n' +
    '.....\n' +
    '\n' +
    '.....\n' +
    '#....\n' +
    '#....\n' +
    '#...#\n' +
    '#.#.#\n' +
    '#.###\n' +
    '#####\n' +
    '\n' +
    '.....\n' +
    '.....\n' +
    '#.#..\n' +
    '###..\n' +
    '###.#\n' +
    '###.#\n' +
    '#####\n' +
    '\n' +
    '.....\n' +
    '.....\n' +
    '.....\n' +
    '#....\n' +
    '#.#..\n' +
    '#.#.#\n' +
    '#####'

describe('On Day 25', () => {
  it('part1 runs with test input', () => {
    expect(day25.solveForPartOne(testInput)).toBe(3)
  })

  it('part2 runs with test input', () => {
    expect(day25.solveForPartTwo('1')).toBe(1)
  })
})
