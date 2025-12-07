import { lines } from '@/advent'
import { Array } from 'effect'
import { array, number } from 'effect/Equivalence'

export function parse(input: string) {
  return lines(input).map(l => [...l])
}

type Input = ReturnType<typeof parse>

export function partOne(input: Input) {
  let splits = 0
  let beams = [new Set<number>([input[0]!.indexOf('S')])]
  for (let i = 1; i < input.length; i++) {
    let nextBeams = new Set<number>([...beams.at(-1)!])
    for (const beam of beams.at(-1)!) {
      if (input[i]![beam] === '^') {
        nextBeams.delete(beam)
        nextBeams.add(beam - 1)
        nextBeams.add(beam + 1)
        splits++
      }
    }
    beams.push(nextBeams)
  }
  return splits
}

function timelines(splits: number[][]): number[][] {
  const [next, ...rest] = splits
  if (next == null) {
    return [[]]
  }
  return next.flatMap(n => {
    return timelines(rest).map(t => {
      return [n, ...t]
    })
  })
}

export function partTwo(input: Input) {
  const i2 = input.filter(i => i.some(c => c !== '.'))
  let beams = [new Set<number>([i2[0]!.indexOf('S')])]
  for (let i = 1; i < i2.length; i++) {
    let nextBeams = new Set<number>([...beams.at(-1)!])
    for (const beam of beams.at(-1)!) {
      if (i2[i]![beam] === '^') {
        nextBeams.delete(beam)
        nextBeams.add(beam - 1)
        nextBeams.add(beam + 1)
      }
    }
    beams.push(nextBeams)
  }

  const ts = timelines(beams.map(bs => [...bs]))
  console.log(ts)
  return Array.dedupeWith(ts, array(number)).length
}
