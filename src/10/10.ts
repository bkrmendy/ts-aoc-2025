import { lines, sum, words } from '@/advent'

export function parse(input: string) {
  return lines(input).map(line => {
    const parts = words(line)
    return {
      lights: parts[0]!.slice(1, -1),
      buttons: parts.slice(1, -1).map(button => {
        return button
          .slice(1, -1)
          .split(',')
          .map(i => parseInt(i, 10))
      }),
      jolts: parts
        .at(-1)!
        .slice(1, -1)
        .split(',')!
        .map(i => parseInt(i, 10))
    }
  })
}

type Input = ReturnType<typeof parse>

function toggle(lights: string, buttons: number[]): string {
  const lights2 = [...lights]
  for (const idx of buttons) {
    const s = lights2[idx]
    lights2[idx] = s === '.' ? '#' : '.'
  }
  return lights2.join('')
}

const done = (state: string) => [...state].every(l => l === '.')

function searchPt1(target: string, buttons: number[][]): number {
  let seen: Set<string> = new Set()
  let queue: [{ state: string; steps: number }] = [{ state: target, steps: 0 }]

  while (true) {
    const { state, steps } = queue.shift()!

    const nextStates = buttons
      .map(b => toggle(state, b))
      .filter(next => !seen.has(next))

    if (nextStates.some(s => done(s))) {
      return steps + 1
    }

    nextStates.forEach(state => {
      seen.add(state)
      queue.push({ state, steps: steps + 1 })
    })
  }
}

export const partOne = (input: Input) =>
  sum(input.map(({ lights, buttons }) => searchPt1(lights, buttons)))

export function partTwo(input: Input) {}
