import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo } from './10'

describe('Day 10', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)
  test('Part One', () => {
    expect(partOne(parsed)).toEqual(409)
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toBeDefined()
  })
})
