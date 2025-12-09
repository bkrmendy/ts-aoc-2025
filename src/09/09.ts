import { lines, pairs } from '@/advent'

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

export const partTwo = () => {}
