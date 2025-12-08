import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo } from './08'

describe('Day 08', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)
  test('Part One', () => {
    expect(partOne(parsed)).toBeDefined()
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toBeDefined()
  })
})