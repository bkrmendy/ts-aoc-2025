import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo } from './07'

describe('Day 07', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)
  test('Part One', () => {
    expect(partOne(parsed)).toEqual(1560)
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toBeDefined()
  })
})
