import { lines, sum } from '@/advent'

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

export function partOne(input: Input) {
  return input.available.filter(i =>
    input.fresh.some(({ from, to }) => from <= i && i <= to)
  ).length
}

function size({ from, to }: Interval) {
  return to - from + 1
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

export function partTwo(input: Input) {
  input.fresh.sort((a, b) => a.from - b.from)
  let result: Interval[] = [input.fresh[0]!]
  input.fresh.slice(1).forEach(i => {
    if (overlaps(result.at(-1)!, i)) {
      const last = result.pop()!
      result.push(merge(i, last))
    } else {
      result.push(i)
    }
  })

  return sum(result.map(i => size(i)))
}
