'use client'

import { socket } from '@/socket'
import { useRef } from 'react'
import FeedProvider from '../lib/features/feed/FeedStoreProvider'
import { useFeedSelector, useFeedStore } from '../lib/features/feed/feedHooks'
import { fetchPosts } from '../lib/features/feed/feedSlice'
import { usePersistlStore } from '../lib/features/persistStore'
import Feed from '../ui/feed'
import NewPostMock from '../ui/new-post-mock'

const PAGE_SIZE = 20

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

  const users = usePersistlStore(state => state.users.entities)
  const newPosts = usePersistlStore(state => state.newPosts)
  const addNewPost = usePersistlStore(state => state.addNewPost)
  const setScrollPosition = usePersistlStore(state => state.setScrollPosition)
  const scrollPosition = usePersistlStore(state => state.scrollPosition)
  const setPage = usePersistlStore(state => state.setPage)
  const page = usePersistlStore(state => state.page)

  const displayedPostIds = postIds.slice(0, page * PAGE_SIZE)

  const onScroll = (position: number) => {
    setScrollPosition(position)
  }

  const socketInitialized = useRef(false)
  if (!socketInitialized.current) {
    socket.on("newPostAdded", (post) => {
      addNewPost(post)
    })
    socketInitialized.current = true
  }

  return (
    <main className=''>
      <Feed page={page} displayedPostIds={displayedPostIds} posts={posts} newPosts={newPosts} users={users} onScroll={onScroll} setPage={setPage} scrollPosition={scrollPosition} />
      <div className='absolute top-2.5 right-1 z-30'>
        <NewPostMock socket={socket} />
      </div>
    </main>
  )
}

export default FeedPage