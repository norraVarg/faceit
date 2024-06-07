'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, PostStore } from './postStore'

export default function PostProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<PostStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}