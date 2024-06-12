import { expect, test } from 'vitest'
import { isEmptyObject } from './isEmptyObject'

test('isEmptyObject', () => {
  expect(isEmptyObject({})).toBe(true)
  expect(isEmptyObject({ a: 1 })).toBe(false)
  expect(isEmptyObject({ a: 1, b: 2, c: 3 })).toBe(false)
})