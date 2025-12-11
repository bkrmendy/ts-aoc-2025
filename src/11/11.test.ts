import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo } from './11'

describe('Day 11', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)
  test('Part One', () => {
    expect(partOne(parsed)).toEqual(472)
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toEqual(526811953334940)
  })
})