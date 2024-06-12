import { expect, test } from 'vitest'
import { isNewPost } from './isNewPost'
import { Post } from '../definitions'

test('has no created property', () => {
  const post: Post = {
    id: 0,
    userId: 0,
    title: '',
    body: ''
  }
  expect(isNewPost(post)).toBe(false)
})


test('created 2.9 seconds ago', () => {
  const post: Post = {
    id: 0,
    userId: 0,
    title: '',
    body: '',
    created: new Date(Date.now() - 2900).toISOString()
  }
  expect(isNewPost(post)).toBe(true)
})

test('created 3 seconds ago', () => {
  const post: Post = {
    id: 0,
    userId: 0,
    title: '',
    body: '',
    created: new Date(Date.now() - 3000).toISOString()
  }
  expect(isNewPost(post)).toBe(false)
})