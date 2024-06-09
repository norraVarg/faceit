'use client'

import { useEffect, useRef } from 'react'
import FeedProvider from '../lib/features/feed/FeedStoreProvider'
import { useFeedSelector, useFeedStore } from '../lib/features/feed/feedHooks'
import { addNewPost, fetchPosts } from '../lib/features/feed/feedSlice'
import { usePersistlStore } from '../lib/features/persistStore'
import Feed from '../ui/feed'
import NewPostMock from '../ui/new-post-mock'
import { socket } from '@/socket'

const FeedPage = () => (<FeedProvider><FeedComponent /></FeedProvider>)

const FeedComponent = () => {
  const feedStore = useFeedStore()
  const initialized = useRef(false)
  if (!initialized.current) {
    feedStore.dispatch(fetchPosts())
    initialized.current = true
  }

  const postIds = useFeedSelector((state) => state.ids)
  const posts = useFeedSelector((state) => state.entities)
  const users = usePersistlStore(state => state.users.entities)

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      socket.on("newPostAdded", (post) => {
        feedStore.dispatch(addNewPost(post))
      })
    }

    socket.on("connect", onConnect)
    return () => {
      socket.off("connect", onConnect)
    }
  }, [])

  return (
    <main>
      <Feed postIds={postIds} posts={posts} users={users} />
      <div className='absolute top-2.5 right-1'>
        <NewPostMock socket={socket} postCount={postIds.length} />
      </div>
    </main>
  )
}

export default FeedPage