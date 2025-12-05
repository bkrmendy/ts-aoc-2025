import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo } from './03'

describe('Day 3', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)
  test('Part One', () => {
    expect(partOne(parsed)).toEqual(17324)
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toEqual(171846613143331)
  })
})
