"use client"

import { useEffect, useRef } from "react"
import { socket } from "../socket"
import FeedProvider from './lib/features/feed/FeedStoreProvider'
import { useFeedSelector, useFeedStore } from './lib/features/feed/feedHooks'
import { addNewPost, fetchPosts } from './lib/features/feed/feedSlice'
import NewPostMock from './ui/new-post-mock'
import Feed from './ui/feed'

const Home = () => {
  return (<FeedProvider><FeedComponent /></FeedProvider>)
}

const FeedComponent = () => {
  const store = useFeedStore()
  const initialized = useRef(false)

  if (!initialized.current) {
    store.dispatch(fetchPosts())
    initialized.current = true
  }

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      socket.on("newPostAdded", (post) => {
        store.dispatch(addNewPost(post))
      })
    }

    socket.on("connect", onConnect)
    return () => {
      socket.off("connect", onConnect)
    }
  }, [])

  const ids = useFeedSelector((state) => state.ids)
  const entities = useFeedSelector((state) => state.entities)

  console.log(entities)
  return (
    <main className='relative'>
      <Feed ids={ids} entities={entities} />
      <div className='absolute top-0 right-0'>
        <NewPostMock socket={socket} idsCount={ids.length} />
      </div>
    </main>
  )
}

export default Home

