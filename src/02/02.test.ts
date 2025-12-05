import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo } from './02'

describe('Day 2', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)
  test('Part One', () => {
    expect(partOne(parsed)).toEqual(28146997880)
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toEqual(40028128307)
  })
})
