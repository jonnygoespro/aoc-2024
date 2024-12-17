import { Day } from '../day'

type Game = {
  a: number
  b: number
  c: number
  program: number[]
}

class Day17 extends Day {
  constructor () {
    super(17)
  }

  solveForPartOne (input: string): string {
    const game = this.parseInput(input)
    const outputs = this.executeInstructions(game)
    return outputs.join(',')
  }

  solveForPartTwo (input: string): string {
    return ''
  }

  parseInput (input: string): Game {
    const [registers, program] = input.split('\n\n')
    const [a, b, c] = registers.match(/\d+/g)!.map(Number)
    return {
      a,
      b,
      c,
      program: program.split(' ')[1].split(',').map(Number)
    }
  }

  executeInstructions (game: Game): number[] {
    const outputs: number[] = []

    let i = 0
    while (i < game.program.length) {
      const instruction = game.program[i]
      switch (instruction) {
        case 0:
          this.adv(game, i)
          i += 2
          break
        case 1:
          this.bxl(game, i)
          i += 2
          break
        case 2:
          this.bst(game, i)
          i += 2
          break
        case 3:
          i = this.jnz(game, i)
          break
        case 4:
          this.bxc(game, i)
          i += 2
          break
        case 5:
          // eslint-disable-next-line no-case-declarations
          const output = this.out(game, i)
          outputs.push(output)
          i += 2
          break
        case 6:
          this.bvd(game, i)
          i += 2
          break
        case 7:
          this.cdv(game, i)
          i += 2
          break
      }
    }

    return outputs
  }

  adv (game: Game, i: number) {
    const numerator = game.a
    const denominator = Math.pow(2, this.getComboOperandValue(game, game.program[i + 1]))
    game.a = Math.floor(numerator / denominator)
  }

  bxl (game: Game, i: number) {
    game.b = game.b ^ game.program[i + 1]
  }

  bst (game: Game, i: number) {
    game.b = this.getComboOperandValue(game, game.program[i + 1]) % 8
  }

  jnz (game: Game, i: number): number {
    if (game.a !== 0) {
      return game.program[i + 1]
    }
    return i + 2
  }

  bxc (game: Game, i: number) {
    game.b = game.b ^ game.c
  }

  out (game: Game, i: number) {
    return this.getComboOperandValue(game, game.program[i + 1]) % 8
  }

  bvd (game: Game, i: number) {
    const numerator = game.a
    const denominator = Math.pow(2, this.getComboOperandValue(game, game.program[i + 1]))
    game.b = Math.floor(numerator / denominator)
  }

  cdv (game: Game, i: number) {
    const numerator = game.a
    const denominator = Math.pow(2, this.getComboOperandValue(game, game.program[i + 1]))
    game.c = Math.floor(numerator / denominator)
  }

  getComboOperandValue (game: Game, comboOperand: number): number {
    if (comboOperand >= 0 && comboOperand <= 3) {
      return comboOperand
    } else if (comboOperand === 4) {
      return game.a
    } else if (comboOperand === 5) {
      return game.b
    } else if (comboOperand === 6) {
      return game.c
    } else {
      throw new Error(`Invalid combo operand: ${comboOperand}`)
    }
  }
}

export default new Day17()
