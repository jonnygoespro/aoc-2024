import { Day } from '../day'
import sharp from 'sharp'

type Robot = {
  position: {
    x: number
    y: number
  },
  velocity: {
      x: number
      y: number
    }
}

class Day14 extends Day {
  private readonly boardWidth = 101
  private readonly boardHeight = 103

  constructor () {
    super(14)
  }

  solveForPartOne (input: string): number {
    const robots = this.parseInput(input)

    const positions = robots.map(robot => this.calculatePosition(robot, 100))

    const q1 = positions.filter(position => position.x < Math.floor(this.boardWidth / 2) && position.y < Math.floor(this.boardHeight / 2))
    const q2 = positions.filter(position => position.x > Math.floor(this.boardWidth / 2) && position.y < Math.floor(this.boardHeight / 2))
    const q3 = positions.filter(position => position.x < Math.floor(this.boardWidth / 2) && position.y > Math.floor(this.boardHeight / 2))
    const q4 = positions.filter(position => position.x > Math.floor(this.boardWidth / 2) && position.y > Math.floor(this.boardHeight / 2))

    return q1.length * q2.length * q3.length * q4.length
  }

  solveForPartTwo (input: string): number {
    const robots = this.parseInput(input)

    for (let i = 0; i < 10000; i++) {
      const positions = robots.map(robot => this.calculatePosition(robot, i))
      this.saveImage(positions, i)
    }

    return 1
  }

  parseInput (input: string): Robot[] {
    return input.split('\n').map((line: string) => {
      const matches = line.match(/(-?[1-9][0-9][0-9]|-?[1-9][0-9]|-?[0-9]),(-?[1-9][0-9][0-9]|-?[1-9][0-9]|-?[0-9])/g)
      const position = matches![0].split(',').map(Number)
      const velocity = matches![1].split(',').map(Number)
      return {
        position: {
          x: position[0],
          y: position[1]
        },
        velocity: {
          x: velocity[0],
          y: velocity[1]
        }
      }
    })
  }

  calculatePosition (robot: Robot, time: number): {x: number, y: number} {
    const newX = (robot.position.x + time * robot.velocity.x) % this.boardWidth
    const newY = (robot.position.y + time * robot.velocity.y) % this.boardHeight
    return {
      x: newX >= 0 ? newX : this.boardWidth + newX,
      y: newY >= 0 ? newY : this.boardHeight + newY
    }
  }

  saveImage (positions: { x: number, y: number }[], index: number): void {
    const grid = Array.from({ length: this.boardHeight }, () => Array(this.boardWidth).fill(0))

    positions.forEach(({ x, y }) => {
      if (x >= 0 && x < this.boardWidth && y >= 0 && y < this.boardHeight) {
        grid[y][x] = 1
      }
    })

    const imageBuffer = Uint8Array.from(grid.flat().map((value) => (value ? 0 : 255)))

    sharp(imageBuffer, {
      raw: {
        width: this.boardWidth,
        height: this.boardHeight,
        channels: 1
      }
    })
      .toFile(`renders/day14/${index}.png`)
      .catch((err) => {
        console.error('Error creating image:', err)
      })
  }
}

export default new Day14()
