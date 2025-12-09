import { lines, pairs } from '@/advent'

interface Coord {
  x: number
  y: number
}

export const parse = (input: string) =>
  lines(input).map(line => {
    const [x, y] = line.split(',')
    return { x: parseInt(x!, 10), y: parseInt(y!, 10) }
  })

type Input = ReturnType<typeof parse>

export const partOne = (input: Input) =>
  Math.max(
    ...[...pairs(input)].map(([from, to]) => {
      const [fromX, toX] = [Math.min(from.x, to.x), Math.max(from.x, to.x)]
      const [fromY, toY] = [Math.min(from.y, to.y), Math.max(from.y, to.y)]
      return (toX - fromX + 1) * (toY - fromY + 1)
    })
  )

interface Interval {
  from: number
  to: number
}

export function overlaps(one: Interval, other: Interval) {
  /**
   * one:     |-----------|
   * other:      |-----------|
   */
  return one.from <= other.from && other.from <= one.to
}

function merge(one: Interval, other: Interval) {
  return {
    from: Math.min(one.from, other.from),
    to: Math.max(one.to, other.to)
  }
}

function getStrips(points: Coord[]): Map<number, Interval[]> {
  const ys = points.map(p => p.y).toSorted((a, b) => a - b)
  const minY = ys.at(0)!
  const maxY = ys.at(-1)!

  const strips = new Map()

  for (let y = minY; y < maxY; y++) {
    const crossings: Interval[] = []

    let open: number | null = null
    for (let i = 0; i < points.length; i++) {
      const from = points[i]!
      const to = points[(i + 1) % points.length]!
      const [fromX, toX] = [Math.min(from.x, to.x), Math.max(from.x, to.x)]
      const [fromY, toY] = [Math.min(from.y, to.y), Math.max(from.y, to.y)]

      if (!(fromY <= y && y <= toY)) {
        // this edge is not relevant for this strip
        continue
      }

      if (from.y === to.y) {
        // horizontal edge
        crossings.push({ from: fromX, to: toX })
      } else {
        if (open) {
          const [f, t] = [Math.min(fromX, open), Math.max(fromX, open)]
          crossings.push({ from: f, to: t })
        } else {
          open = fromX
        }
      }
    }

    crossings.sort((a, b) => a.from - b.from)

    const intervals: Interval[] = crossings.slice(0, 1)
    for (const i of crossings.slice(1)) {
      const top = intervals.pop()!

      if (overlaps(top, i)) {
        intervals.push(merge(top, i))
      } else {
        intervals.push(top, i)
      }
    }

    strips.set(y, intervals)
  }

  return strips
}

function rectangleCoveredByStrips(
  [topLeft, bottomRight]: [Coord, Coord],
  strips: Map<number, { from: number; to: number }[]>
): boolean {
  for (let y = topLeft.y; y < bottomRight.y; y++) {
    const intervals = strips.get(y)

    if (!intervals) {
      return false
    }

    const contained = intervals.some(
      ({ from, to }) => from <= topLeft.x && bottomRight.x <= to
    )

    if (!contained) {
      return false
    }
  }

  return true
}

export function partTwo(input: Input) {
  input.forEach((from, i) => {
    const to = input[(i + 1) % input.length]!
    const turn =
      (from.x === to.x && from.y !== to.y) ||
      (from.x !== to.x && from.y === to.y)
    if (!turn) {
      throw new Error('ooops')
    }
  })

  const strips = getStrips(input)

  // console.log(strips)

  return Math.max(
    ...[...pairs(input)].flatMap(([from, to]) => {
      const [fromX, toX] = [Math.min(from.x, to.x), Math.max(from.x, to.x)]
      const [fromY, toY] = [Math.min(from.y, to.y), Math.max(from.y, to.y)]
      const topLeft = { x: fromX, y: fromY }
      const bottomRight = { x: toX, y: toY }

      return !rectangleCoveredByStrips([topLeft, bottomRight], strips)
        ? []
        : (toX - fromX + 1) * (toY - fromY + 1)
    })
  )
}
