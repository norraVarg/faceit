import { useEffect, useRef, useState } from 'react'
import { Post, User } from '../lib/definitions'
import { useInfiniteScroll } from '../lib/hooks/useInfiniteScroll'
import useScrollPosition from '../lib/hooks/useScrollPosition'
import FeedItem from './feed-item'

interface Params {
  displayedPostIds: number[]
  posts: Record<number, Post>
  newPosts: {
    ids: number[]
    entities: Record<number, Post>
  }
  users: Record<number, User>
  onScroll: (position: number) => void
  scrollPosition: number
  setPage: (page: number) => void
  page: number
}

const Feed = (params: Params) => {
  const { page, displayedPostIds, posts, newPosts, users, onScroll, scrollPosition, setPage } = params

  const [newPostReceived, setNewPostReceived] = useState(false)
  const previousNewPostIds = useRef(newPosts.ids)
  const { anchorRef, fetchMore } = useInfiniteScroll(displayedPostIds.length > 0)
  const scrollPositionRef = useScrollPosition<HTMLUListElement>(scrollPosition)

  const hasMorePosts = displayedPostIds.length < Object.keys(posts).length

  // highlight new post item for 3 seconds
  useEffect(() => {
    if (newPosts.ids.length > previousNewPostIds.current.length) {
      setNewPostReceived(true)
    }

    const timeout = setTimeout(() => {
      setNewPostReceived(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [newPosts.ids, previousNewPostIds, setNewPostReceived])

  // handle infinite scroll
  useEffect(() => {
    if (fetchMore) {
      setPage(page + 1)
    }
  }, [fetchMore])

  return (
    <div className='grid grid-rows-12 h-screen'>
      <div className='flex items-center'>
        <h1 className="flex items-center text-lg font-semibold leading-6 text-gray-900 px-5 sm:hidden">Feed</h1>
        {newPostReceived && (
          <div className='z-30 animate-scale text-xs text-green-600 sm:w-full sm:absolute sm:top-4 sm:left-72 sm:animate-bounce sm:text-white sm:font-semibold'>New post received</div>
        )}
      </div>
      <ul ref={scrollPositionRef} onScroll={(e) => onScroll(e.currentTarget.scrollTop)} role="list" className="py-5 row-start-2 row-span-10 overflow-y-auto sm:row-start-1 sm:row-span-11">
        {newPosts.ids.map((id) => (<FeedItem key={id} post={newPosts.entities[id]} user={users[newPosts.entities[id].userId]} />))}
        {displayedPostIds.map((id) => (<FeedItem key={id} post={posts[id]} user={users[posts[id].userId]} />))}

        <div ref={anchorRef} className='flex justify-center mt-2'>
          {hasMorePosts && (<span className='text-xs text-gray-600'>Fetching more...</span>)}
        </div>
      </ul>
    </div>
  )

}

export default Feed