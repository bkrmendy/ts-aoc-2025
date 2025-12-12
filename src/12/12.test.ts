import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo } from './12'

describe('Day 12', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)
  test('Part One', () => {
    expect(partOne(parsed)).toEqual(443)
  })
})
