export interface Interval {
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

export function merge(one: Interval, other: Interval) {
  return {
    from: Math.min(one.from, other.from),
    to: Math.max(one.to, other.to)
  }
}
