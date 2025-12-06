import { describe, expect, test } from 'bun:test'
import { parse, partOne, partTwo, www } from './06'

describe('Day 06', async () => {
  const { default: input } = await import('./input.txt')
  const parsed = parse(input)

  test('www', () => {
    expect(www('*   +   *   +  ')).toEqual([-3, 3, -3, 3])
    expect(www('*    + *  +    ')).toEqual([-4, 1, -2, 5])
  })

  test('Part One', () => {
    expect(partOne(parsed)).toEqual(4693419406682)
  })

  test('Part Two', () => {
    expect(partTwo(parsed)).toEqual(9029931401920)
  })
})
