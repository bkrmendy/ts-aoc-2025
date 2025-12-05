import { describe, expect, test } from 'bun:test'
import { overlaps, parse, partOne, partTwo } from './05'

describe('Day 5', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)

  test('overlaps', () => {
    expect(overlaps({ from: 3, to: 14 }, { from: 12, to: 18 })).toBeTrue()
  })

  test('Part One', () => {
    expect(partOne(parsed)).toEqual(664)
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toEqual(350780324308385)
  })
})
