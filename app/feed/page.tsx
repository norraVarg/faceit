"use client"

import { useEffect, useRef } from "react"
import UsersProvider from '../lib/features/users/UsersStoreProvider'
import { useUsersSelector, useUsersStore } from '../lib/features/users/usersHooks'
import { fetchUsers } from '../lib/features/users/usersSlice'
import { isEmptyObject } from '../lib/utils/isEmptyObject'
import FeedProvider from '../lib/features/feed/FeedStoreProvider'
import { useFeedSelector, useFeedStore } from '../lib/features/feed/feedHooks'
import { User } from '../lib/definitions'
import { addNewPost, fetchPosts } from '../lib/features/feed/feedSlice'
import { socket } from '@/socket'
import NewPostMock from '../ui/new-post-mock'
import Feed from '../ui/feed'


const FeedPage = () => {
  return (<UsersProvider><FeedComponentWithUsers /></UsersProvider>)
}

const FeedComponentWithUsers = () => {
  const usersStore = useUsersStore()
  const usersInitialized = useRef(false)

  if (!usersInitialized.current) {
    usersStore.dispatch(fetchUsers())
    usersInitialized.current = true
  }

  const users = useUsersSelector((state) => state.entities)

  return !isEmptyObject(users) && (<FeedProvider><FeedComponent users={users} /></FeedProvider>)
}

const FeedComponent = ({ users }: { users: Record<number, User> }) => {
  const feedStore = useFeedStore()

  const feedInitialized = useRef(false)

  if (!feedInitialized.current) {
    feedStore.dispatch(fetchPosts())
    feedInitialized.current = true
  }

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

  const postIds = useFeedSelector((state) => state.ids)
  const posts = useFeedSelector((state) => state.entities)

  return (
    <main>
      <Feed postIds={postIds} posts={posts} users={users} />
      <div className='absolute top-2.5 right-1'>
        <NewPostMock socket={socket} idsCount={postIds.length} />
      </div>
    </main>
  )
}

export default FeedPage

