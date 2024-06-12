import { expect, test } from 'vitest'
import { generateRandomId } from './generateRandomId'

test('generateRandomId', () => {
  for (let i = 0;i < 10;i++) {
    const id = generateRandomId()
    expect(id).toBeGreaterThan(0)
    expect(id).toBeLessThan(11)
  }
})