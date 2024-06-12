import { renderHook } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import useClickOutside from './useClickOutside'

test('should call the handler when clicking outside the element', () => {
  const handler = vi.fn()
  const ref = { current: document.createElement('div') }
  document.body.appendChild(ref.current)

  renderHook(() => useClickOutside(ref, handler))

  document.dispatchEvent(new MouseEvent('mousedown'))

  expect(handler).toHaveBeenCalledTimes(1)
})

test('should not call the handler when clicking inside the element', () => {
  const handler = vi.fn()
  const ref = { current: document.createElement('div') }
  document.body.appendChild(ref.current)

  renderHook(() => useClickOutside(ref, handler))

  ref.current.dispatchEvent(new MouseEvent('mousedown'))

  expect(handler).not.toHaveBeenCalled()
})