import { Day } from '../day'

type Postion = {
    x: number,
    y: number
}

enum Element {
    EMPTY = '.',
    WALL = '#',
    BOX = 'O',
    BOX_START = '[',
    BOX_END = ']',
    ROBOT = '@'
}

enum Direction {
    UP = '^',
    DOWN = 'v',
    LEFT = '<',
    RIGHT = '>'
}

// eslint-disable-next-line no-unused-vars
const directions: {[key in Direction]: { x: number, y: number}} = {
  [Direction.UP]: { x: 0, y: -1 },
  [Direction.DOWN]: { x: 0, y: 1 },
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.RIGHT]: { x: 1, y: 0 }
}

type Board = {
  map: Element[][],
  movements: Direction[]
  start: Postion
}

class Day15 extends Day {
  constructor () {
    super(15)
  }

  solveForPartOne (input: string): number {
    const board = this.parseInput(input)

    const currentPosition = board.start
    for (const movement of board.movements) {
      const direction = directions[movement]
      const nextPosition = {
        x: currentPosition.x + direction.x,
        y: currentPosition.y + direction.y
      }

      if (board.map[nextPosition.y][nextPosition.x] === Element.WALL) {
        continue
      }

      if (board.map[nextPosition.y][nextPosition.x] === Element.EMPTY) {
        currentPosition.x = nextPosition.x
        currentPosition.y = nextPosition.y
      }

      if (board.map[nextPosition.y][nextPosition.x] === Element.BOX) {
        // find free index in direction
        const findEmptyIndexIterator = {
          x: nextPosition.x + direction.x,
          y: nextPosition.y + direction.y
        }

        while (board.map[findEmptyIndexIterator.y][findEmptyIndexIterator.x] !== Element.WALL) {
          if (board.map[findEmptyIndexIterator.y][findEmptyIndexIterator.x] === Element.EMPTY) {
            board.map[nextPosition.y][nextPosition.x] = Element.EMPTY
            board.map[findEmptyIndexIterator.y][findEmptyIndexIterator.x] = Element.BOX

            currentPosition.x = nextPosition.x
            currentPosition.y = nextPosition.y
            break
          }

          findEmptyIndexIterator.x += direction.x
          findEmptyIndexIterator.y += direction.y
        }
      }
    }

    let result = 0
    for (let y = 0; y < board.map.length; y++) {
      for (let x = 0; x < board.map[y].length; x++) {
        if (board.map[y][x] === Element.BOX) {
          result += y * 100 + x
        }
      }
    }

    return result
  }

