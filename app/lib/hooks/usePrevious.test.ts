import { renderHook } from '@testing-library/react'
import { expect, test } from 'vitest'
import { usePrevious } from './usePrevious'

test.only('should return the previous value', () => {
  const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
    initialProps: { value: 1 }
  })

  expect(result.current).toBeNull()
  rerender({ value: 2 })
  expect(result.current).toBe(1)
  rerender({ value: 3 })
  expect(result.current).toBe(2)
})