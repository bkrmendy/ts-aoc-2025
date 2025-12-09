import { describe, test, expect } from 'bun:test'
import { overlaps } from './intervals'

describe('intervals', () => {
  test('overlaps', () => {
    expect(overlaps({ from: 3, to: 14 }, { from: 12, to: 18 })).toBeTrue()
  })
})
