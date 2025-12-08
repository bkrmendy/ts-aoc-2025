import { lines, product } from '@/advent'
import { createDisjointSet } from './disjointSet'

interface Coord {
  x: number
  y: number
  z: number
}

export function parse(input: string): Coord[] {
  return lines(input).map(line => {
    const [x, y, z] = line.split(',').map(i => parseInt(i, 10))
    return { x: x!, y: y!, z: z! }
  })
}

type Input = ReturnType<typeof parse>

const distance = (from: Coord, to: Coord) =>
  Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2 + (to.z - from.z) ** 2)

export function partOne(input: Input) {
  const upto = 1000

  const pairs = input
    .flatMap((from, fromIdx) =>
      input.flatMap((to, toIdx) =>
        fromIdx == toIdx
          ? []
          : {
              fromIdx,
              toIdx,
              distance: distance(from, to)
            }
      )
    )
    .toSorted((a, b) => a.distance - b.distance)
    .slice(0, upto * 2)

  const set = createDisjointSet(input.length)

  for (const { fromIdx, toIdx } of pairs) {
    set.union(fromIdx, toIdx)
  }

  return product(set.sizes.toSorted((a, b) => b - a).slice(0, 3))
}

export function partTwo(input: Input) {
  const pairs = input
    .flatMap((from, fromIdx) =>
      input.flatMap((to, toIdx) =>
        fromIdx == toIdx
          ? []
          : {
              from,
              to,
              fromIdx,
              toIdx,
              distance: distance(from, to)
            }
      )
    )
    .toSorted((a, b) => a.distance - b.distance)

  const set = createDisjointSet(input.length)
  for (const p of pairs) {
    set.union(p.fromIdx, p.toIdx)
    if (set.groups() === 1) {
      return p.from.x * p.to.x
    }
  }
}
