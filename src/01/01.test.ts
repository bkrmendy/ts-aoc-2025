import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo } from './01'

describe('Day 1', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)
  test('Part One', () => {
    expect(partOne(parsed)).toEqual(1031)
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toEqual(5831)
  })
})
