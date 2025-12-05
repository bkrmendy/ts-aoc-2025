import { lines, sum } from '@/advent'
import { Array, pipe } from 'effect'

interface Interval {
  from: number
  to: number
}

export function parse(input: string) {
  const [fresh, available] = input.split('\n\n')
  return {
    fresh: lines(fresh!).map((range): Interval => {
      const [from, to] = range.split('-')
      return { from: parseInt(from!, 10), to: parseInt(to!, 10) }
    }),
    available: lines(available!).map(i => parseInt(i, 10))
  }
}

type Input = ReturnType<typeof parse>

export const partOne = (input: Input) =>
  pipe(
    input.available,
    Array.filter(i => input.fresh.some(({ from, to }) => from <= i && i <= to)),
    Array.length
  )

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

export function partTwo(input: Input) {
  input.fresh.sort((a, b) => a.from - b.from)
  let result: Interval[] = [input.fresh[0]!]
  input.fresh.slice(1).forEach(i => {
    const top = result.pop()!
    if (overlaps(top, i)) {
      result.push(merge(top, i))
    } else {
      result.push(top, i)
    }
  })

  return sum(result.map(({ from, to}) => to - from + 1))
}
