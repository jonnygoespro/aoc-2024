import { Day } from '../day'

type Antenna = {
    freq: string,
    pos: {
        x: number,
        y: number
    }
}

class Day8 extends Day {
  constructor () {
    super(8)
  }

  solveForPartOne (input: string): number {
    const antiNodes = this.getEmptyAntiNodes(input)
    const antennas = this.parseInput(input)
    const uniqueFrequencies = this.getUniqueFrequencies(antennas)

    uniqueFrequencies.forEach(freq => {
      const freqAntennas = antennas.filter(a => a.freq === freq)
      for (let i = 0; i < freqAntennas.length - 1; i++) {
        for (let j = i + 1; j < freqAntennas.length; j++) {
          const freq1 = freqAntennas[i]
          const freq2 = freqAntennas[j]

          const dx = freq2.pos.x - freq1.pos.x
          const dy = freq2.pos.y - freq1.pos.y

          const absDx = Math.abs(dx)
          const absDy = Math.abs(dy)

          const signDx = Math.sign(dx)
          const signDy = Math.sign(dy)

          const localAntiNodes: { x: number; y: number }[] = []

          if (dx !== 0 || dy !== 0) {
            localAntiNodes.push({
              x: freq1.pos.x - signDx * absDx,
              y: freq1.pos.y - signDy * absDy
            })
            localAntiNodes.push({
              x: freq2.pos.x + signDx * absDx,
              y: freq2.pos.y + signDy * absDy
            })
          } else {
            console.log('dx:', dx, 'dy:', dy)
            throw new Error('Invalid dx and dy; should never happen')
          }

          localAntiNodes.forEach(antiNodePos => {
            if (antiNodePos.x >= 0 && antiNodePos.x < antiNodes[0].length && antiNodePos.y >= 0 && antiNodePos.y < antiNodes.length) {
              antiNodes[antiNodePos.y][antiNodePos.x] = '#'
            }
          })
        }
      }
    })

    const result = antiNodes.flat(2).filter(antiNode => antiNode === '#').length
    return result
  }

  solveForPartTwo (input: string): number {
    const antiNodes = this.getEmptyAntiNodes(input)
    const antennas = this.parseInput(input)
    const uniqueFrequencies = this.getUniqueFrequencies(antennas)

    uniqueFrequencies.forEach(freq => {
      const freqAntennas = antennas.filter(a => a.freq === freq)
      for (let i = 0; i < freqAntennas.length - 1; i++) {
        for (let j = i + 1; j < freqAntennas.length; j++) {
          const freq1 = freqAntennas[i]
          const freq2 = freqAntennas[j]

          const dx = freq2.pos.x - freq1.pos.x
          const dy = freq2.pos.y - freq1.pos.y

          const absDx = Math.abs(dx)
          const absDy = Math.abs(dy)

          const signDx = Math.sign(dx)
          const signDy = Math.sign(dy)

          const localAntiNodes: { x: number; y: number }[] = []

          if (dx !== 0 || dy !== 0) {
            const calculateAntiNodes = (startX: number, startY: number, signX: number, signY: number) => {
              let i = 0
              while (true) {
                const newX = startX + signX * absDx * i
                const newY = startY + signY * absDy * i
                if (newX < 0 || newX >= antiNodes[0].length || newY < 0 || newY >= antiNodes.length) {
                  break
                }

                localAntiNodes.push({ x: newX, y: newY })
                i++
              }
            }

            calculateAntiNodes(freq1.pos.x, freq1.pos.y, -signDx, -signDy)
            calculateAntiNodes(freq2.pos.x, freq2.pos.y, signDx, signDy)
          } else {
            console.log('dx:', dx, 'dy:', dy)
            throw new Error('Invalid dx and dy; should never happen')
          }

          localAntiNodes.forEach(antiNodePos => {
            antiNodes[antiNodePos.y][antiNodePos.x] = '#'
          })
        }
      }
    })

    const result = antiNodes.flat(2).filter(antiNode => antiNode === '#').length
    return result
  }

  parseInput (input: string): Antenna[] {
    return input.split('\n').map((line, y) => {
      return line.split('')
        .map((char, x) => {
          if (char === '.') return null

          return {
            freq: char,
            pos: { x, y }
          }
        })
    }).flat().filter(antenna => antenna !== null) as Antenna[]
  }

  getUniqueFrequencies (antennas: Antenna[]): string[] {
    return Array.from(new Set(antennas.map(antenna => antenna.freq)))
  }

  getEmptyAntiNodes (input: string): string[][] {
    return input.split('\n').map(line => line.split('').map(_ => '.'))
  }
}

export default new Day8()
