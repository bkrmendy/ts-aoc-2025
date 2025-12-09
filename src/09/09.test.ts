import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo } from './09'

describe('Day 09', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)
  test('Part One', () => {
    expect(partOne(parsed)).toEqual(4715966250)
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toBeDefined()
  })
})
