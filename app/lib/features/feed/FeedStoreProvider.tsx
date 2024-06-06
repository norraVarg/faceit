'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, FeedStore } from './feedStore'

export default function FeedProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<FeedStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}