  solveForPartTwo (input: string): number {
    const board = this.parseInputForPartTwo(input)

    const currentPosition = board.start
    for (const movement of board.movements) {
      const direction = directions[movement]
      const nextPosition = {
        x: currentPosition.x + direction.x,
        y: currentPosition.y + direction.y
      }

      if (board.map[nextPosition.y][nextPosition.x] === Element.WALL) {
        continue
      }

      if (board.map[nextPosition.y][nextPosition.x] === Element.EMPTY) {
        currentPosition.x = nextPosition.x
        currentPosition.y = nextPosition.y
      }

      if (this.isBox(board.map[nextPosition.y][nextPosition.x])) {
        if (movement === Direction.LEFT || movement === Direction.RIGHT) {
          const findEmptyIndexIterator = {
            x: nextPosition.x + direction.x,
            y: nextPosition.y + direction.y
          }

          while (board.map[findEmptyIndexIterator.y][findEmptyIndexIterator.x] !== Element.WALL) {
            if (board.map[findEmptyIndexIterator.y][findEmptyIndexIterator.x] === Element.EMPTY) {
              for (let i = findEmptyIndexIterator.x; i !== nextPosition.x; i -= direction.x) {
                board.map[nextPosition.y][i] = board.map[nextPosition.y][i - direction.x]
                board.map[nextPosition.y][i - direction.x] = Element.EMPTY
              }

              currentPosition.x = nextPosition.x
              currentPosition.y = nextPosition.y
              break
            }

            findEmptyIndexIterator.x += direction.x
            findEmptyIndexIterator.y += direction.y
          }
        }

        if (movement === Direction.UP || movement === Direction.DOWN) {
          let pushPossible = true
          const queue: Postion[] = []
          const itemsToMove: Postion[] = []

          // push next position
          queue.push(nextPosition)
          itemsToMove.push(nextPosition)

          if (board.map[nextPosition.y][nextPosition.x] === Element.BOX_START) {
            queue.push({
              x: nextPosition.x + 1,
              y: nextPosition.y
            })
            itemsToMove.push({
              x: nextPosition.x + 1,
              y: nextPosition.y
            })
          } else if (board.map[nextPosition.y][nextPosition.x] === Element.BOX_END) {
            queue.push({
              x: nextPosition.x - 1,
              y: nextPosition.y
            })
            itemsToMove.push({
              x: nextPosition.x - 1,
              y: nextPosition.y
            })
          }

          while (queue.length !== 0) {
            const localPosition = { ...queue.shift() } as Postion
            localPosition.y += direction.y

            if (board.map[localPosition.y][localPosition.x] === Element.EMPTY) {
              continue
            }

            if (board.map[localPosition.y][localPosition.x] === Element.WALL) {
              pushPossible = false
              break
            }

            if (this.isBox(board.map[localPosition.y][localPosition.x])) {
              if (board.map[localPosition.y][localPosition.x] === Element.BOX_START) {
                if (!itemsToMove.some(item => item.x === localPosition.x + 1 && item.y === localPosition.y)) {
                  queue.push(localPosition)
                  queue.push({
                    x: localPosition.x + 1,
                    y: localPosition.y
                  })
                  itemsToMove.push(localPosition)
                  itemsToMove.push({
                    x: localPosition.x + 1,
                    y: localPosition.y
                  })
                }
              } else if (board.map[localPosition.y][localPosition.x] === Element.BOX_END) {
                if (!itemsToMove.some(item => item.x === localPosition.x - 1 && item.y === localPosition.y)) {
                  queue.push(localPosition)
                  queue.push({
                    x: localPosition.x - 1,
                    y: localPosition.y
                  })
                  itemsToMove.push(localPosition)
                  itemsToMove.push({
                    x: localPosition.x - 1,
                    y: localPosition.y
                  })
                }
              }
            }
          }

          if (queue.length === 0 && pushPossible) {
            if (direction === directions[Direction.UP]) {
              itemsToMove.sort((a, b) => a.y - b.y)
            } else {
              itemsToMove.sort((a, b) => b.y - a.y)
            }

            for (const item of itemsToMove) {
              board.map[item.y + direction.y][item.x] = board.map[item.y][item.x]
              board.map[item.y][item.x] = Element.EMPTY
            }

            currentPosition.x = nextPosition.x
            currentPosition.y = nextPosition.y
          }
        }
      }
    }

    let result = 0
    for (let y = 0; y < board.map.length; y++) {
      for (let x = 0; x < board.map[y].length; x++) {
        if (board.map[y][x] === Element.BOX_START) {
          result += y * 100 + x
        }
      }
    }

    return result
  }

  parseInput (input: string): Board {
    const splittedInput = input.split('\n\n')

    const map = splittedInput[0].split('\n').map(row => row.split('') as Element[])
    const start = {
      x: map.filter(row => row.includes(Element.ROBOT))[0].indexOf(Element.ROBOT),
      y: map.findIndex(row => row.includes(Element.ROBOT))
    }
    map[start.y][start.x] = Element.EMPTY
    const movements: Direction[] = splittedInput[1].split('\n').join('').split('').map(movement => movement as Direction)

    return {
      map,
      start,
      movements
    }
  }

  parseInputForPartTwo (input: string): Board {
    const splittedInput = input.split('\n\n')

    let map = splittedInput[0].split('\n').map(row => row.split('') as Element[])
    map = map.map(row => row.flatMap(element => {
      if (element === Element.WALL) {
        return [Element.WALL, Element.WALL]
      } else if (element === Element.BOX) {
        return [Element.BOX_START, Element.BOX_END]
      } else if (element === Element.ROBOT) {
        return [Element.ROBOT, Element.EMPTY]
      } else {
        return [Element.EMPTY, Element.EMPTY]
      }
    }))

    const start = {
      x: map.filter(row => row.includes(Element.ROBOT))[0].indexOf(Element.ROBOT),
      y: map.findIndex(row => row.includes(Element.ROBOT))
    }
    map[start.y][start.x] = Element.EMPTY
    const movements: Direction[] = splittedInput[1].split('\n').join('').split('').map(movement => movement as Direction)

    return {
      map,
      start,
      movements
    }
  }

  isBox (element: Element): boolean {
    return element === Element.BOX || element === Element.BOX_START || element === Element.BOX_END
  }
}

export default new Day15()
