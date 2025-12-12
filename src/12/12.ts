import { lines, sum, words } from '@/advent'

export function parse(input: string) {
  const parts = input.split('\n\n')
  const presents = parts.slice(0, -1).map(present =>
    sum(
      lines(present)
        .slice(1)
        .map(p => [...p].filter(_ => _ === '#').length)
    )
  )

  const regions = lines(parts.at(-1)!).map(line => {
    const ps = words(line)
    const dims = ps[0]!
      .slice(0, -1)
      .split('x')
      .map(i => parseInt(i))

    const nums = ps.slice(1).map(i => parseInt(i))
    return { dims, nums }
  })
  return { presents, regions }
}

type Input = ReturnType<typeof parse>

export function partOne(input: Input) {
  let result = 0

  for (const { dims, nums } of input.regions) {
    const covered = sum(nums.map((n, i) => input.presents[i]! * n))
    if (covered <= dims[0]! * dims[1]!) {
      result += 1
    }
  }

  return result
}

export function partTwo(input: Input) {}
