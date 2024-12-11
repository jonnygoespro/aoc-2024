import { Day } from '../day'

type File = {
  id: number,
  length: number
  visited: boolean
}

function isFile (obj: any): obj is File {
  return 'id' in obj && 'length' in obj
}

type FreeSpace = {
  length: number
}

function isFreeSpace (obj: any): obj is FreeSpace {
  return 'length' in obj && !('id' in obj)
}

class Day9 extends Day {
  constructor () {
    super(9)
  }

  solveForPartOne (input: string): number {
    const parsedNums = this.parseInput(input)

    let i = 0
    let j = parsedNums.length - 1
    while (i < j) {
      if (parsedNums[i] !== -1) {
        i++
        continue
      }

      while (parsedNums[j] === -1) {
        j--
      }

      parsedNums[i] = parsedNums[j]
      parsedNums[j] = -1
      i++
      j--
    }

    const result = parsedNums.filter(num => num !== -1).reduce((acc, num, index) => acc + num * index, 0)

    return result
  }

  solveForPartTwo (input: string): number {
    const disk = this.parseInputToDisk(input)

    let freeSpaceIndex = 0
    let fileIndex = disk.length - 1

    while (freeSpaceIndex < fileIndex) {
      if (!isFreeSpace(disk[freeSpaceIndex])) {
        freeSpaceIndex++
        continue
      }

      if (fileIndex >= disk.length || !isFile(disk[fileIndex]) || (disk[fileIndex] as File).visited) {
        fileIndex--
        continue
      }

      let localFreeSpaceIndex = freeSpaceIndex
      while (true) {
        if (localFreeSpaceIndex > disk.length - 1 || localFreeSpaceIndex > fileIndex) {
          (disk[fileIndex] as File).visited = true
          fileIndex--
          break
        }

        if (isFile(disk[localFreeSpaceIndex])) {
          localFreeSpaceIndex++
          continue
        }

        if (disk[localFreeSpaceIndex].length > disk[fileIndex].length) {
          const currentFile = disk[fileIndex] as File
          disk[fileIndex] = {
            length: currentFile.length
          }
          const currentFreeSpace = disk.splice(localFreeSpaceIndex, 1)[0] as FreeSpace
          currentFile.visited = true
          disk.splice(localFreeSpaceIndex, 0,
            currentFile,
            {
              length: currentFreeSpace.length - currentFile.length
            }
          )

          freeSpaceIndex = 0

          // merge all free spaces next to each other
          this.mergeFreeSpaces(disk)

          break
        } else if (disk[localFreeSpaceIndex].length === disk[fileIndex].length) {
          const currentFile = disk[fileIndex] as File
          currentFile.visited = true
          disk[fileIndex] = {
            length: currentFile.length
          }
          disk[localFreeSpaceIndex] = currentFile

          // merge all free spaces next to each other
          this.mergeFreeSpaces(disk)

          break
        } else {
          localFreeSpaceIndex++
          continue
        }
      }
    }

    let i = 0
    let result = 0
    disk.forEach((item, index) => {
      if (isFreeSpace(item)) {
        i += item.length
      } else {
        for (let j = 0; j < (item as File).length; j++) {
          result += i * (item as File).id
          i++
        }
      }
    })

    return result
  }

  parseInput (input: string): number[] {
    const numbers = input.split('').map(Number)

    const idArray: number[] = []
    let i = 0
    numbers.forEach((num, index) => {
      if ((index % 2) === 0) {
        for (let j = 0; j < num; j++) {
          idArray.push(i)
        }

        i++
      } else {
        for (let j = 0; j < num; j++) {
          idArray.push(-1)
        }
      }
    })

    return idArray
  }

  parseInputToDisk (input: string): (File | FreeSpace)[] {
    const numbers = input.split('').map(Number)

    const disk: (File | FreeSpace)[] = []
    let i = 0
    numbers.forEach((num, index) => {
      if ((index % 2) === 0) {
        disk.push({ id: i, length: num, visited: false })

        i++
      } else {
        disk.push({ length: num })
      }
    })

    return disk.filter((item): item is File | FreeSpace => item.length !== 0)
  }

  mergeFreeSpaces (disk: (File | FreeSpace)[]) {
    let i = 0
    while (i < disk.length - 1) {
      if (isFreeSpace(disk[i]) && isFreeSpace(disk[i + 1])) {
        disk[i] = {
          length: disk[i].length + disk[i + 1].length
        }
        disk.splice(i + 1, 1)
      } else {
        i++
      }
    }
  }
}

export default new Day9()
