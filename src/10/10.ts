import { lines, sum, words } from '@/advent'
import { PriorityQueue } from '@/priority-queue'

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

function searchLights({ lights: target, buttons }: Input[number]): number {
  let seen: Set<string> = new Set()
  let queue: [{ state: string; steps: number }] = [
    {
      state: target,
      steps: 0
    }
  ]

  while (true) {
    const { state, steps } = queue.shift()!

    const nextStates = buttons
      .map(b => toggle(state, b))
      .filter(next => !seen.has(next))

    if (nextStates.some(done)) {
      return steps + 1
    }

    nextStates.forEach(state => {
      seen.add(state)
      queue.push({ state, steps: steps + 1 })
    })
  }
}

export const partOne = (input: Input) => sum(input.map(searchLights))

function decreaseJoltageCounters(counters: number[], button: number[]) {
  const next = [...counters]
  button.forEach(b => (next[b]! -= 1))
  return next
}

function invalid(state: number[]) {
  return state.some(_ => _ < 0)
}

function done2(state: number[]) {
  return state.every(_ => _ === 0)
}

function magnitude(buttons: number[]) {
  return Math.sqrt(sum(buttons.map(b => b ** 2)))
}

function searchJolts({ jolts: target, buttons }: Input[number]): number {
  let queue = new PriorityQueue<{
    state: number[]
    steps: number
    d: number
  }>()

  let seen = new Set<string>()

  queue.enqueue(
    { state: target, steps: 0, d: magnitude(target) },
    magnitude(target)
  )

  while (true) {
    const { state, steps, d } = queue.dequeue()!
    if (done2(state)) {
      return steps
    }
    buttons.forEach(button => {
      const next = decreaseJoltageCounters(state, button)
      if (invalid(next) || seen.has(next.join(','))) {
        return
      }
      seen.add(next.join(','))
      queue.enqueue(
        { state: next, steps: steps + 1, d: magnitude(next) },
        magnitude(next)
      )
    })
  }
}

export function partTwo(input: Input) {
  return -1
  // return sum(
  //   input.map((i, idx) => {
  //     const res = searchJolts(i)
  //     return res
  //   })
  // )
}
