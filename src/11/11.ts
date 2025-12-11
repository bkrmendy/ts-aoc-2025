import { lines, memo, sum, words } from '@/advent'

export function parse(input: string) {
  let result: Map<string, string[]> = new Map()
  lines(input).forEach(line => {
    const [first, ...rest] = words(line)
    result.set(first!.slice(0, -1), rest)
  })
  return result
}

type Input = ReturnType<typeof parse>

const paths = memo(
  (_, from) => from,
  (input: Input, from: string): number => {
    const connections = input.get(from)
    if (!connections) {
      return 0
    }
    if (connections[0] === 'out') {
      return 1
    }

    return sum(connections.map(c => paths(input, c)))
  }
)

const paths2 = memo(
  (_, from, { dac, fft }: { dac: boolean; fft: boolean }) =>
    `${from}-${dac}-${fft}`,
  (
    input: Input,
    from: string,
    { dac, fft }: { dac: boolean; fft: boolean }
  ): number => {
    const connections = input.get(from)
    if (!connections) {
      throw new Error(from)
    }
    if (connections[0] === 'out') {
      if (dac && fft) {
        return 1
      }
      return 0
    }

    const points = { dac, fft }
    points.dac = from === 'dac' ? true : dac
    points.fft = from === 'fft' ? true : fft

    return sum(connections.map(c => paths2(input, c, points)))
  }
)

export function partOne(input: Input) {
  return paths(input, 'you')
}

export function partTwo(input: Input) {
  return paths2(input, 'svr', { dac: false, fft: false })
}
