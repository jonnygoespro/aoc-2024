import day12 from './index'

const testInput1 = 'AAAA\n' +
    'BBCD\n' +
    'BBCC\n' +
    'EEEC'

const testInput2 = 'OOOOO\n' +
    'OXOXO\n' +
    'OOOOO\n' +
    'OXOXO\n' +
    'OOOOO'

const testInput3 = 'RRRRIICCFF\n' +
    'RRRRIICCCF\n' +
    'VVRRRCCFFF\n' +
    'VVRCCCJFFF\n' +
    'VVVVCJJCFE\n' +
    'VVIVCCJJEE\n' +
    'VVIIICJJEE\n' +
    'MIIIIIJJEE\n' +
    'MIIISIJEEE\n' +
    'MMMISSJEEE'

const testInput4 = 'EEEEE\n' +
    'EXXXX\n' +
    'EEEEE\n' +
    'EXXXX\n' +
    'EEEEE'

const testInput5 = 'AAAAAA\n' +
    'AAABBA\n' +
    'AAABBA\n' +
    'ABBAAA\n' +
    'ABBAAA\n' +
    'AAAAAA'

describe('On Day 12', () => {
  it('part1 runs with test input 1', () => {
    expect(day12.solveForPartOne(testInput1)).toBe(140)
  })

  it('part1 runs with test input 2', () => {
    expect(day12.solveForPartOne(testInput2)).toBe(772)
  })

  it('part1 runs with test input 3', () => {
    expect(day12.solveForPartOne(testInput3)).toBe(1930)
  })

  it('part2 runs with test input', () => {
    expect(day12.solveForPartTwo(testInput1)).toBe(80)
  })

  it('part2 runs with test input 2', () => {
    expect(day12.solveForPartTwo(testInput2)).toBe(436)
  })

  it('part2 runs with test input 4', () => {
    expect(day12.solveForPartTwo(testInput4)).toBe(236)
  })

  it('part2 runs with test input 5', () => {
    expect(day12.solveForPartTwo(testInput5)).toBe(368)
  })

  it('part2 runs with test input 3', () => {
    expect(day12.solveForPartTwo(testInput3)).toBe(1206)
  })
})
