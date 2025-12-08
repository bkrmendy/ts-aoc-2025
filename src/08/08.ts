import { lines, product } from '@/advent'
import { createDisjointSet } from './disjointSet'

interface Coord {
  x: number
  y: number
  z: number
}

const distance = (from: Coord, to: Coord) =>
  Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2 + (to.z - from.z) ** 2)

function getPairs(coords: Coord[]) {
  return coords
    .flatMap((from, fromIdx) =>
      coords.flatMap((to, toIdx) =>
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
}

export function parse(input: string) {
  return lines(input).map(line => {
    const [x, y, z] = line.split(',').map(i => parseInt(i, 10))
    return { x: x!, y: y!, z: z! }
  })
}

type Input = ReturnType<typeof parse>

export function partOne(input: Input) {
  const pairs = getPairs(input)
  const size = input.length

  const upto = 1000
  const set = createDisjointSet(size)
  for (const { fromIdx, toIdx } of pairs.slice(0, upto * 2)) {
    set.union(fromIdx, toIdx)
  }

  return product(set.sizes.toSorted((a, b) => b - a).slice(0, 3))
}

export function partTwo(input: Input) {
  const pairs = getPairs(input)
  const size = input.length

  const set = createDisjointSet(size)
  for (const p of pairs) {
    set.union(p.fromIdx, p.toIdx)
    if (set.groups() === 1) {
      return p.from.x * p.to.x
    }
  }
}
