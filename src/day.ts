import fs from 'fs'

abstract class Day {
    id: number;

    constructor (id: number) {
      this.id = id
    }

    async partOne (): Promise<number | string> {
      const content = await fs.promises.readFile(`./inputs/day${this.id}/part1.txt`)
      const result = this.solveForPartOne(content.toString())
      return result
    }

    abstract solveForPartOne(input: string) : number | string;

    async partTwo (): Promise<number | string> {
      const content = await fs.promises.readFile(`./inputs/day${this.id}/part2.txt`)
      const result = this.solveForPartTwo(content.toString())
      return result
    }

    abstract solveForPartTwo(input: string) : number | string;
}

export { Day }
