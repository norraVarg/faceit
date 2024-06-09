'use client'

import { socket } from '@/socket'
import { useRef } from 'react'
import FeedProvider from '../lib/features/feed/FeedStoreProvider'
import { useFeedSelector, useFeedStore } from '../lib/features/feed/feedHooks'
import { addNewPost, fetchPosts } from '../lib/features/feed/feedSlice'
import { usePersistlStore } from '../lib/features/persistStore'
import Feed from '../ui/feed'
import NewPostMock from '../ui/new-post-mock'

const FeedPage = () => (<FeedProvider><FeedComponent /></FeedProvider>)

const FeedComponent = () => {
  const feedStore = useFeedStore()
  const feedInitialized = useRef(false)
  if (!feedInitialized.current) {
    feedStore.dispatch(fetchPosts())
    feedInitialized.current = true
  }

  const postIds = useFeedSelector((state) => state.ids)
  const posts = useFeedSelector((state) => state.entities)
  const newPostIds = useFeedSelector((state) => state.newPostIds)
  const users = usePersistlStore(state => state.users.entities)

  const socketInitialized = useRef(false)
  if (!socketInitialized.current) {
    socket.on("newPostAdded", (post) => {
      feedStore.dispatch(addNewPost(post))
    })
    socketInitialized.current = true
  }

  return (
    <main>
      <Feed postIds={postIds} posts={posts} newPostIds={newPostIds} users={users} />
      <div className='absolute top-2.5 right-1'>
        <NewPostMock socket={socket} postCount={postIds.length} />
      </div>
    </main>
  )
}

export default FeedPage