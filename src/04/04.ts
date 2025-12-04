import { lines } from '@/advent'
import { toKey, fromKey, Position } from '@/move2d'

export function parse(input: string) {
  let grid: Map<string, string> = new Map()
  lines(input).forEach((line, iRow) =>
    [...line].forEach((cell, iCol) => {
      if (cell === '@') {
        grid.set(toKey({ r: iRow, c: iCol }), '@')
      }
    })
  )
  return grid
}

type Input = ReturnType<typeof parse>

function accessible(grid: Input, coord: Position) {
  return (
    [
      { r: coord.r - 1, c: coord.c - 1 },
      { r: coord.r - 1, c: coord.c },
      { r: coord.r - 1, c: coord.c + 1 },
      { r: coord.r, c: coord.c - 1 },
      { r: coord.r, c: coord.c + 1 },
      { r: coord.r + 1, c: coord.c - 1 },
      { r: coord.r + 1, c: coord.c },
      { r: coord.r + 1, c: coord.c + 1 }
    ].filter(c => grid.has(toKey(c))).length < 4
  )
}

export function partOne(input: Input) {
  return [...input.keys().filter(k => accessible(input, fromKey(k)))].length
}

export function partTwo(input: Input) {
  let result = 0
  let going = true
  while (going) {
    const toBeRemoved = [
      ...input.keys().filter(k => accessible(input, fromKey(k)))
    ]
    going = toBeRemoved.length > 0
    result += toBeRemoved.length
    toBeRemoved.forEach(coord => input.delete(coord))
  }
  return result
}
