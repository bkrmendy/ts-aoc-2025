import { lines, product, sum, transpose, words } from '@/advent'
import { Array, pipe } from 'effect'

export const parse = (input: string) => input

type Input = ReturnType<typeof parse>

export const partOne = (input: Input) =>
  pipe(
    lines(input),
    Array.map(line => words(line)),
    transpose,
    Array.map(i => {
      const f = i.at(-1)! === '+' ? sum : product
      return f(i.slice(0, -1).map(n => parseInt(n, 10)))
    }),
    sum
  )

export function www(signs: string): number[] {
  let result: number[] = []
  let w = 1
  let s = signs[0] === '+' ? 1 : -1
  for (let i = 1; i < signs.length; i++) {
    if (signs[i] !== ' ') {
      result.push(s * (w - 1))
      w = 1
      s = signs[i] === '+' ? 1 : -1
    } else {
      w++
    }
  }
  result.push(s * w)
  return result
}

function ns(line: string, widths: number[]): string[] {
  let rest = line
  let result = []
  for (const w of widths) {
    const width = Math.abs(w)
    let start = [...rest.slice(0, width)]
      .map(i => (i === ' ' ? 'x' : i))
      .join('')
    rest = rest.slice(width + 1)
    result.push(start)
  }
  return result
}

export function partTwo(input: Input) {
  const ls = lines(input)
  const widths = www(ls.at(-1)!)
  const numbers = transpose(ls.slice(0, -1).map(line => ns(line, widths)))

  let result = 0
  for (let i = 0; i < widths.length; i++) {
    const f = Math.sign(widths[i]!) < 0 ? product : sum
    const problem = numbers[i]!
    const ns = transpose(problem.map(n => [...n])).map(n =>
      parseInt(n.filter(i => i !== 'x').join(''), 10)
    )
    result += f(ns)
  }

  return result
}
