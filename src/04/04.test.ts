import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo } from './04'

describe('Day 4', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)
  test('Part One', () => {
    expect(partOne(parsed)).toEqual(1457)
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toEqual(8310)
  })
})
