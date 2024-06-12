import { expect, test } from 'vitest'
import { getTimeStamp } from './getTimeStamp'

test('time is undefined', () => {
  expect(getTimeStamp()).toBe('Long time ago')
})

test('time is now', () => {
  expect(getTimeStamp(new Date().toISOString())).toBe('Just now')
})

test('time is 1 minute ago', () => {
  expect(getTimeStamp(new Date(Date.now() - 60 * 1000).toISOString())).toBe('1 minutes ago')
})

test('time is 59 minutes ago', () => {
  expect(getTimeStamp(new Date(Date.now() - 59 * 60 * 1000).toISOString())).toBe('59 minutes ago')
})

test('time is 1 hour ago', () => {
  expect(getTimeStamp(new Date(Date.now() - 60 * 60 * 1000).toISOString())).toBe('1 hours ago')
})

test('time is 23 hours ago', () => {
  expect(getTimeStamp(new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString())).toBe('23 hours ago')
})

test('time is more than 24 hours ago ago', () => {
  expect(getTimeStamp(new Date('1/1/2022, 12:00:00 AM').toISOString())).toBe('1/1/2022, 12:00:00 AM')
})


