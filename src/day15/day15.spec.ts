import day15 from './index'

const smallExample = '########\n' +
    '#..O.O.#\n' +
    '##@.O..#\n' +
    '#...O..#\n' +
    '#.#.O..#\n' +
    '#...O..#\n' +
    '#......#\n' +
    '########\n' +
    '\n' +
    '<^^>>>vv<v>>v<<'

const bigExample = '##########\n' +
    '#..O..O.O#\n' +
    '#......O.#\n' +
    '#.OO..O.O#\n' +
    '#..O@..O.#\n' +
    '#O#..O...#\n' +
    '#O..O..O.#\n' +
    '#.OO.O.OO#\n' +
    '#....O...#\n' +
    '##########\n' +
    '\n' +
    '<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^\n' +
    'vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v\n' +
    '><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<\n' +
    '<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^\n' +
    '^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><\n' +
    '^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^\n' +
    '>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^\n' +
    '<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>\n' +
    '^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>\n' +
    'v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^'

const examplePart2 = '#######\n' +
    '#...#.#\n' +
    '#.....#\n' +
    '#..OO@#\n' +
    '#..O..#\n' +
    '#.....#\n' +
    '#######\n' +
    '\n' +
    '<vv<<^^<<^^'

const inputPart2_1 = '#######\n' +
    '#.....#\n' +
    '#.OO@.#\n' +
    '#.....#\n' +
    '#######\n' +
    '\n' +
    '<<'

const inputPart2_2 = '#######\n' +
    '#.....#\n' +
    '#.O#..#\n' +
    '#..O@.#\n' +
    '#.....#\n' +
    '#######\n' +
    '\n' +
    '<v<<^\n'

describe('On Day 15', () => {
  it('part1 runs with small input', () => {
    expect(day15.solveForPartOne(smallExample)).toBe(2028)
  })

  it('part1 runs with big input', () => {
    expect(day15.solveForPartOne(bigExample)).toBe(10092)
  })

  it('part2 runs with test input 1', () => {
    expect(day15.solveForPartTwo(inputPart2_1)).toBe(406)
  })

  it('part2 runs with test input 2', () => {
    expect(day15.solveForPartTwo(inputPart2_2)).toBe(509)
  })

  it('part2 runs with test input 2', () => {
    expect(day15.solveForPartTwo(bigExample)).toBe(9021)
  })
})
