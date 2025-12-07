import { lines, memo, sum } from '@/advent'

export const parse = (input: string) =>
  lines(input)
    .map(l => [...l])
    .filter(i => i.some(c => c !== '.'))

type Input = ReturnType<typeof parse>

function getBeamsWithSplits(input: string[][]) {
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
  return { splits, beams }
}

export const partOne = (input: Input) => getBeamsWithSplits(input).splits

export function partTwo(input: Input) {
  const start = input[0]!.indexOf('S')

  const beams = getBeamsWithSplits(input).beams.map(b =>
    [...b].toSorted((a, b) => a - b)
  )

  const ways = memo(
    (r, i) => `${r}-${i}`,
    (row: number, index: number): number => {
      // base case
      if (row === 0 && index === start) {
        return 1
      }

      // are we actually on a beam?
      if (!beams[row]?.includes(index)) {
        return 0
      }

      const splitterOnLeft = input[row]![index - 1] === '^'
      const splitterOnRigh = input[row]![index + 1] === '^'

      const left = !splitterOnLeft ? 0 : ways(row - 1, index - 1)
      const righ = !splitterOnRigh ? 0 : ways(row - 1, index + 1)
      const abov = ways(row - 1, index)

      return left + righ + abov
    }
  )

  return sum([...beams.at(-1)!].map(b => ways(beams.length - 1, b)))
}
